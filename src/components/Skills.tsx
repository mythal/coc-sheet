import * as React from 'react';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Sheet } from "../system/sheet";
import { Skill, skillList } from "../system/skills";
import {
  Checkbox,
  createStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow,
  withStyles, WithStyles
} from "@material-ui/core";
import SkillItem from "./SkillCard";
import { Number } from "./controls/Number";



interface State {
}


const styles = createStyles({
  cellName: {
    minWidth: '6em',
  },
  pointInput: {
    width: '2em',
  }
});

interface Props extends WithStyles<typeof styles> {
}


class Skills extends React.Component<Props, State> {

  skillItem = ({label, initial}: Skill, index: number) => {
    return (
      <TableRow key={index}>
        <TableCell padding='none'><Checkbox/></TableCell>
        <TableCell padding='none' className={this.props.classes.cellName}>{label}</TableCell>
        <TableCell padding='none'>99</TableCell>
        <TableCell padding='none'>{initial}</TableCell>
        <TableCell padding='none'><Number margin='none' className={this.props.classes.pointInput}/></TableCell>
        <TableCell padding='none'><Number margin='none' className={this.props.classes.pointInput}/></TableCell>
        <TableCell padding='none'><Number margin='none' className={this.props.classes.pointInput}/></TableCell>
      </TableRow>
    );
  };


  render() {
    const skillItems = skillList.map(this.skillItem);
    return (
      <Paper>
        <Table padding='dense'>
          <TableHead>
            <TableRow>
              <TableCell padding='none'></TableCell>
              <TableCell padding='none' className={this.props.classes.cellName}>名称</TableCell>
              <TableCell padding='none'>合计</TableCell>
              <TableCell padding='none'>初始</TableCell>
              <TableCell padding='none'>职业</TableCell>
              <TableCell padding='none'>兴趣</TableCell>
              <TableCell padding='none'>成长</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{skillItems}</TableBody>
        </Table>
      </Paper>
    );
  }
}


const mapStateToProps = (state: Sheet): Partial<Props> => ({});


const mapDispatchToProps = (dispatch: Dispatch): Partial<Props> => ({});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Skills));
