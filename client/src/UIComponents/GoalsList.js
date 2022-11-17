// import * as React from 'react';
import React, { useState, useEffect } from 'react';

import DeleteGoal from "./DeleteGoal.js";
import EditGoal from "./EditGoal.js";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import '../CSSComponents/goalslist.css';
import GoalsHeader from "./GoalsHeader";

function Row(props) {
  const { goal } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment >
      <TableRow sx={{ '& > *': { 
          borderBottom: 'unset',
           } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} component="th" scope="row" >{goal.title}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{goal.cdate}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{goal.sdate}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{goal.edate}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{goal.status}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{goal.manager}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">
          <DeleteGoal id={goal.goalId} goals={props.goals} setGoals={props.setGoals}/>
          <EditGoal id={goal.goalId} 
            title={goal.title} 
            sdate={goal.sdate} 
            edate={goal.edate} 
            status={goal.status} 
            manager={goal.manager} 
            description={goal.description} 
            goals={props.goals} 
            setGoals={props.setGoals}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography sx={{fontFamily: "Varela Round"}} variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <Typography sx={{fontFamily: "Varela Round"}} variant="h10" gutterBottom component="div">
                {goal.description}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   goal: PropTypes.shape({
//     sdate: PropTypes.string.isRequired,
//     status: PropTypes.string.isRequired,
//     edate: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     manager: PropTypes.string.isRequired,
//   }).isRequired,
//   // goals: PropTypes.array.isRequired,
//   // setGoals: PropTypes.func.isRequired
// };
Row.propTypes = {
  goal: PropTypes.shape({
    sdate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    edate: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    manager: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [];

export default function CollapsibleTable(props) {
  const [goals, setGoals] = useState(rows);
  return (
    <TableContainer className="tableCont" style={{ maxHeight: '100%' }} component={Paper}sx={{
      '.MuiTable-root': {
        fontFamily: "Varela Round"
      },
    }}>
      <GoalsHeader view={props.view} transition={props.transition} goals={goals} setGoals={setGoals} value={props.value} setValue={props.setValue}/>
      <Table stickyHeader aria-label="collapsible table">
        <TableHead >
          <TableRow >
            <TableCell />
            <TableCell sx={{fontFamily: "Varela Round"}}>Goal</TableCell>
            <TableCell sx={{fontFamily: "Varela Round"}} align="right">Date Created</TableCell>
            <TableCell sx={{fontFamily: "Varela Round"}} align="right">Start Date</TableCell>
            <TableCell sx={{fontFamily: "Varela Round"}} align="right">End Date</TableCell>
            <TableCell sx={{fontFamily: "Varela Round"}} align="right">Status</TableCell>
            <TableCell sx={{fontFamily: "Varela Round"}} align="right">Manager</TableCell>
            <TableCell sx={{fontFamily: "Varela Round"}} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {goals.map((row) => {
            return(<Row key={row.goalId} goal={row} goals={goals} setGoals={setGoals}/>)
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}