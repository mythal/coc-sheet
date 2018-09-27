import * as React from 'react';
import { Input } from './Input';
import { TextFieldProps } from "@material-ui/core/TextField";

export interface Props extends TextFieldProps {
  value?: number;
  afterAdornmentText?: string;
  onEdited?: (x: number) => void;
  max?: number;
  min?: number;
}

interface State {
  cleared: boolean;
}

export class Number extends React.Component<Props, State> {
  update = (text: string) => {
    // can't handle 'e'
    // https://github.com/facebook/react/issues/6556
    const onEdited = this.props.onEdited;
    if (onEdited === undefined || this.props.disabled === true) return;

    if (text === '') {
      onEdited(0);
      this.setState({ cleared: true });
      return;
    }

    const number = parseInt(text);
    if (isNaN(number)) { return }
    else if (number >= 1e20) { onEdited(1e20 - 1) }
    else { onEdited(number) }
  };

  constructor(props: Props) {
    super(props);
    this.state = { cleared: false }
  }

  private value(): string {
    const value = this.props.value;
    const cleared = this.state.cleared;
    // user can remove all number, don't remain '0'.
    return value === undefined || (value === 0 && cleared) ? '' : value.toFixed();
  }

  render() {
    let outOfRange = false;
    if (this.props.value !== undefined) {
      outOfRange = this.props.max !== undefined && this.props.max < this.props.value;
      if (!outOfRange)
        outOfRange = this.props.min !== undefined && this.props.min > this.props.value;
    }
    const error = this.props.error === undefined ? outOfRange : this.props.error;
    return (
      <Input {...this.props} type='tel' value={this.value()} error={error}
             id={this.props.id} onEdited={value => this.update(value)} />
    );
  }

}

