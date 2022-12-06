import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'; 
import moment from 'moment'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import '../CSSComponents/MarkGoal.css';

export default function MarkGoal(props) {
    const findGoal = props.goals.filter((item) => item.goalId === props.goalId);
    const [checked, setChecked] = React.useState(JSON.parse(sessionStorage.getItem(props.goalId)) || false);
    
    const handleChange = () => {
        setChecked(!checked);
        let status = !checked == false ? "In-Progress" : "Completed";
        updateStatus(status);
        sessionStorage.setItem(props.goalId, !checked)

    };

    const updateStatus = (status) => {
        const goalToUpdate = findGoal[0];
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
            startDate: moment(goalToUpdate.sdate, "ddd MMM DD YYYY").format('YYYY-MM-DD'),
            endDate: moment(goalToUpdate.edate, "ddd MMM DD YYYY").format('YYYY-MM-DD'),
            status: status,
            textField: goalToUpdate.textField,
            creationDate: moment(goalToUpdate.cdate, "ddd MMM DD YYYY").format('YYYY-MM-DD'),
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