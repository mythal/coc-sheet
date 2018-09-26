import * as React from 'react';

import { connect } from 'react-redux';
import { Sheet } from "../system/sheet";
import { Info, infoRecord, Modified } from "../system/logger";
import { LogRecord } from "../system/logger";
import {
  Icon,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  createStyles,
  withStyles,
  Typography, Badge, Button, TextField, Grid
} from "@material-ui/core";
import { formatDate } from "../utils";
import { Dispatch } from "redux";
import { log } from "../actions";


const styles = createStyles({
  root: {
  },
  content: {
    paddingRight: '1em',
  },
  logInput: {
    width: '100%'
  }
});



interface Props {
  logs: Array<LogRecord>,
  logger: (record: LogRecord) => void;
  classes: {
    root: string;
    content: string;
    logInput: string;
  }
}


interface State {
  size?: number;
  current: string;
}


const NUM = 10;


class Log extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {size: NUM, current: ''};
  }


  modified(record: Modified) {
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
      const delta =  record.next - record.old;
      const diff = delta > 0 ? `+${delta}` : String(delta);
      const content = (
        <span className={this.props.classes.content}>
          {record.display} {record.old} ({diff}) ⇒ {record.next} {remark}
        </span>
      );
      return (
        <>
          <ListItemIcon><Icon fontSize='inherit'>edit</Icon></ListItemIcon>
          <ListItemText>{Log.withBadge(record.count, content)}</ListItemText>
        </>
      );
    }
  }

  static withBadge(count: number, content: JSX.Element) {
    if (count < 2) return content;
    return (
      <Badge badgeContent={count} color="primary">{content}</Badge>
    );
  }

  info(record: Info) {
    const className = this.props.classes.content;
    return (
      <>
        <ListItemIcon><Icon fontSize='inherit'>info</Icon></ListItemIcon>
        <ListItemText>
          {Log.withBadge(record.count, <span className={className}>{record.message}</span>)}
        </ListItemText>
      </>
    );
  }

  dispatch(record: LogRecord) {
    switch (record.type) {
      case 'Info': return this.info(record);
      case 'Modified': return this.modified(record);
    }
  }

  logInput = () => {
    this.props.logger(infoRecord(this.state.current));
    this.setState({current: ''});
  };

  render() {
    const length = this.props.logs.length;
    const currentSize = this.state.size;
    const logs = this.props.logs
      .map((record: LogRecord, index: number) => (
        <ListItem key={index}>
          {this.dispatch(record)}
          <Typography color='textSecondary'>{formatDate(record.date)}</Typography>
        </ListItem>
      ))
      .reverse()
      .slice(0, currentSize);
    return (
      <div>
        <Grid container justify='space-around' alignItems='baseline'>
          <Grid item>
            <TextField value={this.state.current}
                       label='日志'
                       className={this.props.classes.logInput}
                       placeholder='描述人物的变化'
                       onChange={e => this.setState({current: e.currentTarget.value})}
                       multiline />
          </Grid>
          <Grid item><Button variant='contained' onClick={this.logInput}>记录</Button></Grid>
        </Grid>

        { currentSize ? null : <Button onClick={() => this.setState({size: NUM})}>只显示最近 {NUM} 条</Button> }
        <List className={this.props.classes.root}>{ logs }</List>
        { currentSize && length > currentSize ? <Button onClick={() => this.setState({size: undefined})}>显示所有 {length} 条</Button> : null }
      </div>
    );
  }
}


const mapStateToProps = (state: Sheet): Partial<Props> => ({logs: state.logs});



const mapDispatchToProps = (dispatch: Dispatch): Pick<Props, 'logger'> => ({
  logger: record => dispatch(log(record)),
});



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Log));
