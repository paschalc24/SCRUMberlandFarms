import React, { useState } from "react";
import '../CSSComponents/createGoal.css';
import "react-datepicker/dist/react-datepicker.css";
import Header from "./Header.js";
import 'react-calendar/dist/Calendar.css';
import '../CSSComponents/Grid.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ManagerGoalsList from "./ManagerGoalsList.js";
import CollapsibleTable from "./GoalsList.js";


export default function MainPage(props) {
  const [value, setValue] = useState();

  if (props.managerView) {
    return (
      <div className="App">
        <Container fluid> 
          <Row><Header view={props.managerView} vTitle={props.employeeName}/></Row>
          <Row className="mainRow">
              <ManagerGoalsList view={props.managerView}/>
          </Row>
        </Container>
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <Container fluid> 
          <Row><Header view={props.managerView} vTitle={props.employeeName}/></Row>
          <Row className="mainRow">
            <Col><CollapsibleTable view={props.managerView} value={value} setValue={setValue}/></Col>
          </Row>
        </Container>
      </div>
    );
  }
}
