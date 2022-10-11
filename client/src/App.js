import BasicExample from "./UIComponents/navbar.js";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div className="App">
      <BasicExample />
      <Container fluid className="grid">
        <Row>
          <Col sm={8}>
          <Calendar className = "cal2"/>
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
