import React, { Component } from "react";
import '../CSSComponents/goalslist.css'
import GoalsHeader from "./GoalsHeader";

class GoalsList extends Component {
  state = {
    goals: [['Goal #1', 'Due Date: Tue Feb 07 2023'], ['Goal #2', 'Due Date: Thu Oct 20 2022'], ['Goal #3', 'Due Date: Wed Nov 2 2022']]
  };

  render() {
    return (
      <ul className="main-view">
        <GoalsHeader/>
        <React.Fragment>
          {this.state.goals.map(goal => (
            <li className="goal-item">
              <div className="goal-name">
                {goal[0]}
              </div>
              <div className="goal-due-date">
                {goal[1]}
              </div>
            </li>
          ))}
        </React.Fragment>
      </ul>
    );
  }
}

export default GoalsList;