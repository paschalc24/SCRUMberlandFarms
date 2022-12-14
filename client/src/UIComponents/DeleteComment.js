import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CgTrash } from 'react-icons/cg';
import '../CSSComponents/DeleteComment.css';
import axios from 'axios'; 
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function DeleteComment(props) {

    const [show, setShow] = useState(false);

    const handleCloseYes = () => {
        deleteRow();
        setShow(false);
    };
    const handleCloseNo = () => setShow(false);

    const handleShow = () => setShow(true);

    const deleteRow = () => {
        const newComments = props.comments.filter(comment => comment.commentId !== props.commentId);
        const newList = props.goals.map((item) => {
            if (item.goal.goalId) {
                let result = {};
                let filteredComments = [];
                filteredComments = item.comments.filter(comment => comment.commentId !== props.commentId);
                result.goal = item.goal;
                result.comments = filteredComments;
                return result;
            }
            return item;
        });
        axios
            .delete("http://127.0.0.1:8000/comments/delete/", {
                data: {commentId: props.commentId}
            })
            .then(res => console.log("data: ", res))
            .catch(err => console.log(err));
        props.setComments(newComments);
        props.setGoals(newList);
    };

    return (
        <>
            <OverlayTrigger
                trigger={["hover", "hover"]}
                key={'bottom'}
                placement={'bottom'}
                overlay = {
                    <Tooltip id={'delete-goal-tooltip'}>
                        Delete
                    </Tooltip>
                }
            >
                <button className="delete" onClick={handleShow}>
                    <CgTrash size={18}/>
                </button>
            </OverlayTrigger>

            <Modal show={show} onHide={handleCloseNo}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
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