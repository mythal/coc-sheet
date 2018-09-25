import * as React from 'react';

import { connect } from 'react-redux';
import { Sheet } from "../system/sheet";
import { Modified } from "../system/logger";
import { LogRecord } from "../system/logger";
import { Icon, Typography } from "@material-ui/core";


interface Props {
  logs: Array<LogRecord>,
}


interface State {
}


class Log extends React.Component<Props, State> {

  modified(record: Modified) {
    const remark = record.remark ? <span>({record.remark})</span> : null;
    if (record.old === undefined) {
      return <Typography><Icon fontSize='inherit'>add</Icon> {record.display} {record.next} {remark}</Typography>
    }
    return <Typography><Icon fontSize='inherit'>edit</Icon>{record.display} {record.old} <Icon fontSize='inherit'>arrow_forward</Icon> {record.next} {remark}</Typography>;
  }

  render() {
    const logs = this.props.logs.map((record: LogRecord, index: number) => {
      switch (record.type) {
        case 'Modified': return (<li key={index}>{this.modified(record)}</li>);
      }
    });
    return (
      <ul>
        { logs }
      </ul>
    );
  }
}


const mapStateToProps = (state: Sheet): Partial<Props> => ({logs: state.logs});


export default connect(mapStateToProps)(Log);
