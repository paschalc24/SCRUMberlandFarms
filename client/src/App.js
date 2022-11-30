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


const employeeInfo = JSON.parse(sessionStorage.getItem("employeeProfile"))["employee"];
const managerView = employeeInfo.isManager;
const employeeName = employeeInfo.firstName + " " + employeeInfo.lastName;

function App() {
  const [value, setValue] = useState();
  if (managerView) {
    return (
      <div className="App">
        <Container fluid> 
          <Row><Header view={managerView} vTitle={employeeName}/></Row>
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
          <Row><Header view={managerView} vTitle={employeeName}/></Row>
          <Row className="mainRow">
            <Col><CollapsibleTable view={managerView} value={value} setValue={setValue}/></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
export {managerView};