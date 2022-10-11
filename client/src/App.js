import BasicExample from "./UIComponents/navbar.js";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GoalsList from "./UIComponents/GoalsList.js";

function App() {
  return (
    <div className="App">
      <BasicExample />
      <Container fluid className="grid">
        <Row>
          <Col sm={8}>
          <GoalsList/>
          </Col>
          <Col sm={4}>
          <Calendar className = "cal"/>
          <Calendar className = "cal"/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
