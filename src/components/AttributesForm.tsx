import * as React from 'react';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Sheet } from "../types";
import { Number } from "./controls/Number";
import { Attributes, Characteristics } from "../system/attributes";
import { editAttribute } from "../actions";
import { Button } from "@material-ui/core";


interface Props {
  attributes: Partial<Attributes>;
  onEdited: (next: Partial<Attributes>) => void;
}


interface State {
}


class AttributesForm extends React.Component<Props, State> {
  render() {
    const name = (key: keyof Characteristics) => {
      const onEdited = (value: number) =>
        this.props.onEdited({ ...this.props.attributes, [key]: value });
      return { value: this.props.attributes[key], onEdited };
    };

    return (
      <div>
        <Button variant='contained'>随机属性</Button>
        <div>
          <Number label="力量" {...name("str")} max={99} />
          <Number label="体质" {...name("con")} max={99} />
          <Number label="体型" {...name("siz")} />
          <Number label="敏捷" {...name("dex")} max={99} />
          <Number label="外貌" {...name("app")} max={99} />
          <Number label="智力" {...name("int")} max={99} />
          <Number label="意志" {...name("pow")} />
          <div>
            <Number label="教育" {...name("edu")} max={99} />
            <Button variant='contained'>教育增强</Button>
          </div>
        </div>
        <Number label="幸运" />
      </div>
    );
  }
}


const mapStateToProps = (state: Sheet) => ({ attributes: state.attributes });


const mapDispatchToProps = (dispatch: Dispatch) => ({
  onEdited: (x: Partial<Attributes>) => dispatch(editAttribute(x)),
});


export default connect(mapStateToProps, mapDispatchToProps)(AttributesForm);
