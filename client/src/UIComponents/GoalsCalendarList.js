import React, { Component, useState } from "react";
import '../CSSComponents/goalsCalendarList.css'
import data from '../tempStorage.json';
import Card from 'react-bootstrap/Card';
import '../CSSComponents/card.css';

function GoalsCalendarList({value}) {
    let filterGoals = data.users[0].goals.filter(goal => Date.parse(goal.goalEndDate) === Date.parse(value));
    let goalNames = filterGoals.map(goal => goal.goalName);
    let goalDescriptions = filterGoals.map(goal => goal.goalName);

    let state = {
        goals: filterGoals,
        // descriptions: descriptions,
    };

    return (
        <div className="goals-calendar-group">
            {
            state.goals.map(goal => (
                <div 
                key = {goal.goalName}
                className="goal-item">
                {[
                    'Light'
                ].map((variant) => (
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
                        Manager: {goal.manager}.
                        </Card.Text>
                    </Card.Body>
                    </Card>
                ))}
                </div>
            ))}
        </div>
    );
}

export default GoalsCalendarList;