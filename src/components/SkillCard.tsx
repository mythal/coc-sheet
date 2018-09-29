import * as React from 'react';
import { Skill } from "../system/skills";
import { Number } from "./controls/Number";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader, Checkbox,
  createStyles, Grid,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core";


const styles = ({spacing}: Theme) => createStyles({
  root: {
    display: 'inline-block',
    position: 'relative',
    margin: spacing.unit,
  },
  card: {
    width: 240,
  },
  pointInput: {
    // width: '4em',
  },
  nonEdit: {
    display: 'none',
  },
  Editing: {
  },
});


interface Props extends WithStyles<typeof styles>{
  skill: Skill,
  isEditing: boolean,
}


interface State {
}


class SkillCard extends React.Component<Props, State> {
  render() {
    const classes = this.props.classes;
    const {label, name, initial} = this.props.skill;
    const editFields = (
      <CardContent className={this.props.isEditing ? classes.Editing : classes.nonEdit}>
        <Grid container spacing={8}>
          <Grid xs={4} item><Number margin='none' fullWidth className={classes.pointInput} label='职业'/></Grid>
          <Grid xs={4} item><Number margin='none' fullWidth className={classes.pointInput} label='兴趣'/></Grid>
          <Grid xs={4} item><Number margin='none' fullWidth className={classes.pointInput} label='成长'/></Grid>
        </Grid>
      </CardContent>
    );
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader avatar={<Avatar>{String(initial)}</Avatar>} title={label} subheader={name} action={<Checkbox/>}/>
          {editFields}
        </Card>

      </div>
    );
  }
}


export default withStyles(styles)(SkillCard);
