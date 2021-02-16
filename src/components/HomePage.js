import React, {useEffect, useState} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Profile from './Profile'
import GetTest from './../endpoints/GetTest'

function HomePage() {
  const [content, setContent] = useState(Profile);

  function switchContent(event) {
    setContent(event.target.value);
  }

  useEffect(() => {
	  GetTest();
  });
  
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