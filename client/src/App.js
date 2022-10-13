import Header from "./UIComponents/Navbar.js";
import Calendar from 'react-calendar';
import GoalsList from "./UIComponents/GoalsList.js";
import GoalsCalendarList from "./UIComponents/GoalsCalendarList.js";

import 'react-calendar/dist/Calendar.css';
import './CSSComponents/Calendar.css';
import './CSSComponents/Grid.css';

import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div className="App">
      <Container fluid className="grid">
        <Row><Header/></Row>
        <Row className="mainRow">
          <Col sm={9}><GoalsList/></Col>
          <Col sm={3}>
            <Row>
              <Col className="CalendarCol"><Calendar className = "cal"/></Col>
            </Row>
            <Row>
              <Col className="GoalsCalendarListCol"><GoalsCalendarList/></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
