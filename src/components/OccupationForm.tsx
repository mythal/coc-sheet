import * as React from 'react';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Sheet } from "../system/sheet";
import { Occupation, occupations } from "../system/occupations";
import {
  IconButton,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Typography,
  Icon,
  Table, TableHead, TableRow, TableCell, TableBody, Paper, createStyles, Theme, WithStyles, withStyles
} from "@material-ui/core";
import { editOccupation, logger } from "../actions";
import { computeSkillPoint } from "../system/interpreter";
import { Attributes } from "../system/stats";
import { infoRecord, LogRecord } from "../system/logger";



const styles = ({spacing}: Theme) => createStyles({
  paper: {
    // maxWidth: 500,
  },
  header: {
    margin: spacing.unit,
  },
  skills: {
    padding: spacing.unit * 2,
  }
});


interface Props extends WithStyles<typeof styles> {
  occupation: Occupation;
  change: (occupation: Occupation) => void;
  attributes: Partial<Attributes>;
  logger: (record: LogRecord) => void;
}


interface State {
  isDialogOpen: boolean,
  skillPoint?: number,
}


class OccupationForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isDialogOpen: false }
  }

  handleOpen = () => (this.setState({isDialogOpen: true}));
  handleClose = () => (this.setState({isDialogOpen: false}));
  handleSelect = (id: number) => {
    const occupation = occupations[id];
    this.props.change(occupation);
    this.props.logger(infoRecord(`选择了 ${occupation.name} 为职业`, 'SELECT_OCCUPATION'));
    this.handleClose();
  };

  render() {
    const {occupation, classes} = this.props;
    const occupationList = occupations
      .map((x, i) => (
        <ListItem key={i} onClick={() => this.handleSelect(i)} button>
          {x.name}
        </ListItem>
      ));
    const skillPoint = computeSkillPoint(this.props.attributes, occupation.skillPoint);

    const {int} = this.props.attributes;
    return (
      <div>
        <Dialog open={this.state.isDialogOpen} onClose={this.handleClose}>
          <DialogTitle>职业列表</DialogTitle>
          <div>
            <List>
              {occupationList}
            </List>
          </div>
        </Dialog>
        <Paper className={classes.paper}>
          <Grid container spacing={0} direction='column'>
            <Grid item className={classes.header}>
              <Grid container spacing={16} alignItems='center'>
                <Grid item><Button variant='outlined' onClick={this.handleOpen} size='large'>{occupation.name}</Button></Grid>
                <Grid item><IconButton onClick={this.handleOpen}><Icon fontSize='inherit'>work</Icon></IconButton></Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.skills}><Typography><strong>本职技能</strong> {occupation.skills}</Typography></Grid>

            <Grid item>
              <Table>
                <TableHead><TableRow>
                  <TableCell>信用评级范围</TableCell>
                  <TableCell>本职技能点</TableCell>
                  <TableCell>兴趣技能点</TableCell>
                </TableRow></TableHead>
                <TableBody><TableRow>
                  <TableCell>{occupation.credit[0]} - {occupation.credit[1]}</TableCell>
                  <TableCell>{skillPoint ? skillPoint : '??'}</TableCell>
                  <TableCell>{int ? int * 2 : '??'}</TableCell>
                </TableRow></TableBody>
              </Table>
            </Grid>

          </Grid>
        </Paper>
      </div>
    );
  }
}


const mapStateToProps = (state: Sheet): Pick<Props, 'occupation' | 'attributes'> =>
  ({occupation: state.occupation, attributes: state.stats});


const mapDispatchToProps = (dispatch: Dispatch): Pick<Props, 'change'|'logger'> =>
  ({change: x => dispatch(editOccupation(x)), logger: record => dispatch(logger(record))});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OccupationForm));
