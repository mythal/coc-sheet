import * as React from 'react';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Sheet } from "../system/sheet";
import { Skill, skillList } from "../system/skills";
import {
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  createStyles,
  withStyles, WithStyles
} from "@material-ui/core";



interface State {
}


const styles = createStyles({
  pointNumber: {
    // display: 'inline-box',
    width: '3em',
    textAlign: 'right',
  },
  list: {
    columnCount: 2,
  }
});

interface Props extends WithStyles<typeof styles> {
}


class Skills extends React.Component<Props, State> {

  skillItem = (skill: Skill, key: number) => {
    return (
      <ListItem dense button key={key} className={this.props.classes.list}>
        <span className={this.props.classes.pointNumber}>{skill.initial}</span>
        <ListItemText>{skill.label}</ListItemText>
        <ListItemSecondaryAction>
          <Checkbox />
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  render() {
    return (
      <div>
        <List>
          {skillList.map(this.skillItem)}
        </List>
      </div>
    );
  }
}


const mapStateToProps = (state: Sheet): Partial<Props> => ({});


const mapDispatchToProps = (dispatch: Dispatch): Partial<Props> => ({});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Skills));
