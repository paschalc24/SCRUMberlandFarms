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

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { SlSpeech } from "react-icons/sl";


EmployeeGoalItem.propTypes = {
    goal: PropTypes.shape({
        name: PropTypes.string.isRequired,
        deadline: PropTypes.string.isRequired
    }).isRequired
};


function CommentEmployeeGoals(props) {

    const { goal } = props;
    const { associatedEmployeeName } = props;

    const [show, setShow] = useState(false);
    const [textField, setTextField] = useState('');
    const [showError, setShowError] = React.useState(false);

    const closeModal = () => {
        setShowError(false);
        setShow(false);
    }

    const handleCloseYes = () => {
        setShowError(false);

        setShow(false);
    }

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
            <button size="sm" className="comment-button" onClick={() => setShow(true)}>
                <SlSpeech size={20}/>
            </button>
        </OverlayTrigger>

        <Modal className="formModal" show={show} onHide={closeModal} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton> 
                <Modal.Title id="modal-header">Comment on Goal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>
                        <span className="employee-name">Employee:&nbsp;</span>{associatedEmployeeName}
                    </Form.Label>
                    <br></br>
                    <Form.Label>
                        <span className="goal-description">Goal Description:&nbsp;</span>{goal.name}
                    </Form.Label>
                    <br></br>
                    <Form.Label>
                        <span className="goal-due-date">Due:&nbsp;</span>{goal.deadline}
                    </Form.Label>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control value={textField} onChange={e => setTextField(e.target.value)} as="textarea" rows={2} required/>
                    </Form.Group>
                </Form>
                <div>
                    { showError ? <div className="errorMsg" style={{textAlign: 'center', 'color': 'red'}}>Please fill out every field.</div> : null }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Cancel
                </Button>
                <Button className="confirm-button" variant="primary" onClick={textField !== '' ? handleCloseYes : () => setShowError(true)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}


function EmployeeGoalItem(props) {

    const { goal } = props;
    const { associatedEmployeeName } = props;

    return(
        <TableRow style={{height: "15%"}}>
            <ul className="individual-goal">
                <li className="goal-header">
                    Due {goal.deadline}
                    <CommentEmployeeGoals goal={goal} associatedEmployeeName={associatedEmployeeName}/>
                </li>
                <li className="goal-body">{goal.name}</li>
            </ul>
        </TableRow>
    );
}


function EmployeeGoalsFocus(props) {

    const { goals } = props;
    const { header } = props;
    const { associatedEmployeeName } = props;

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
                            return(<EmployeeGoalItem goal={goal} associatedEmployeeName={associatedEmployeeName}/>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}


export default EmployeeGoalsFocus;