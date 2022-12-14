// import * as React from 'react';
import React, { useState } from 'react';
import DeleteGoal from "./DeleteGoal.js";
import EditGoal from "./EditGoal.js";
import MarkGoal from "./MarkGoal.js";
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
import CommentsList from "../UIComponents/CommentsList";

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
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{goal.creationDate}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{goal.startDate}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{goal.endDate}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{goal.status}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{goal.category}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">
          <DeleteGoal goalId={goal.goalId} goals={props.goals} setGoals={props.setGoals}/>
          <EditGoal goalId={goal.goalId} 
            title={goal.title} 
            employeeId={goal.employeeId}
            sdate={goal.startDate} 
            edate={goal.endDate} 
            status={goal.status} 
            managerId={goal.managerId} 
            textField={goal.textField} 
            goals={props.goals} 
            setGoals={props.setGoals}
          />
          <MarkGoal goalId={goal.goalId} goals={props.goals} setGoals={props.setGoals} status={goal.status}/>
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
              <CommentsList goal={goal} comments={props.comments}/>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props) {
  const [goals, setGoals] = useState(props.employeeProfile.goals);
  return (
    <TableContainer className="tableCont" style={{ maxHeight: '100%' }} component={Paper}sx={{
      '.MuiTable-root': {
        fontFamily: "Varela Round"
      },
    }}>
      <GoalsHeader employeeProfile={props.employeeProfile} view={props.view} transition={props.transition} goals={goals} setGoals={setGoals} value={props.value} setValue={props.setValue}/>
      <Table stickyHeader aria-label="collapsible table">
        <TableHead >
          <TableRow >
            <TableCell />
            <TableCell sx={{fontFamily: "Varela Round"}}>Goal</TableCell>
            <TableCell sx={{fontFamily: "Varela Round"}} align="right">Date Created</TableCell>
            <TableCell sx={{fontFamily: "Varela Round"}} align="right">Start Date</TableCell>
            <TableCell sx={{fontFamily: "Varela Round"}} align="right">End Date</TableCell>
            <TableCell sx={{fontFamily: "Varela Round"}} align="right">Status</TableCell>
            <TableCell sx={{fontFamily: "Varela Round"}} align="right">Category</TableCell>
            <TableCell sx={{fontFamily: "Varela Round"}} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {goals.map((item) => {
            return(<Row key={item.goal.goalId} comments={item.comments} goal={item.goal} goals={goals} setGoals={setGoals}/>)
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}