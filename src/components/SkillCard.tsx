import * as React from 'react';
import { Skill } from "../system/skills";
import {
  Avatar, Button,
  Card, CardActionArea, CardActions,
  CardContent,
  CardHeader, Checkbox,
  createStyles, Icon, IconButton,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";


const styles = ({spacing}: Theme) => createStyles({
  card: {
    display: 'inline-block',
    margin: spacing.unit,
  }
});


interface Props extends WithStyles<typeof styles>{
  skill: Skill,
}


interface State {
}


class SkillCard extends React.Component<Props, State> {
  render() {
    const {label, name, initial, contains, tag} = this.props.skill;
    return (
      <Card className={this.props.classes.card}>
        <CardHeader avatar={<Avatar>{String(initial)}</Avatar>}
          title={label} subheader={name} action={<Checkbox/>}/>
      </Card>
    );
  }
}


export default withStyles(styles)(SkillCard);
