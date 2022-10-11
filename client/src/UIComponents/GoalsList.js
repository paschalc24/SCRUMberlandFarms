import React, { Component } from "react";
import '../CSSComponents/goalslist.css'

class GoalsList extends Component {
  state = {
    goals: ['Goal 1','Goal 2', 'Goal 3']
  };

  render() {
    return (
      <React.Fragment>
          <ul className="goals-group">
              {this.state.goals.map(goal => (
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
}

export default GoalsList;