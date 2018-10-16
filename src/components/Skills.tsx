import * as React from 'react';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Sheet } from "../system/sheet";
import { Skill } from "../system/skills";
import {
  createStyles, FormControlLabel, Grid, Switch, Typography,
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
  },
  section: {
    // marginTop: '2em',
  },
  sectionTitle: {
    margin: '0.4em 0',
  },
});

interface Props extends WithStyles<typeof styles> {
  skills: Array<Skill>;
  editSkills: (skills: Array<Skill>) => void;
}


class Skills extends React.Component<Props, State> {

  sections = (section: Skill, sectionKey: number) => {
    if (section.contains === undefined) {
      console.error(section);
      return null;
    }
    const {classes, skills} = this.props;

    const editSection = (next: Skill) => {
      let nextSections = [...skills];
      nextSections[sectionKey] = next;
      this.props.editSkills(nextSections);
    };


    const remove = (key: number) => () => {
      const contains = (section.contains as Array<Skill>).filter((_, i) => i !== key);
      editSection({...section, contains});
    };

    const editSkill = (key: number) => (skill: Skill) => {
      let nextSection = {...section};
      if (nextSection.contains === undefined) {
        console.log(nextSection);
        return;
      }
      nextSection.contains[key] = skill;
      editSection(nextSection);
    };


    const skillItems = section.contains.map((skill: Skill, key: number) => {
      return (
        <SkillCard key={key} remove={remove(key)} skill={skill}
                   edit={editSkill(key)}isEditing={this.state.isEditing}/>);
    });

    return (
      <div className={classes.section} key={sectionKey}>
        <div className={classes.sectionTitle}>
          <Typography  variant='subtitle1'>{section.label}</Typography>
        </div>
        <Grid container spacing={8}>
          {skillItems}
        </Grid>
      </div>
    )
  };


  constructor(props: Props) {
    super(props);
    this.state = {isEditing: true};
  }

  switchEdit = () => this.setState({isEditing: !this.state.isEditing});

  render() {
    const {skills} = this.props;
    if (!skills) return null;

    return (
      <div>
        <div>
          <FormControlLabel
            control={<Switch checked={this.state.isEditing} onChange={this.switchEdit}/>}
            label="编辑技能"/>
        </div>
        {skills.map(this.sections)}
      </div>
    );
  }
}


const mapStateToProps = (state: Sheet): Pick<Props, 'skills'> => ({skills: state.skills});


const mapDispatchToProps = (dispatch: Dispatch): Pick<Props, 'editSkills'> =>
  ({editSkills: next => dispatch(editSkills(next))});


export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Skills));
