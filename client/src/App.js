import React, { useState } from 'react';

import Header from "./UIComponents/Header.js";

import 'react-calendar/dist/Calendar.css';
import './CSSComponents/Grid.css';

import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ManagerGoalsList from "./UIComponents/ManagerGoalsList.js";
import CollapsibleTable from "./UIComponents/GoalsList.js";
import TestApi from "./UIComponents/TestAPI.js";
import data from "./tempStorage.json";

function createData(id, title, sdate, edate, status, manager, description) {
  return {
    id,
    title,
    sdate,
    edate,
    status,
    manager,
    description
  };
}

const userGoals = data.users[0].goals;
const goals = [];
for (let i = 0; i < userGoals.length; ++i) {
  goals.push(createData(userGoals[i].goalid, userGoals[i].goalName, new Date(userGoals[i].goalStartDate).toDateString(), new Date(userGoals[i].goalEndDate).toDateString(), userGoals[i].status, userGoals[i].manager));
}
const managerView = false;

function App() {
  const [value, setValue] = useState(new Date());
  const [goalData, setGoalData] = useState();

  const viewTitle = managerView ? "Manager Name": "Employee Name";
  if (managerView) {
    return (
      <div className="App">
        <TestApi/>
        <Container fluid> 
          <Row><Header view={managerView} vTitle={viewTitle}/></Row>
          <Row className="mainRow">
              <ManagerGoalsList view={managerView}/>
          </Row>
        </Container>
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <Container fluid> 
          <Row><Header view={managerView} vTitle={viewTitle}/></Row>
          <Row className="mainRow">
            <Col><CollapsibleTable goals={goals} view={managerView}/></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
export {managerView};