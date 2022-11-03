import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import EmployeesHeader from "./EmployeesHeader";

import '../CSSComponents/EmployeesList.css';

function EmployeesList(props) {
    return(
        <TableContainer component={Paper}>
            <EmployeesHeader transition={props.transition}/>
            <Table stickyHeader aria-label="collapsible table">
                <TableHead>
                <TableRow>
                    <TableCell sx={{fontFamily: "Varela Round"}}>Employee</TableCell>
                    <TableCell sx={{fontFamily: "Varela Round"}} align="right">Goal Title</TableCell>
                    <TableCell sx={{fontFamily: "Varela Round"}} align="right">Start Date</TableCell>
                    <TableCell sx={{fontFamily: "Varela Round"}} align="right">End Date</TableCell>
                    <TableCell sx={{fontFamily: "Varela Round"}} align="right">Status</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default EmployeesList;