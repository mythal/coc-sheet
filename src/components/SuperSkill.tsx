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


const styles = (theme: Theme) => createStyles({
  subSkills: {
    margin: '10px 0 50px',
  },
  card: {
  },
  leftAction: {
    margin: '0 0 0 auto',
  }
});


interface Props extends WithStyles<typeof styles> {
  skill: Skill;
  isEditing: boolean;
}


interface State {
  isExpand: boolean;
  isCreating: boolean;
}


class SuperSkill extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {isExpand: false, isCreating: false}
  }

  handleExpand = () => this.setState({isExpand: !this.state.isExpand});

  handleAdd = () => {
    this.setState({isExpand: true, isCreating: true});
  };

  cancelAdd = () => this.setState({isCreating: false});

  render() {
    const {label, name} = this.props.skill;
    const skills = this.props.skill.contains;
    const {isExpand, isCreating} = this.state;

    if (skills === undefined || skills.length === 0) {
      console.warn('SuperSkill must needs sub-skills');
      return null;
    }

    const createFields = (
      <Grid container spacing={8}>
        <Grid item xs={8}><Input fullWidth label='名称'/></Grid>
        <Grid item xs={4}><Input fullWidth label='初始值'/></Grid>
      </Grid>
    );


    const expandButton = (<IconButton onClick={this.handleExpand}>{isExpand ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}</IconButton>);
    const card = (
      <>
        <CardHeader  title={label} subheader={name} action={expandButton} />
        <Collapse in={this.props.isEditing}>
          <CardActions>
            <Button className={this.props.classes.leftAction} variant="outlined" disabled={this.state.isCreating} onClick={this.handleAdd}><Icon>add</Icon>新增</Button>
          </CardActions>
        </Collapse>
      </>
    );
    const creatingCard = (
      <>
        <CardHeader title='创建技能' avatar={<Icon>note_add</Icon>} subheader={label} />
        <CardContent>{createFields}</CardContent>
        <CardActions>
          <Button className={this.props.classes.leftAction} onClick={this.cancelAdd}>取消</Button>
          <Button>确定</Button>
        </CardActions>
      </>
    );
    return (
      <>

        <Grid xs={12} sm={6} md={4} lg={3} xl={2} item>

          <Card className={this.props.classes.card}>
            { isCreating ? creatingCard : card }
          </Card>
        </Grid>
        <Slide direction='right' mountOnEnter unmountOnExit in={this.state.isExpand}>
          <>
          <Grid container item spacing={8} className={this.props.classes.subSkills}>
            {skills.map((skill, number) => <SkillCard isEditing={this.props.isEditing} skill={skill} key={number}/>)}
          </Grid>
          </>
        </Slide>

      </>
    );
  }
}


export default withStyles(styles)(SuperSkill);
