import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { VscAdd } from 'react-icons/vsc';
import '../CSSComponents/createGoal.css';
import moment from 'moment'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'; 

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function CreateGoal(props) {

    const [show, setShow] = useState(false);
    const [goalTitle, setGoalTitle] = useState('');
    const creationDate = moment((new Date(Date.now()))).format('YYYY-MM-DD');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const status = "In-Progress";
    const [category, setCategory] = useState('');
    const [textField, setTextField] = useState('');
    
    const [showError, setShowError] = React.useState(false)

    const handleRequired = () => {
        setShowError(true);
    }

    const handleCloseYes = () => {
        setShowError(false);
        addGoal(
            props.employeeProfile.employee.employeeId,
            props.employeeProfile.employee.companyName, 
            props.employeeProfile.employee.managerId, 
            goalTitle, 
            category, 
            moment(startDate).format('YYYY-MM-DD'), 
            moment(endDate).format('YYYY-MM-DD'),
            status,
            textField
        );

        setShow(false);
    }
    const handleCloseNo = () => setShow(false);

    const handleShow = () => setShow(true);

    function createData(employeeId, category, creationDate, companyName, endDate, goalId, managerId, startDate, status, textField, title) {
        return {
            goal: { 
            employeeId,
            category,
            creationDate,
            companyName,
            endDate,
            goalId,
            managerId,
            startDate,
            status,
            textField,
            title
            },
            comments: []
        };
    }

    const addGoal = (employeeId, companyName, managerId, title, category, startDate, endDate, status, textField) => {
        axios
            .post("http://127.0.0.1:8000/goals/post/", {
                employeeId: employeeId,
                companyName: companyName,
                managerId: managerId,
                title: title,
                category: category,
                startDate: startDate,
                endDate: endDate,
                status: status,
                textField: textField,
            })
            .then(res => {
                console.log("data: ", (res.data));
                const employeeInfo = props.employeeProfile.employee;
                props.goals.push(
                    createData(employeeInfo.employeeId, category, creationDate, employeeInfo.companyName, endDate, res.data.success.goalId, employeeInfo.managerId, startDate, status, textField, title)
                );
                //i dont know why, but the list wouldnt rerender without mapping it for absolutely no reason
                const newList = props.goals.map(i => i);
                props.setGoals(newList);
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
                    <Tooltip id={'create-goal-tooltip'}>
                        New Goal
                    </Tooltip>
                }
            >
                <button className="create-button" size="sm" onClick={handleShow}>
                    <VscAdd className='addIcon' size={20}/>
                </button>
            </OverlayTrigger>
            
            <Modal className="formModal" show={show} onHide={handleCloseNo} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton> 
                <Modal.Title id="headerTitle">Create Goal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Goal Title</Form.Label>
                            <Form.Control value={goalTitle} onChange={e => setGoalTitle(e.target.value)} type="text" required/>
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
                        {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Status</Form.Label>
                            <Form.Select value={status} onChange={e => setStatus(e.target.value)} aria-label="Default select example">
                                <option value="In-Progress">In-Progress</option>
                                <option value="Completed">Completed</option>
                            </Form.Select>
                        </Form.Group> */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Category</Form.Label>
                            <Form.Control value={category} onChange={e => setCategory(e.target.value)} type="text" required/>
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
                    <Button className="yesButton" variant="primary" onClick={goalTitle !== '' && category !== '' && textField !== '' ? handleCloseYes : handleRequired}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}