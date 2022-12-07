import React, { useState }from "react";

import "../CSSComponents/EmployeeGoalsFocus.css";
import PropTypes from 'prop-types';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { SlSpeech } from "react-icons/sl";


const thisEmployeesGoals = [{name: "learn Node.js", deadline: "12/20/22"}, {name: "complete training modules", deadline: "12/24/22"}, {name: "learn backend stuff to help learn backend stuff to help learn backend stuff to help", deadline: "12/30/22"},
                            {name: "learn Node.js", deadline: "12/20/22"}, {name: "complete training modules", deadline: "12/24/22"}, {name: "learn backend stuff to help", deadline: "12/30/22"}];

EmployeeGoalItem.propTypes = {
    goal: PropTypes.shape({
        name: PropTypes.string.isRequired,
        deadline: PropTypes.string.isRequired
    }).isRequired
};


function ViewEmployeeGoals() {
    return (
    <>
        <OverlayTrigger
            trigger={["hover", "hover"]}
            key={'bottom'}
            placement={'left'}
            overlay = {
                <Tooltip id={'comment-on-employee-goal-tooltip'}>
                    More Info & Comment
                </Tooltip>
            }
        >
            <button size="sm" className="comment-button">
                <SlSpeech size={20}/>
            </button>
        </OverlayTrigger>
    </>
    );
}


function EmployeeGoalItem(props) {

    const { goal } = props;

    return(
        <TableRow style={{height: "15%"}}>
            <ul className="individual-goal">
                <li className="goal-header">
                    Due {goal.deadline}
                    <ViewEmployeeGoals/>
                </li>
                <li className="goal-body">{goal.name}</li>
            </ul>
        </TableRow>
    );
}


function EmployeeGoalsFocus() {

    const [goals, setEmployeeGoals] = useState(thisEmployeesGoals);
    const [header, setHeader] = useState("No Goals Displayed");

    return(
        <React.Fragment>
            <TableContainer className="view" style={{ height: '100%'}}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontFamily: "Varela Round"}} align="center">{header}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="view-table">
                        {goals.map(goal => {
                            return(<EmployeeGoalItem goal={goal}/>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}


export default EmployeeGoalsFocus;