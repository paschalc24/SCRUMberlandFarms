import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import EmployeesHeader from "./EmployeesHeader";
import ViewEmployeeGoals from "./ViewEmployeeGoals";
import EmployeeGoalsFocus from "./EmployeeGoalsFocus"

import '../CSSComponents/EmployeesList.css';

import PropTypes from 'prop-types';


const initialEmployees = [];

function EmployeeRow(props) {

    const { employee } = props; //the employee associated with this managed-employees table entry
    const { setViewedGoals } = props;

    return (
        <React.Fragment >
            <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{fontFamily: "Varela Round"}} align="left">{employee.firstName}</TableCell>
                <TableCell sx={{fontFamily: "Varela Round"}} align="left">{employee.lastName}</TableCell>
                <TableCell sx={{fontFamily: "Varela Round"}} align="left">{employee.startDate}</TableCell>
                <TableCell sx={{fontFamily: "Varela Round"}} align="left">{employee.email}</TableCell>
                <TableCell sx={{fontFamily: "Varela Round"}} align="left">{employee.positionTitle}</TableCell>
                <TableCell sx={{fontFamily: "Varela Round"}} align="right">
                    <ViewEmployeeGoals employee={employee} setViewedGoals={setViewedGoals} />
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


EmployeeRow.propTypes = {
    employee: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired, 
        startDate: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        positionTitle: PropTypes.string.isRequired
    }).isRequired,
    setGoals: PropTypes.func.isRequired
};


function EmployeesList(props) {

    const [employees, setEmployees] = useState(initialEmployees); //the employees displayed in the managed-employees list
    const [goals, setEmployeeGoals] = useState([]); //these are the goals that should be displayed in the left view component
    const [header, setHeader] = useState("No Goals Displayed"); //the header of the left view component that tells the user who's goals they are viewing

    function setViewedGoals(employee, currentGoals) {
        setHeader(employee.firstName + " " + employee.lastName + "'s goals");
        setEmployeeGoals(currentGoals);
    }

    return(
        <React.Fragment>
            <TableContainer className="employees-list" style={{ maxHeight: '100%'}} component={Paper}>
                <EmployeesHeader transition={props.transition}/>
                <Row className="view">
                    <Col sm={8} className="employees">
                        <Table stickyHeader aria-label="collapsible table">
                            <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell sx={{fontFamily: "Varela Round"}} align="left">First Name</TableCell>
                                <TableCell sx={{fontFamily: "Varela Round"}} align="left">Last Name</TableCell>
                                <TableCell sx={{fontFamily: "Varela Round"}} align="left">Start Date</TableCell>
                                <TableCell sx={{fontFamily: "Varela Round"}} align="left">Email</TableCell>
                                <TableCell sx={{fontFamily: "Varela Round"}} align="left">Position</TableCell>
                                <TableCell sx={{fontFamily: "Varela Round"}} align="left"></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.map((employee) => {
                                    return(<EmployeeRow employee={employee} setViewedGoals={setViewedGoals}/>)
                                })}
                            </TableBody>
                        </Table>
                    </Col>
                    <Col sm={4} className="employee-goals">
                        <EmployeeGoalsFocus goals={goals} header={header}/>
                    </Col>
                </Row>
            </TableContainer>
        </React.Fragment>
    );
}

export default EmployeesList;