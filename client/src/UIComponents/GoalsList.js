import React, { Component } from "react";
import '../CSSComponents/goalslist.css'
import GoalsHeader from "./GoalsHeader";

class GoalsList extends Component {
  state = {
    goals: [['Goal #1', 'Due Date: Sun, Dec 11, 2022'], ['Goal #2', 'Due Date: Sat, Feb 11, 2023'], ['Goal #3', 'Due Date: Mon, Dec 26, 2022'],
    ['Goal #4', 'Due Date: Mon, Dec 11, 2023'], ['Goal #5', 'Due Date: Sun, Jan 22, 2023'], ['Goal #6', 'Due Date: Wed, May 8, 2021']]
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