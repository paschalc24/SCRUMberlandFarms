import React, { Component, useState } from "react";
import '../CSSComponents/goalsCalendarList.css'
import data from '../tempStorage.json';


function GoalsCalendarList({value}) {
    let filterGoals = data.users[0].goals.filter(goal => Date.parse(goal.goalEndDate) === Date.parse(value));
    let goalNames = filterGoals.map(goal => goal.goalName);
    let descriptions = filterGoals.map(goal => goal.goalDesc);

    let state = {
        goals: goalNames,
        descriptions: descriptions,
    };

    return (
        <React.Fragment>
        <ul className="goals-calendar-group">
            {state.goals.map(goal => (
                <li 
                key = {goal[0]}
                className="goal-item">
                {goal} 
                </li>
            ))}
            {state.descriptions.map(description => (
                <li 
                key = {description}
                className="goal-item">
                {description} 
                </li>
            ))}
        </ul>
    </React.Fragment>
    );
}

export default GoalsCalendarList;