import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'; 
import moment from 'moment'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import '../CSSComponents/MarkGoal.css';

export default function MarkGoal(props) {
    const findGoal = props.goals.filter((item) => item.goal.goalId === props.goalId);
    const goalToUpdate = findGoal[0].goal;
    const curStatus = goalToUpdate.status === "Completed" ? true : false
    const [checked, setChecked] = useState(curStatus);
    
    const handleChange = () => {
        setChecked(!checked);
        let status = !checked === false ? "In-Progress" : "Completed";
        updateStatus(status);
    };

    const updateStatus = (status) => {
        goalToUpdate.status = status;
        //i dont know why, but the list wouldnt rerender without mapping it for absolutely no reason
        const newList = props.goals.map(i => i);


        var qs = require('qs');
        var data = qs.stringify({
            goalId: goalToUpdate.goalId,
            employeeId: goalToUpdate.employeeId,
            companyName: goalToUpdate.companyName,
            managerId: goalToUpdate.managerId,
            title: goalToUpdate.title,
            category: goalToUpdate.category,
            startDate: moment(goalToUpdate.startDate, "ddd MMM DD YYYY").format('YYYY-MM-DD'),
            endDate: moment(goalToUpdate.endDate, "ddd MMM DD YYYY").format('YYYY-MM-DD'),
            status: status,
            textField: goalToUpdate.textField,
            creationDate: moment(goalToUpdate.creationDate, "ddd MMM DD YYYY").format('YYYY-MM-DD'),
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
                        Mark
                    </Tooltip>
                }
            >
             <input type="checkbox" 
             className="markGoal"
             checked={checked}
             onChange={handleChange}/>
            </OverlayTrigger>
        </>
    )
}