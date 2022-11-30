import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import '../CSSComponents/createGoal.css';
import moment from 'moment'
import { MdOutlineModeEditOutline } from 'react-icons/md';
import '../CSSComponents/editGoal.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'; 

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function EditGoal(props) {
    const [show, setShow] = useState(false);

    const [goalName, setGoalName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [status, setStatus] = useState('In-Progress');
    const [manager, setManager] = useState('');
    const [textField, setTextField] = useState('');
    
    const [showError, setShowError] = React.useState(false)

    const handleRequired = () => {
        setShowError(true);
    }

    const handleCloseYes = () => {
        let data = JSON.parse(sessionStorage.getItem("employeeProfile"))["employee"];
        setShowError(false);
        updateGoal(
         data["employeeId"],
         data["companyName"], 
         data["managerId"], 
         goalName, 
         "testCategory", 
         moment(startDate).format('YYYY-MM-DD'), 
         moment(endDate).format('YYYY-MM-DD'),
         status,
         textField
        );

        setShow(false);
    }
    const handleCloseNo = () => setShow(false);

    const handleShow = () => setShow(true);

    const convertDate = (date) => {
        const [year, month, day] = date.split('-');
        return new Date([month, day, year].join('/')).toDateString();
    }

    const updateGoal = (employeeId, companyName, managerId, title, category, startDate, endDate, status, textField) => {
        const findGoal = props.goals.filter((item) => item.goalId === props.goalId);
        const goalToUpdate = findGoal[0];
        console.log("goaltoupdate: ", goalToUpdate);
        goalToUpdate.title = title;
        goalToUpdate.sdate = convertDate(startDate);
        goalToUpdate.edate = convertDate(endDate);
        goalToUpdate.status = status;
        goalToUpdate.manager = manager;
        goalToUpdate.textField = textField;
        console.log("goaltoupdate1: ", goalToUpdate);
        //i dont know why, but the list wouldnt rerender without mapping it for absolutely no reason
        const newList = props.goals.map(i => i);

        var qs = require('qs');
        var data = qs.stringify({
            goalId: goalToUpdate.goalId,
            employeeId: employeeId,
            companyName: companyName,
            managerId: managerId,
            title: title,
            category: category,
            startDate: startDate,
            endDate: endDate,
            status: goalToUpdate.status,
            textField: goalToUpdate.textField,
            creationDate: moment(goalToUpdate.cdate, "ddd MMM DD YYYY").format('YYYY-MM-DD')
        });
        var config = {
          method: 'put',
          url: 'http://127.0.0.1:8000/goals/update/',
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
        

        props.setGoals(newList);
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
                <Modal.Title id="headerTitle">Update Goal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Goal Title</Form.Label>
                            <Form.Control value={goalName} onChange={e => setGoalName(e.target.value)} type="text" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" id="dates" controlId="exampleForm.ControlTextarea1">
                            <div id="startDateTitle">
                                <Form.Label>Start Date</Form.Label>
                                <DatePicker className="startDate" selected={startDate} onChange={(date) => setStartDate(date)}/>
                            </div>
                            <div id="endDateTitle">
                                <Form.Label>End Date</Form.Label>
                                <DatePicker className="endDate" selected={endDate} onChange={(date) => setEndDate(date)}/>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Status</Form.Label>
                            <Form.Select value={status} onChange={e => setStatus(e.target.value)} aria-label="Default select example">
                                <option value="In-Progress">In-Progress</option>
                                <option value="Completed">Completed</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Manager</Form.Label>
                            <Form.Control value={manager} onChange={e => setManager(e.target.value)} type="text" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Description</Form.Label>
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
                    <Button className="yesButton" variant="primary" onClick={goalName !== '' || manager !== '' || textField !== '' ? handleCloseYes : handleRequired}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}