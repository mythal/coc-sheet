import * as React from 'react';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Sheet } from "../system/sheet";
import { Number } from "./controls/Number";
import {
  AttributeName,
  Attributes,
  autoAttributes,
  computeDbBuild,
  computeHp, computeMov, computeMp,
  enhance,
  rollLuck
} from "../system/attributes";
import { editAttribute, logger} from "../actions";
import { Button, Chip, createStyles, Grid, withStyles } from "@material-ui/core";
import { infoRecord, LogRecord, modifiedRecord } from "../system/logger";
import { ageAffect, ageHint, randomAge } from "../system/age";
import { hasOwnProperty } from "tslint/lib/utils";


const styles = createStyles(
  {
    point: {
      width: '4em',
    }
  }
);


interface LogProps {
  logger: (record: LogRecord) => void;
}

interface Props extends LogProps {
  attributes: Partial<Attributes>;
  onEdited: (next: Partial<Attributes>) => void;
  classes: {
    point: string;
  }
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
    let sum = 0;
    for (let key in next) { if (hasOwnProperty(next, key)) sum += next[key]; }
    let info = `随机生成了属性点, 合计 ${sum} 点`;
    if (isYoung) {
      info += `, 幸运已根据年龄调整：取 ${luck} 和 ${discardLuck} 中较大值`;
    }

    this.props.logger(infoRecord(info, 'GENERATE_ATTRIBUTES'));
  }

  changeAge = (age: number = randomAge()) => {
    const hint = ageHint(age);
    if (hint) this.props.logger(infoRecord(`年龄 ${age}：${hint}`, 'EDIT_AGE'));
    this.props.onEdited({ age });
  };


  modifyAttribute = (key: keyof Attributes, next: number, message = '', log_key?: string) => {
    const display = AttributeName[key];
    const old = this.props.attributes[key];
    const record = modifiedRecord(log_key ? log_key : key, display, next, old, message);
    this.props.logger(record);
    this.props.onEdited({[key]: next});
  };


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
    const className = this.props.classes.point;
    const name = (key: keyof Attributes, initial?: number) => {
      const display = AttributeName[key];
      const onEdited = (value: number) => (this.modifyAttribute(key, value));
      const attr = this.props.attributes[key];
      const value = attr === undefined ? initial : attr;
      return (
        {
          label: display,
          value,
          className: className,
          placeholder: key.toUpperCase(),
          onClick: () => {if (attr === undefined && value !== undefined) onEdited(value)},
          onEdited
        }
      );
    };

    const { age, edu, dex, luck, str, con, siz, pow } = this.props.attributes;
    let db = null;
    let build = null;
    if (str && siz) {
      const result = computeDbBuild({ str, siz });
      if (result) {
        db = <Chip label={ `伤害加深 ${result.db}` }/>;
        build = <Chip label={ `体格 ${result.build}` }/>;
      }
    }
    const mov = age && dex && str && siz ? <Chip label={`移动力 ${computeMov({age, dex, str, siz})}`}/> : null;
    const hpMax = con && siz ? computeHp({ con, siz }) : undefined;
    const mpMax = pow ? computeMp(pow) : undefined;
    const sanMax = 99; // TODO: 99 - Cthulhu Mythos
    return (
      <div>
        <div>
          <Number label="年龄" className={className} value={age} onEdited={this.changeAge} />
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
        <Grid container spacing={16}>
          <Grid item>
            <Number {...name('hp', hpMax)} max={hpMax} /> {hpMax ? <span>/ {hpMax}</span> : null}
          </Grid>
          <Grid item>
            <Number {...name('mp', mpMax)} max={mpMax} /> {mpMax ? <span>/ {mpMax}</span> : null}
          </Grid>
          <Grid item>
            <Number {...name('san', pow)} max={sanMax}/> <span>/ {sanMax}</span>
          </Grid>

          <Grid item>
            <Number {...name('armor', 0)}/>
          </Grid>
          <Grid item>
            <Grid container direction='column' spacing={8}>
              <Grid item>{db}</Grid>
              <Grid item>{build}</Grid>
              <Grid item>{mov}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}


const mapStateToProps = (state: Sheet) => ({ attributes: state.attributes });


const mapDispatchToProps = (dispatch: Dispatch): Pick<Props, 'onEdited' | 'logger'> => ({
  onEdited: next => dispatch(editAttribute(next)),
  logger: record => dispatch(logger(record)),
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AttributesForm));
