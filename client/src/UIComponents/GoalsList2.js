// import * as React from 'react';
import React, { useState } from 'react';

import DeleteGoal from "./DeleteGoal.js";
import EditGoal from "./EditGoal.js";

import data from '../tempStorage.json';
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
import '../CSSComponents/GoalsList2.css';
import GoalsHeader from "./GoalsHeader";

function createData(id, title, sdate, edate, status, manager) {
  return {
    id,
    title,
    sdate,
    edate,
    status,
    manager
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  // const [goal, setGoals] = useState(rows);

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
        <TableCell sx={{fontFamily: "Varela Round"}} component="th" scope="row" >{row.title}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{row.sdate}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{row.edate}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{row.status}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{row.manager}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right"><DeleteGoal id={row.id} rows={props.goal} setGoals={props.setGoals}/><EditGoal title={row.title} rows={props.goal} setGoals={props.setGoals}/></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography sx={{fontFamily: "Varela Round"}} variant="h6" gutterBottom component="div">
                Comments
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                <Typography sx={{fontFamily: "Varela Round"}} variant="h10" gutterBottom component="div">
                No comments yet.
              </Typography>
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    sdate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    edate: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    manager: PropTypes.string.isRequired,
  }).isRequired,
};

const goals = data.users[0].goals;
const rows = [
  createData(goals[0].goalid, goals[0].goalName, new Date(goals[0].goalStartDate).toDateString(), new Date(goals[0].goalEndDate).toDateString(), goals[0].status, goals[0].manager),
  createData(goals[1].goalid, goals[1].goalName, new Date(goals[1].goalStartDate).toDateString(), new Date(goals[1].goalEndDate).toDateString(), goals[1].status, goals[1].manager),
  createData(goals[2].goalid, goals[2].goalName, new Date(goals[2].goalStartDate).toDateString(), new Date(goals[2].goalEndDate).toDateString(), goals[2].status, goals[2].manager),
];

export default function CollapsibleTable() {

  const [goal, setGoals] = useState(rows);
  return (
    <TableContainer className="tableCont" style={{ maxHeight: '100%' }} component={Paper}sx={{
      '.MuiTable-root': {
        fontFamily: "Varela Round"
      },
    }}>
      <GoalsHeader/>
      <Table stickyHeader aria-label="collapsible table">
        <TableHead >
          <TableRow >
            <TableCell />
            <TableCell sx={{fontFamily: "Varela Round"}}>Goals</TableCell>
            <TableCell sx={{fontFamily: "Varela Round"}} align="right">Start Date</TableCell>
            <TableCell sx={{fontFamily: "Varela Round"}} align="right">End Date</TableCell>
            <TableCell sx={{fontFamily: "Varela Round"}} align="right">Status</TableCell>
            <TableCell sx={{fontFamily: "Varela Round"}} align="right">Manager</TableCell>
            <TableCell sx={{fontFamily: "Varela Round"}} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {goal.map((row) => (
            <Row key={row.title} row={row} goal={goal} setGoals={setGoals}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}