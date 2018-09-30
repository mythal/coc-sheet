import * as React from 'react';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Sheet } from "../system/sheet";
import { Skill } from "../system/skills";
import {
  createStyles, FormControlLabel, Grid, Switch,
  withStyles, WithStyles
} from "@material-ui/core";
import SkillCard from "./SkillCard";
import { editSkills } from "../actions";



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
  skills: Array<Skill>;
  editSkills: (skills: Array<Skill>) => void;
}


class Skills extends React.Component<Props, State> {

  skillItem = (skill: Skill, index: number) => {
    const edit = (index: number) => (skill: Skill) => {
      let nextSkills = [...this.props.skills];
      nextSkills[index] = skill;
      this.props.editSkills(nextSkills);
    };
    return (<SkillCard key={index} isEditing={this.state.isEditing} skill={skill} edit={edit(index)} />);
  };

  constructor(props: Props) {
    super(props);
    this.state = {isEditing: true};
  }

  switchEdit = () => this.setState({isEditing: !this.state.isEditing});

  render() {
    const {skills} = this.props;
    const skillItems = skills ? this.props.skills.map(this.skillItem) : [];
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


const mapStateToProps = (state: Sheet): Pick<Props, 'skills'> => ({skills: state.skills});


const mapDispatchToProps = (dispatch: Dispatch): Pick<Props, 'editSkills'> =>
  ({editSkills: next => dispatch(editSkills(next))});


export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Skills));
