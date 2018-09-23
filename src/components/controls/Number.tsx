import * as React from 'react';
import { Input } from "./Input";
import { isNumeric } from "../../utils";

interface Props {
  value?: number;
  id?: string;
  className?: string;
  disable?: boolean;
  max?: number;
  min?: number;
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
    const max = this.props.max ? this.props.max : 1e21 - 1;
    const min = this.props.min ? this.props.min : 0;
    const editable = this.props.disable !== true;
    const number = parseInt(text);
    if (isNumeric(text) && !isNaN(number) && editable) {
      if (onEdited) {
        if (number >= min && number <= max) {
          onEdited(number);
        }
        else if (number > max) {
          onEdited(max);
        }
        else if (number < min) {
          onEdited(min);
        }
      }
      if (text === '') this.setState({ cleared: true });
    }
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
        disabled={disable} delay={true}
        onEdited={value => this.update(String(value))} />
    );
  }

  private value(): string | number {
    const value = this.props.value;
    const cleared = this.state.cleared;
    // user can remove all number, don't remain "0".
    return value === undefined || (value === 0 && cleared) ? '' : value;
  }
}

