import * as React from 'react';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Sheet } from "../system/sheet";
import { Skill, skillList } from "../system/skills";
import {
  createStyles, FormControlLabel, Grid, Switch,
  withStyles, WithStyles
} from "@material-ui/core";
import SkillCard from "./SkillCard";



interface State {
  isEditing: boolean;
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

  skillItem = (skill: Skill, index: number) => {
    return (<SkillCard key={index} isEditing={this.state.isEditing} skill={skill}/>);
  };

  constructor(props: Props) {
    super(props);
    this.state = {isEditing: true};
  }

  switchEdit = () => this.setState({isEditing: !this.state.isEditing});

  render() {
    const skillItems = skillList.map(this.skillItem);
    const editSwitch = (
      <FormControlLabel
        control={<Switch checked={this.state.isEditing} onChange={this.switchEdit}/>}
        label="编辑技能"/>
    );
    return (
      <div>
        <div>{editSwitch}</div>
        <Grid container spacing={8}>{skillItems}</Grid>
      </div>
    );
  }
}


const mapStateToProps = (state: Sheet): Partial<Props> => ({});


const mapDispatchToProps = (dispatch: Dispatch): Partial<Props> => ({});


export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Skills));
