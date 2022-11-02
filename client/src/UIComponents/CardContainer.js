import Card from 'react-bootstrap/Card';
import '../CSSComponents/CardContainer.css';

function CardContainer({value}) {
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
              <Card.Header className="containerHeader">
                <span>{value.toDateString()}</span>
              </Card.Header>
                <Card.Body>
                  <Card.Header>Goal 1</Card.Header>
                  <Card.Body>
                  <Card.Title> Status </Card.Title>
                  <Card.Text>
                    Description <br></br>
                    Started 10/22/22. <br></br>
                    Finished 10/23/22. <br></br>
                    Assigned by John Doe.
                  </Card.Text>
                </Card.Body>
              </Card.Body>
              <Card.Body>
                <Card.Header>Goal 2</Card.Header>
                <Card.Body>
                <Card.Title> Status </Card.Title>
                <Card.Text>
                  Description <br></br>
                  Started 10/22/22. <br></br>
                  Finished 10/23/22. <br></br>
                  Assigned by John Doe.
                </Card.Text>
              </Card.Body>
            </Card.Body>
          </Card>
        ))}
      </>
    );
  }
  
  export default CardContainer;