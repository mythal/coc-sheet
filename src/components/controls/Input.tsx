import * as React from 'react';
import { ChangeEvent } from 'react';
import { INPUT_DELAY } from '../../constants';
import Timer = NodeJS.Timer;
import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';


interface State {
  value?: string;
  typing: boolean;
  typingTimeout?: Timer;
}


export interface Props extends TextFieldProps {
  // when user finished a input action.
  onEdited?: (value: string) => void;
  value?: string;
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
        this.setState({ value: undefined, typing: false });
      }
    }, INPUT_DELAY);

    if (onChange !== undefined) onChange(e);
    this.setState({ value: value, typing: true, typingTimeout: timer });
  };

  constructor(props: Props) {
    super(props);
    this.state = { value: undefined, typing: false }
  }

  render() {
    const value = this.state.value === undefined ? this.props.value : this.state.value;
    const props = { ...this.props, value: value };
    props.onChange = this.onChange;
    if (!props.margin) props.margin = 'normal';
    delete props.onEdited;
    return (<TextField {...props} />);
  }
}
