import * as React from 'react';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Sheet } from "../system/sheet";
import { Occupation, occupations } from "../system/occupations";
import { Button, Grid, Dialog, DialogTitle, List, ListItem, Typography } from "@material-ui/core";
import { editOccupation, logger } from "../actions";
import { computeSkillPoint } from "../system/interpreter";
import { Attributes } from "../system/stats";
import { infoRecord, LogRecord } from "../system/logger";


interface Props {
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
    const occupation = this.props.occupation;
    const occupationList = occupations
      .map((x, i) => (
        <ListItem key={i} onClick={() => this.handleSelect(i)} button>
          {x.name}
        </ListItem>
      ));
    const skillPoint = computeSkillPoint(this.props.attributes, occupation.skillPoint);

    // if computed skill point value changed, update
    if (skillPoint && skillPoint !== this.state.skillPoint) {
      this.setState({skillPoint});
      this.props.change({...occupation, computedSkillPoint: skillPoint})
    }
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
        <Grid container spacing={8} direction='column'>
          <Grid item>
            <Grid container spacing={16} alignItems='center' justify='space-between'>
              <Grid item><Typography variant='title'>{occupation.name}</Typography></Grid>
              <Grid item><Button variant='contained' onClick={this.handleOpen}>选择你的职业</Button></Grid>
            </Grid>
          </Grid>
          <Grid item><Typography>{occupation.skills}</Typography></Grid>

          <Grid item>
            <Grid container spacing={16}>
              <Grid item><Typography>信用评级范围 {occupation.credit[0]} - {occupation.credit[1]}</Typography></Grid>
              <Grid item><Typography>本职技能点 {skillPoint ? skillPoint : '??'}</Typography></Grid>
              <Grid item><Typography>兴趣技能点 {int ? int * 2 : '??'}</Typography></Grid>
            </Grid>
          </Grid>

        </Grid>
      </div>
    );
  }
}


const mapStateToProps = (state: Sheet): Pick<Props, 'occupation' | 'attributes'> =>
  ({occupation: state.occupation, attributes: state.stats});


const mapDispatchToProps = (dispatch: Dispatch): Pick<Props, 'change'|'logger'> =>
  ({change: x => dispatch(editOccupation(x)), logger: record => dispatch(logger(record))});


export default connect(mapStateToProps, mapDispatchToProps)(OccupationForm);
