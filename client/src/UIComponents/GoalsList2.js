// import * as React from 'react';
import React, { useState, useEffect } from 'react';

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

function createData(id, title, sdate, edate, status, manager, description) {
  return {
    id,
    title,
    sdate,
    edate,
    status,
    manager,
    description
  };
}

function Row(props) {
  const { row } = props;
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
        <TableCell sx={{fontFamily: "Varela Round"}} component="th" scope="row" >{row.title}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{row.sdate}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{row.edate}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{row.status}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{row.manager}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right"><DeleteGoal id={row.id} goals={props.goals} setGoals={props.setGoals}/><EditGoal title={row.title} goals={props.goals} setGoals={props.setGoals}/></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography sx={{fontFamily: "Varela Round"}} variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <Typography sx={{fontFamily: "Varela Round"}} variant="h10" gutterBottom component="div">
                    {row.description}
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

const userGoals = data.users[0].goals;
const rows = [
  // createData(userGoals[0].goalid, userGoals[0].goalName, new Date(userGoals[0].goalStartDate).toDateString(), new Date(userGoals[0].goalEndDate).toDateString(), userGoals[0].status, userGoals[0].manager),
  // createData(userGoals[1].goalid, userGoals[1].goalName, new Date(userGoals[1].goalStartDate).toDateString(), new Date(userGoals[1].goalEndDate).toDateString(), userGoals[1].status, userGoals[1].manager),
  // createData(userGoals[2].goalid, userGoals[2].goalName, new Date(userGoals[2].goalStartDate).toDateString(), new Date(userGoals[2].goalEndDate).toDateString(), userGoals[2].status, userGoals[2].manager),
];

export default function CollapsibleTable(props) {
  const [goals, setGoals] = useState(rows);
  return (
    <TableContainer className="tableCont" style={{ maxHeight: '100%' }} component={Paper}sx={{
      '.MuiTable-root': {
        fontFamily: "Varela Round"
      },
    }}>
      <GoalsHeader transition={props.transition} goals={goals} setGoals={setGoals}/>
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
          {goals.map((row) => {
            return(<Row key={row.title} row={row} goals={goals} setGoals={setGoals}/>)
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}