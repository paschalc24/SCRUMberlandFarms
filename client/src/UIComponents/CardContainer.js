import Card from 'react-bootstrap/Card';
import GoalsCalendarList from "../UIComponents/GoalsCalendarList.js";
import '../CSSComponents/CardContainer.css';

function CardContainer({value}) {
    return (
      <>
      <Card
        id="cardContainer"
        bg={'Light'.toLowerCase()}
        key={'Light'}
        text={'Light'.toLowerCase() === 'light' ? 'dark' : 'white'}
        style={{ width: '100%', height: '100%' }}
        className="mb-2"
        >
        <Card.Header className="containerHeader">
          <span>{value.toDateString()}</span>
        </Card.Header>
        <Card.Body>
          <GoalsCalendarList value={value}/>
        </Card.Body>
      </Card>
      </>
    );
  }
  
  export default CardContainer;