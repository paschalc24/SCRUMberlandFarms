import React, { Component } from "react";
import '../CSSComponents/goalsCalendarList.css'


function GoalsCalendarList() {
    let state = {
        goals: ['Test Goal 1']
    };
    return (
        <React.Fragment>
        <ul className="goals-calendar-group">
            {state.goals.map(goal => (
                <li 
                key = {goal}
                className="goal-item">
                {goal} 
                </li>
            ))}
        </ul>
    </React.Fragment>
    );
}

export default GoalsCalendarList;