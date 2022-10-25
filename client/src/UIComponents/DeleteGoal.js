import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CgTrash } from 'react-icons/cg';
import '../CSSComponents/deleteGoal.css';

export default function DeleteGoal(props) {

    const [show, setShow] = useState(false);

    const handleCloseYes = () => {
        deleteRow(props.title);
        setShow(false);
    };

    const handleCloseNo = () => setShow(false);

    const handleShow = () => setShow(true);

    const deleteRow = (title) => {
        const newList = props.rows.filter((item) => item.title !== title);
        props.setGoals(newList);
        console.log(newList)
    };

    return (
        <>
            <button className="delete" onClick={handleShow}>
                <CgTrash size={18}/>
            </button>

            <Modal show={show} onHide={handleCloseNo}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Goal</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this goal?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseNo}>
                        No
                    </Button>
                    <Button className="yesButton" variant="primary" onClick={handleCloseYes}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}