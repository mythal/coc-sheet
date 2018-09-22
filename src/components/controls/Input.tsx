import * as React from 'react';
import {ChangeEvent} from 'react';
import {INPUT_DELAY} from "../../constants";
import Timer = NodeJS.Timer;

type Value = string | string[] | number;

interface State {
  value?: Value;
  typing: boolean;
  typingTimeout?: Timer;
}


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  // when user finished a input action.
  onEdited?: (value: Value) => void;
  delay?: boolean;
}


export class Input extends React.Component<Props, State> {
  private onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // e.persist();
    if (this.state.typingTimeout !== undefined) {
      clearTimeout(this.state.typingTimeout);
    }
    const onChange = this.props.onChange;
    const onEdited = this.props.onEdited;
    const value = e.currentTarget.value;
    const timer = setTimeout(() => {
      if (onEdited !== undefined) {
        onEdited(value);
        this.setState({value: this.props.value, typing: false});
      }
    }, INPUT_DELAY);

    if (onChange !== undefined) onChange(e);
    this.setState({value: value, typing: true, typingTimeout: timer});
  };

  constructor(props: Props) {
    super(props);
    this.state = {value: this.props.value, typing: false}
  }

  render() {
    const props = {...this.props, value: this.state.value};
    if (props.delay === true) {
      props.onChange = this.onChange;
    }
    delete props.onEdited;
    delete props.delay;
    return (<input {...props} />);
  }
}
