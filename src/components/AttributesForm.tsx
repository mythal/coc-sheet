import * as React from 'react';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Sheet } from "../system/sheet";
import { Number } from "./controls/Number";
import { AttributeName, Attributes, autoAttributes, enhance, rollLuck } from "../system/attributes";
import { editAttribute, log} from "../actions";
import { Button } from "@material-ui/core";
import { infoRecord, LogRecord, modifiedRecord } from "../system/logger";
import { ageAffect, ageHint, randomAge } from "../system/age";


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
  generate() {
    const age = this.props.attributes.age;
    let isYoung = false;
    if (age !== undefined) {
      const affect = ageAffect(age);
      isYoung = affect.type === 'Young';
    }
    let [luck, discardLuck] = rollLuck(isYoung);
    const next: Partial<Attributes> = {...autoAttributes(), luck};
    this.props.onEdited(next);
    let info = '随机生成了属性点';
    if (isYoung) {
      info += `, 幸运已根据年龄调整：取 ${luck} 和 ${discardLuck} 中较大值`;
    }

    this.props.log(infoRecord(info, 'GENERATE_ATTRIBUTES'));
  }

  changeAge = (age: number = randomAge()) => {
    const hint = ageHint(age);
    if (hint) this.props.log(infoRecord(`年龄 ${age}：${hint}`, 'EDIT_AGE'));
    this.props.onEdited({ age });
  };


  modifyAttribute(key: keyof Attributes, next: number, message = '', log_key?: string) {
    const display = AttributeName[key];
    const old = this.props.attributes[key];
    this.props.log(modifiedRecord(log_key ? log_key : key, display, next, old, message));
    this.props.onEdited({[key]: next});
  }


  doEduEnhance = () => {
    const edu = this.props.attributes.edu;
    if (edu === undefined) return;
    const {check, attr: newEdu} = enhance(edu);
    let info = `增强检定 1d100: ${check} `;
    if (newEdu > edu)  {
      info += `成功`;
    }
    else info += '失败';
    this.modifyAttribute('edu', newEdu, info);
  };

  doLuckEnhance = () => {
    const luck = this.props.attributes.luck;
    if (luck === undefined) return;
    const {check, attr: newLuck} = enhance(luck);
    let info = `增强检定 1d100: ${check} `;
    if (newLuck > luck) {
      info += `成功`;
    }
    else info += '失败';
    this.modifyAttribute('luck', newLuck, info);
  };

  render() {
    const name = (key: keyof Attributes) => {
      const display = AttributeName[key];
      const onEdited = (value: number) => (this.modifyAttribute(key, value));
      return (
        {
          label: `${display} ${key.toUpperCase()}`,
          value: this.props.attributes[key],
          onEdited
        }
      );
    };

    const {age, edu, luck} = this.props.attributes;

    return (
      <div>
        <div>
          <Number label="年龄" value={age} onEdited={this.changeAge} />
          <Button onClick={() => this.changeAge()} variant='contained'>随机年龄</Button>
          <Number {...name("str")} max={99}/>
          <Number {...name("con")} max={99}/>
          <Number {...name("siz")} />
          <Number {...name("dex")} max={99}/>
          <Number {...name("app")} max={99}/>
          <Number {...name("int")} max={99}/>
          <Number {...name("pow")} />
          <Number {...name("edu")} max={99}/>
          <Button variant='contained' onClick={this.doEduEnhance} disabled={edu === undefined} >教育增强</Button>
          <Number {...name("luck")} />
          <Button variant='contained' disabled={luck === undefined} onClick={this.doLuckEnhance}>幸运增强</Button>
          <Button onClick={() => this.generate()} variant='contained'>随机属性</Button>
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
