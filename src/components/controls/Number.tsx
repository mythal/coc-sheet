import * as React from 'react';
import { Input } from "./Input";

interface Props {
  value?: number;
  id?: string;
  className?: string;
  disable?: boolean;
  label?: string;
  onEdited?: (x: number) => void;
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
    if (!isNaN(number)) { onEdited(number) }
  };

  constructor(props: Props) {
    super(props);
    this.state = { cleared: false }
  }

  render() {
    const className = this.props.className;
    const disable = this.props.disable === true;

    return (
      <Input type="number" value={this.value()}
        id={this.props.id} className={className}
        disabled={disable} label={this.props.label}
        onEdited={value => this.update(value)} />
    );
  }

  private value(): string {
    const value = this.props.value;
    const cleared = this.state.cleared;
    // user can remove all number, don't remain "0".
    return value === undefined || (value === 0 && cleared) ? '' : value.toFixed();
  }
}

