import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import CreateComment from "./CreateComment.js";
import EditComment from "./EditComment.js";
import DeleteComment from "./DeleteComment.js";
import "../CSSComponents/CommentsList.css";
import "../CSSComponents/deleteGoal.css";

function CommentsList(props) {
    const [comments, setComments] = useState(props.goal.comments);
    if (comments.length === 0) { 
        return (
            <React.Fragment key={comments.commentid}>
                <Typography className="comment1" sx={{fontFamily: "Varela Round"}} variant="subtitle2" gutterBottom component="div">
                Leave a Comment...
                <CreateComment goal={props.goal} comments={comments} setComments={setComments}/>
                </Typography>
            </React.Fragment>
        )
    }
    else {
    return (
        comments.map(comment => {
            return (
                <React.Fragment key={comment.commentId}>
                    <Typography className="comment1" sx={{fontFamily: "Varela Round"}} variant="subtitle2" gutterBottom component="div">
                    {comment.employeeId} : {comment.timestamp} : {comment.textField}
                    <DeleteComment comments={comments} commentId={comment.commentId} setComments={setComments}/>
                    <EditComment goal={props.goal} commentId={comment.commentId} comments={comments} setComments={setComments}/>
                    </Typography>
                </React.Fragment>
            );
        })
    );
    }
}

export default CommentsList;