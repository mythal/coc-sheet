import * as React from 'react';
import { Skill } from "../system/skills";
import { Number } from "./controls/Number";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader, Checkbox,
  createStyles, Grid,
  withStyles,
  WithStyles,
  IconButton, Icon, Collapse
} from "@material-ui/core";
import SuperSkill from "./SuperSkill";


const styles = createStyles({
  root: {
  },
  card: {
  },
  pointInput: {
  },
  nonEdit: {
    display: 'none',
  },
  Editing: {
  },
  superSkill: {
  },
  delete: {margin: '0 0 0 auto'},
});


interface Props extends WithStyles<typeof styles>{
  skill: Skill,
  isEditing: boolean,
}


interface State {
}


class SkillCard extends React.Component<Props, State> {

  title() {
    const {tag, label} = this.props.skill;
    const icons = [];

    if (tag !== undefined) {
      if (tag.find(x => x === 'modern'))
        icons.push(<span title='现代'><Icon fontSize='inherit'>business</Icon></span>);

      if (tag.find(x => x === 'irregular'))
        icons.push(<span title='非常规'><Icon fontSize='inherit'>star_half</Icon></span>);
    }
    return <><span>{label}</span> {icons}</>
  }

  render() {
    const {classes, isEditing, skill} = this.props;
    const {name, initial, contains, deletable} = this.props.skill;
    if (contains !== undefined && contains.length > 0)
      return <SuperSkill skill={skill} isEditing={isEditing}/>;
    const editFields = (
      <Collapse in={isEditing}>
        <>
          <CardContent className={classes.Editing}>
            <Grid container spacing={8}>
              <Grid xs={4} item><Number margin='none' fullWidth className={classes.pointInput} label='职业'/></Grid>
              <Grid xs={4} item><Number margin='none' fullWidth className={classes.pointInput} label='兴趣'/></Grid>
              <Grid xs={4} item><Number margin='none' fullWidth className={classes.pointInput} label='成长'/></Grid>
            </Grid>
          </CardContent>
        </>
      </Collapse>
    );

    let action = null;
    if (isEditing) {
      if (deletable) action = <IconButton className={classes.delete}><Icon>delete_forever</Icon></IconButton>;
    }
    else action = <IconButton className={classes.delete}><Checkbox/></IconButton>;
    return (
      <>
        <Grid xs={12} sm={6} md={4} lg={3} xl={2} item className={classes.root}>
          <Card className={classes.card}>
            <CardHeader avatar={<Avatar>{String(initial)}</Avatar>} title={this.title()} subheader={name} action={action}/>
            {editFields}
          </Card>
        </Grid>
      </>
    );
  }
}


export default withStyles(styles)(SkillCard);
