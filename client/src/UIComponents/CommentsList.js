import React from 'react';
import Typography from '@mui/material/Typography';
import EditComment from "./EditComment.js";
import DeleteComment from "./DeleteComment.js";
import "../CSSComponents/CommentsList.css";
import "../CSSComponents/deleteGoal.css";

function CommentsList(props) {
    if (props.comments.length === 0) { 
        return (
            <React.Fragment key={props.employeeName}>
                <Typography className="comment1" sx={{fontFamily: "Varela Round"}} variant="subtitle2" gutterBottom component="div">
                Leave a Comment...
                </Typography>
            </React.Fragment>
        )
    }
    else {
    return (
        props.comments.map(comment => {
            return (
                <React.Fragment key={comment.commentId}>
                    <Typography className="comment1" sx={{fontFamily: "Varela Round"}} variant="subtitle2" gutterBottom component="div">
                    {props.employeeName} : {comment.timestamp} : {comment.textField}
                    <DeleteComment goalId={props.goalId} goals={props.goals} employeeProfile={props.employeeProfile} comments={props.comments} commentId={comment.commentId} setComments={props.setComments} setGoals={props.setGoals}/>
                    <EditComment goalId={props.goalId} goals={props.goals} employeeProfile={props.employeeProfile} goal={props.goal} commentId={comment.commentId} comments={props.comments} setComments={props.setComments}/>
                    </Typography>
                </React.Fragment>
            );
        })
    );
    }
}

export default CommentsList;