import React, {useEffect, useState} from 'react';
import { Col, Container, Row, Nav } from 'react-bootstrap';
import Profile from './content_components/Profile'
import Games from './content_components/Games'
import Players from './content_components/Players'
import GetTest from '../endpoints/GetTest'

function HomePage() {
  const [content, setContent] = useState();
  let component;

  switch (content) {
      case "Profile":
        component = <Profile />;
        break
      case "Players":
        component = <Players />;
        break
      default:
        component = <Games />;
        break
    }

  useEffect(() => {
	  GetTest();
  }, []);
  
  return(
    <div>
      <Nav fill variant="tabs" defaultActiveKey="/games">
        <Nav.Item>
          <Nav.Link eventKey="/games" onClick={() => { setContent("Games") }}>Upcoming Games</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="profile" onClick={() => { setContent("Profile") }}>Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="players" onClick={() => { setContent("Players") }}>Players</Nav.Link>
        </Nav.Item>
      </Nav>
      <Container className="home-page-component-container">
        {component}
      </Container>
    </div>
  );
}

export default HomePage;