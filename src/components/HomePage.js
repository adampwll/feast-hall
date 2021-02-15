import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Clock from './Clock';
import UserProfile from './UserProfile';

import GetTest from './../endpoints/GetTest'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date() 
    }
  }

  render() {
	GetTest();
    return(
      <div>
        <Clock/>
        <Container>
          <Row>
            <Col><h2>Upcoming Games</h2></Col>
            <Col><h2>Profile</h2></Col>
            <Col><h2>Players</h2></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col><UserProfile userName='Adam'/></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HomePage;