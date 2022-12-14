import React, { Component, useState } from "react";
import '../CSSComponents/goalsCalendarList.css'
import data from '../tempStorage.json';
import Card from 'react-bootstrap/Card';

function GoalsCalendarList({value}) {
    let filterGoals = data.users[0].goals.filter(goal => Date.parse(goal.goalEndDate) >= Date.parse(value)
                                                    && Date.parse(goal.goalStartDate) <= Date.parse(value));
    let goalNames = filterGoals.map(goal => goal.goalName);
    let goalDescriptions = filterGoals.map(goal => goal.goalName);

    let state = {
        goals: filterGoals,
        // descriptions: descriptions,
    };

    if (filterGoals.length === 0) {
        return (
        <div>No Active Goals Today</div>
        );
    }
    else {
        return (
            <div className="goals-calendar-group">
                {
                state.goals.map(goal => (
                    <div 
                    key = {goal.goalName}
                    className="goal-item">
                    <Card
                    bg={'Light'.toLowerCase()}
                    key={'Light'}
                    text={'Light'.toLowerCase() === 'light' ? 'dark' : 'white'}
                    style={{ width: '100%', height: '100%' }}
                    className="mb-2"
                    >
                    <Card.Header>{goal.goalName}</Card.Header>
                    <Card.Body>
                        <Card.Title>{goal.status}</Card.Title>
                        <Card.Text>
                        {goal.goalDesc} <br></br>
                        Start Date: {new Date(goal.goalStartDate).toDateString()}. <br></br>
                        Due Date: {new Date(goal.goalEndDate).toDateString()}. <br></br>
                        Manager: {goal.managerId}.
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </div>
                ))}
            </div>
        );
    }
}

export default GoalsCalendarList;