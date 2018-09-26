import * as React from 'react';

import { connect } from 'react-redux';
import { Sheet } from "../system/sheet";
import { Modified } from "../system/logger";
import { LogRecord } from "../system/logger";
import { Icon, List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";


interface Props {
  logs: Array<LogRecord>,
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

  render() {
    const logs = this.props.logs.map((record: LogRecord, index: number) => {
      switch (record.type) {
        case 'Modified': return (<ListItem key={index}>{Log.modified(record)}</ListItem>);
      }
    });
    return (
      <div>
        <List>
          { logs }
        </List>
      </div>
    );
  }
}


const mapStateToProps = (state: Sheet): Partial<Props> => ({logs: state.logs});


export default connect(mapStateToProps)(Log);
