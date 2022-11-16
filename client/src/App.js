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
            <Col><CollapsibleTable view={managerView}/></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
export {managerView};