import * as React from 'react';
import { Skill } from "../system/skills";

import {
  Button,
  Card, CardActions, CardContent,
  CardHeader, Collapse,
  createStyles,
  Grid,
  Icon,
  IconButton, Slide, Theme,
  withStyles,
  WithStyles
} from "@material-ui/core";
import SkillCard from "./SkillCard";
import { Input } from "./controls/Input";
import { Number } from "./controls/Number";


const styles = ({spacing}: Theme) => createStyles({
  subSkills: {
    marginTop: spacing.unit * 2,
    marginBottom: spacing.unit * 4,
  },
  card: {
  },
  leftAction: {
    margin: '0 0 0 auto',
  }
});


interface Props extends WithStyles<typeof styles> {
  skill: Skill;
  edit: (skill: Skill) => void;
  isEditing: boolean;
}


interface State {
  isExpand: boolean;
  isCreating: boolean;
  label: string;
  initial?: number;
}


class SuperSkill extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {isExpand: false, isCreating: false, label: ''}
  }

  handleExpand = () => this.setState({isExpand: !this.state.isExpand});

  handleAdd = () => {
    this.setState({isExpand: true, isCreating: true});
  };

  cancelAdd = () => this.setState({isCreating: false});

  card() {
    const {isExpand, isCreating} = this.state;
    const {classes} = this.props;
    const expandIcon = isExpand ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>;
    const expandButton = (<IconButton onClick={this.handleExpand}>{expandIcon}</IconButton>);

    const {label, name} = this.props.skill;
    return (
      <>
        <CardHeader  title={label} subheader={name} action={expandButton} />
        <Collapse in={this.props.isEditing}>
          <CardActions>
            <Button className={classes.leftAction}
                    variant="outlined"
                    disabled={isCreating}
                    onClick={this.handleAdd}><Icon>add</Icon>新增</Button>
          </CardActions>
        </Collapse>
      </>
    );
  }

  handleCreate = () => {
    const {label, initial} = this.state;
    const {skill} = this.props;
    const newSkill: Skill = {label, initial, name: '', deletable: true};
    let contains = [newSkill].concat(skill.contains as Array<Skill>);
    // this.setState({isCreating: false, label: '', initial: undefined});
    this.props.edit({...skill, contains})
  };

  creatingCard() {
    const {label, initial} = this.state;
    const createFields = (
      <Grid container spacing={8}>
        <Grid item xs={8}><Input value={label} onEdited={label => this.setState({label})} fullWidth label='名称'/></Grid>
        <Grid item xs={4}><Number value={initial} onEdited={initial => this.setState({initial})} fullWidth label='初始值'/></Grid>
      </Grid>
    );
    return (
      <>
        <CardHeader title='创建技能' avatar={<Icon>note_add</Icon>} subheader={this.props.skill.label} />
        <CardContent>{createFields}</CardContent>
        <CardActions>
          <Button className={this.props.classes.leftAction} onClick={this.cancelAdd}>取消</Button>
          <Button onClick={this.handleCreate}>确定</Button>
        </CardActions>
      </>
    );
  }

  skillItem = (skill: Skill, index: number) => {
    const skills = this.props.skill.contains as Array<Skill>;
    const edit = (skill: Skill) => {
      let contains = [...skills];
      contains[index] = skill;
      this.props.edit({...skill, contains});
    };
    const remove = () => {
      this.props.edit({...this.props.skill, contains: skills.filter((_, i) => i !== index)});
    };
    return <SkillCard isEditing={this.props.isEditing} edit={edit} skill={skill} key={index} remove={remove}/>;
  };

  render() {
    const skills = this.props.skill.contains;
    const {isCreating} = this.state;

    if (skills === undefined || skills.length === 0) {
      console.warn('SuperSkill must needs sub-skills');
      return null;
    }



    return (
      <>

        <Grid xs={12} sm={6} md={4} lg={3} xl={2} item>
          <Card className={this.props.classes.card}>
            { isCreating ? this.creatingCard() : this.card() }
          </Card>
        </Grid>

        <Slide direction='right' mountOnEnter unmountOnExit in={this.state.isExpand}>
          <>
          <Grid container item spacing={8} className={this.props.classes.subSkills}>
            {skills.map(this.skillItem)}
          </Grid>
          </>
        </Slide>

      </>
    );
  }
}


export default withStyles(styles)(SuperSkill);
