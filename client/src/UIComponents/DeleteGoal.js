import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CgTrash } from 'react-icons/cg';
import '../CSSComponents/deleteGoal.css';
import axios from 'axios'; 

export default function DeleteGoal(props) {

    const [show, setShow] = useState(false);

    const handleCloseYes = () => {
        deleteRow();
        setShow(false);
    };
    const handleCloseNo = () => setShow(false);

    const handleShow = () => setShow(true);

    const deleteRow = () => {
        const newList = props.goals.filter((item) => item.id !== props.id);
        // axios
        //     .delete("http://127.0.0.1:8000/goals/delete/", {
        //         data: {goalId: props.id}
        //     })
        //     .then(res => console.log(res))//props.setGoals({ newList: res.data }))
        //     .catch(err => console.log(err));

        props.setGoals(newList);
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