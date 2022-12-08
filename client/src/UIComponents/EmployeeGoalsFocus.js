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


EmployeeGoalItem.propTypes = {
    goal: PropTypes.shape({
        name: PropTypes.string.isRequired,
        deadline: PropTypes.string.isRequired
    }).isRequired
};


function CommentEmployeeGoals(props) {

    const { goal } = props;

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
                    <CommentEmployeeGoals goal={goal}/>
                </li>
                <li className="goal-body">{goal.name}</li>
            </ul>
        </TableRow>
    );
}


function EmployeeGoalsFocus(props) {

    const { goals } = props;
    const { header } = props;

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