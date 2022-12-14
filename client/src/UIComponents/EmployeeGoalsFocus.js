import React, { useState }from "react";

import "../CSSComponents/EmployeeGoalsFocus.css";

import axios from 'axios'; 
import moment from 'moment'

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


function CommentEmployeeGoals(props) {

    const { goal } = props;
    const { associatedEmployeeName } = props;

    const [show, setShow] = useState(false);
    const [textField, setTextField] = useState('');
    const [showError, setShowError] = React.useState(false);
    const [comments, setComments] = useState(goal.comments);

    const closeModal = () => {
        setShowError(false);
        setShow(false);
        setTextField('');
    }

    const handleCloseYes = () => {
        setShowError(false);
        postComment(
            props.goal.goal.companyName, 
            props.goal.goal.goalId,
            props.goal.goal.employeeId,
            moment((new Date(Date.now()))).format('YYYY-MM-DD'),
            textField
        );
        setShow(false);
    }

    function createData(commentId, companyName, goalId, employeeId, timestamp, textField) {
        return {
          commentId,
          companyName,
          goalId,
          employeeId,
          timestamp,
          textField,
        };
    }

    const postComment = (companyName, goalId, employeeId, timestamp, textField) => {
        console.log(createData(companyName, goalId, employeeId, timestamp, textField))
        axios
            .post("http://127.0.0.1:8000/comments/post/", {
                companyName: companyName,
                goalId: goalId,
                employeeId: employeeId,
                timestamp: timestamp,
                textField: textField
            })
            .then(res => {
                console.log("data: ", (res.data));
                comments.push(
                    createData(res.data.success.commentId, companyName, goalId, employeeId, timestamp, textField)
                );
                //i dont know why, but the list wouldnt rerender without mapping it for absolutely no reason
                const newList = comments.map(i => i);
                setComments(newList);
            })
            .catch(err => console.log(err));
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
                        <span className="goal-description">Goal Description:&nbsp;</span>{goal.goal.title}
                    </Form.Label>
                    <br></br>
                    <Form.Label>
                        <span className="goal-due-date">Due:&nbsp;</span>{goal.goal.endDate}
                    </Form.Label>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Leave a Comment</Form.Label>
                        <Form.Control value={textField} onChange={e => setTextField(e.target.value)} as="textarea" rows={2} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            <span className="comments-section-header">Comments:</span>
                        </Form.Label>
                        <ul className="comments-display">
                            {comments.map((comment) => {
                                return(<li key={comment.commentId}>{comment.textField}</li>);
                            })}
                        </ul>
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
    //const { comments } = props;
    //const { setComments } = props;

    return(
        <TableRow style={{height: "15%"}}>
            <ul className="individual-goal">
                <li className="goal-header">
                    Due {goal.goal.endDate}
                    <CommentEmployeeGoals goal={goal} associatedEmployeeName={associatedEmployeeName}/>
                </li>
                <li className="goal-body">{goal.goal.title}</li>
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