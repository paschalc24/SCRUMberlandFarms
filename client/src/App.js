import React, { useState } from 'react';

import Header from "./UIComponents/Header.js";

import 'react-calendar/dist/Calendar.css';
import './CSSComponents/Grid.css';

import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import ManagerGoalsList from "./UIComponents/ManagerGoalsList.js";
import CollapsibleTable from "./UIComponents/GoalsList.js";


let employeeInfo = "";
let managerView = "";
let employeeName = "";

const setSessionStorage = () => { 
  var config = {
  method: 'get',
  url: 'http://127.0.0.1:8000/employee/get/',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  params: {
    'email': 'Gerald_Cunningham@fluffybunnyconsulting.com',
    'password': 'cunninghamge' 
  }
  };
  axios(config)
  .then(function (response) {
    console.log(response.data)
    sessionStorage.setItem("employeeProfile", JSON.stringify(response.data["success"][0]["employeeProfile"]));
    employeeInfo = JSON.parse(sessionStorage.getItem("employeeProfile"))["employee"];
    managerView = employeeInfo.isManager;
    employeeName = employeeInfo.firstName + " " + employeeInfo.lastName;
  })
  .catch(function (error) {
    console.log(error);
  });
}

setSessionStorage();

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
            <Col className="mainColumn"><CollapsibleTable view={managerView} value={value} setValue={setValue}/></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
export {managerView};