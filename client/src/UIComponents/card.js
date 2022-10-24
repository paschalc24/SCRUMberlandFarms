import Card from 'react-bootstrap/Card';
import '../CSSComponents/card.css';

function GoalDescription() {
  return (
    <>
      {[
        'Light'
      ].map((variant) => (
        <Card
          bg={'Light'.toLowerCase()}
          key={'Light'}
          text={'Light'.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '100%', height: '100%' }}
          className="mb-2"
        >
          <Card.Header>Goal Title</Card.Header>
          <Card.Body>
            <Card.Title> Status </Card.Title>
            <Card.Text>
              Description <br></br>
              Started 10/22/22. <br></br>
              Finished 10/23/22. <br></br>
              Assigned by John Doe.
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default GoalDescription;