// import * as React from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
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
import TestApi from "./TestAPI.js";
import CommentsList from "../UIComponents/CommentsList";


function createData(employeeId, companyName, managerId, title, category, cdate, sdate, edate, status, textField, goalId, comments) {
  return {
    employeeId,
    companyName,
    managerId,
    title,
    category,
    cdate,
    sdate,
    edate,
    status,
    textField,
    goalId,
    comments
  };
}

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
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{goal.managerId}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">
          <DeleteGoal goalId={goal.goalId} goals={props.goals} setGoals={props.setGoals}/>
          <EditGoal goalId={goal.goalId} 
            title={goal.title} 
            sdate={goal.sdate} 
            edate={goal.edate} 
            status={goal.status} 
            managerId={goal.managerId} 
            textField={goal.textField} 
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
                {goal.textField}
              </Typography>
              <div id="border1"></div>
              <Typography sx={{fontFamily: "Varela Round"}} variant="h6" gutterBottom component="div">
                Comments
              </Typography>
              <CommentsList goal={goal}/>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const convertDate = (date) => {
  const [year, month, day] = date.split('-');
  return new Date([month, day, year].join('/')).toDateString();
}

const setSessionStorage = () => { 
  var config = {
  method: 'get',
  url: 'http://127.0.0.1:8000/employee/get/',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  params: {
    'email': 'Gerald_Cunningham@fluffybunnyconsulting.com',
    'password': 'cunninghamge' 
  }
  };
  axios(config)
  .then(function (response) {
    console.log(response.data)
    sessionStorage.setItem("employeeProfile", JSON.stringify(response.data["success"][0]["employeeProfile"]));
    // console.log(JSON.parse(sessionStorage.getItem("employee")))
  })
  .catch(function (error) {
    console.log(error);
  });
}

setSessionStorage();

const rows = [];

// let data = JSON.parse(sessionStorage.getItem("employeeProfile"))["goals"];
console.log(JSON.parse(sessionStorage.getItem("employeeProfile")))
for(let i = 0; i < data.length; i++) {
  rows.push(createData(data[i].goal.employeeId, 
                       data[i].goal.companyName,
                       data[i].goal.managerId,  
                       data[i].goal.title, 
                       data[i].goal.category, 
                       convertDate(data[i].goal.creationDate), 
                       convertDate(data[i].goal.startDate), 
                       convertDate(data[i].goal.endDate), 
                       data[i].goal.status,
                       data[i].goal.textField,
                       data[i].goal.goalId, 
                       data[i].comments))
}

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
          <TestApi goals={goals} setGoals={setGoals}/>
        </TableBody>
      </Table>
    </TableContainer>
  );
}