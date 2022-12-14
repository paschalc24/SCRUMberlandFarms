import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import '../CSSComponents/createGoal.css';
import moment from 'moment'
import { MdOutlineModeEditOutline } from 'react-icons/md';
import '../CSSComponents/editGoal.css';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'; 

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function EditComment(props) {
    const [show, setShow] = useState(false);
    const [textField, setTextField] = useState('');
    const [showError, setShowError] = React.useState(false);

    const handleRequired = () => {
        setShowError(true);
    }

    const handleCloseYes = () => {
        setShowError(false);
        putComment(
            props.commentId,
            props.goal.companyName, 
            props.goal.goalId,
            props.goal.employeeId,
            moment((new Date(Date.now()))).format('YYYY-MM-DD'),
            textField
        );
        setShow(false);
    }
    const handleCloseNo = () => setShow(false);

    const handleShow = () => setShow(true);

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

    const putComment = (commentId, companyName, goalId, employeeId, timestamp, textField) => {

        axios
            .put("http://127.0.0.1:8000/comments/update/", {
                commentId: commentId,
                companyName: companyName,
                goalId: goalId,
                employeeId: employeeId,
                timestamp: timestamp,
                textField: textField
            })
            .then(res => {
                console.log("data: ", (res.data));
                props.comments.splice(props.comments.findIndex((comment) => comment.commentId === commentId), 1);
                props.comments.push(
                    createData(commentId, companyName, goalId, employeeId, timestamp, textField)
                );
                //i dont know why, but the list wouldnt rerender without mapping it for absolutely no reason
                const newList = props.comments.map(i => i);
                props.setComments(newList);
            })
            .catch(err => console.log(err));
    }

    return (
        <>
        
            <OverlayTrigger
                trigger={["hover", "hover"]}
                key={'bottom'}
                placement={'bottom'}
                overlay = {
                    <Tooltip id={'edit-goal-tooltip'}>
                        Edit
                    </Tooltip>
                }
            >
                <button size="sm" className="edit" onClick={handleShow}>
                    <MdOutlineModeEditOutline size={18}/>
                </button>
            </OverlayTrigger>
            
            <Modal className="formModal" show={show} onHide={handleCloseNo} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton> 
                <Modal.Title id="headerTitle">Edit Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>New Description</Form.Label>
                            <Form.Control value={textField} onChange={e => setTextField(e.target.value)} as="textarea" rows={2} required/>
                        </Form.Group>
                    </Form>
                    <div>
                        { showError ? <div className="errorMsg" style={{textAlign: 'center', 'color': 'red'}}>Please fill out every field.</div> : null }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseNo}>
                        Cancel
                    </Button>
                    <Button className="yesButton" variant="primary" onClick={textField !== '' ? handleCloseYes : handleRequired}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}