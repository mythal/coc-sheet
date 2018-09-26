import * as React from 'react';

import { connect } from 'react-redux';
import { Sheet } from "../system/sheet";
import { Info, Modified } from "../system/logger";
import { LogRecord } from "../system/logger";
import {
  Icon,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  createStyles,
  withStyles,
  Typography
} from "@material-ui/core";
import { formatDate } from "../utils";


const styles = createStyles({
  root: {
  }
});



interface Props {
  logs: Array<LogRecord>,
  classes: {
    root: string;
  }
}


interface State {
}


class Log extends React.Component<Props, State> {

  static modified(record: Modified) {
    const remark = record.remark ? <span>({record.remark})</span> : null;
    if (record.old === undefined) {
      return (
        <>
          <ListItemIcon><Icon fontSize='inherit'>add</Icon></ListItemIcon>
          <ListItemText>{record.display} {record.next} {remark}</ListItemText>
        </>
      );
    }
    else {
      const arrow = <Icon fontSize='inherit'>arrow_forward</Icon>;
      return (
        <>
          <ListItemIcon><Icon fontSize='inherit'>edit</Icon></ListItemIcon>
          <ListItemText>{record.display} {record.old} {arrow} {record.next} {remark}</ListItemText>
        </>
      );
    }
  }

  static info(record: Info) {
    return (
      <>
        <ListItemIcon><Icon fontSize='inherit'>info</Icon></ListItemIcon>
        <ListItemText>{record.message}</ListItemText>
      </>
    );
  }

  static dispatch(record: LogRecord) {
    switch (record.type) {
      case 'Info': return Log.info(record);
      case 'Modified': return Log.modified(record);
    }
  }

  render() {
    const logs = this.props.logs
      .map((record: LogRecord, index: number) => (
        <ListItem key={index}>
          {Log.dispatch(record)}
          <Typography color='textSecondary'>{formatDate(record.date)}</Typography>
        </ListItem>
      ));
    return (
      <div>
        <List className={this.props.classes.root}>
          { logs.reverse() }
        </List>
      </div>
    );
  }
}


const mapStateToProps = (state: Sheet): Partial<Props> => ({logs: state.logs});


export default connect(mapStateToProps)(withStyles(styles)(Log));
