import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { VscAdd } from 'react-icons/vsc';
import '../CSSComponents/CreateManagerGoal.css';
import moment from 'moment'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'; 

export default function CreateManagerGoal(props) {

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
        setShowError(false);
        addGoal(
         "testempid",
         "UKG", 
         "testmanid", 
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

    function createData(id, title, sdate, edate, status, manager, textField) {
        return {
          id,
          title,
          sdate,
          edate,
          status,
          manager,
          textField
        };
    }

    const convertDate = (date) => {
        const [year, month, day] = date.split('-');
        return new Date([month, day, year].join('/')).toDateString();
    }

    const addGoal = (employeeId, companyName, managerId, title, category, startDate, endDate, status, textField) => {
        props.goals.push(
            createData(Math.floor(Math.random() * 1000), goalName, convertDate(startDate), convertDate(endDate), status, manager, textField)
        );
        //i dont know why, but the list wouldnt rerender without mapping it for absolutely no reason
        const newList = props.goals.map(i => i);

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
            .then(res => console.log((res.data)))//props.setGoals({ newList: res.data }))
            .catch(err => console.log(err));

        props.setGoals(newList);
    }

    return (
        <>
            <button size="sm" className="add-goal-button" onClick={handleShow}>
                <VscAdd className='addIcon' size={20}/>
            </button>
            
            <Modal className="formModal" show={show} onHide={handleCloseNo} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton> 
                <Modal.Title id="headerTitle">Create Goal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Goal Name</Form.Label>
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
                            <Form.Label>Employees</Form.Label>
                            <Form.Select value={status} onChange={e => setStatus(e.target.value)} aria-label="Default select example">
                                <option value="eNone">None</option>
                                <option value="eJason">Jason</option>
                                <option value="eMeng">Meng</option>
                                <option value="ePaschal">Paschal</option>
                                <option value="eAll">All</option>
                            </Form.Select>
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