import * as React from 'react';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Sheet } from "../system/sheet";
import { Number } from "./controls/Number";
import { AttributeName, Attributes } from "../system/attributes";
import { editAttribute, log} from "../actions";
import { Button } from "@material-ui/core";
import { LogRecord, modifiedRecord } from "../system/logger";


interface LogProps {
  log: (record: LogRecord) => void;
}

interface Props extends LogProps {
  attributes: Partial<Attributes>;
  onEdited: (next: Partial<Attributes>) => void;
}


interface State {
}


export class AttributesForm extends React.Component<Props, State> {
  render() {
    const name = (key: keyof Attributes) => {
      const display = AttributeName[key];
      const onEdited = (value: number) => {
        this.props.log(modifiedRecord(key, display, value, this.props.attributes[key]));
        this.props.onEdited({ ...this.props.attributes, [key]: value });
      };
      return (
        {
          label: `${display} ${key.toUpperCase()}`,
          value: this.props.attributes[key],
          onEdited
        }
      );
    };

    return (
      <div>
        <div>
          <Number {...name("age")} /><Button variant='contained'>随机年龄</Button>
          <Number {...name("str")} max={99}/>
          <Number {...name("con")} max={99}/>
          <Number {...name("siz")} />
          <Number {...name("dex")} max={99}/>
          <Number {...name("app")} max={99}/>
          <Number {...name("int")} max={99}/>
          <Number {...name("pow")} />
          <Number {...name("edu")} max={99}/>
          <Button variant='contained'>教育增强</Button>

          <Number {...name("luck")} /><Button variant='contained'>恢复幸运</Button>
          <Button variant='contained'>随机属性</Button>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state: Sheet) => ({ attributes: state.attributes });


const mapDispatchToProps = (dispatch: Dispatch): Pick<Props, 'onEdited' | 'log'> => ({
  onEdited: next => dispatch(editAttribute(next)),
  log: record => dispatch(log(record)),
});


export default connect(mapStateToProps, mapDispatchToProps)(AttributesForm);
