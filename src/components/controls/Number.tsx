import * as React from 'react';
import { Input } from './Input';

interface Props {
  value?: number;
  id?: string;
  className?: string;
  disable?: boolean;
  label?: string;
  placeholder?: string;
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
    if (onEdited === undefined || this.props.disable === true) return;

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
    const className = this.props.className;
    const disable = this.props.disable === true;
    let outOfRange = false;
    if (this.props.value !== undefined) {
      outOfRange = this.props.max !== undefined && this.props.max < this.props.value;
      if (!outOfRange)
        outOfRange = this.props.min !== undefined && this.props.min > this.props.value;
    }
    return (
      <Input type='tel' value={this.value()} error={outOfRange}
        id={this.props.id} className={className}
        placeholder={this.props.placeholder}
        disabled={disable} label={this.props.label}
        onEdited={value => this.update(value)} />
    );
  }

}

