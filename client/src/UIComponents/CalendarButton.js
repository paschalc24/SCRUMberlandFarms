import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cal from "../UIComponents/Calendar.js";
import { BsCalendarEvent } from "react-icons/bs";
import "react-datepicker/dist/react-datepicker.css";
import '../CSSComponents/CalendarButton.css';

export default function CalendarButton(props) {

    const [show, setShow] = useState(false);
    
    const [showError, setShowError] = React.useState(false)

    const handleRequired = () => {
        setShowError(true);
    }

    const handleCloseYes = () => {

        setShow(false);
    }
    const handleCloseNo = () => setShow(false);

    const handleShow = () => setShow(true);

    return (
        <>
            <button className="cal-button" size="sm" onClick={handleShow}>
                <BsCalendarEvent className='AiOutlineCalendar' size={20}/>
            </button>
            
            <Modal className="formModal" show={show} onHide={handleCloseNo} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body><Cal value={props.value} setValue={props.setValue}/></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseNo}>
                        Cancel
                    </Button>
                    <Button className="yesButton" variant="primary" onClick={handleCloseYes}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}