import React, {useState} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Profile from './Profile'

function HomePage() {
  const [content, setContent] = useState(Profile);

  function switchContent(event) {
    setContent(event.target.value);
  }

  return(
    <div>
      <Container>
        <Row>
          <Col><h2>Upcoming Games</h2></Col>
          <Col><h2>Profile</h2></Col>
          <Col><h2>Players</h2></Col>
        </Row>
      </Container>
      <Container>
        {content}
      </Container>
    </div>
  );
}

export default HomePage;