import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Login from './Login';
import Logout from './Logout';
import { Col, Row } from 'react-bootstrap';
import Clock from './Clock';

function Banner() {
  return( 
    <Navbar bg="light">
      <Container>
        <h1>Welcome</h1>
      </Container>
      <Container center-justified="true">
        <Clock/>
      </Container>
      <Container right-justified="true">
        <Form inline>
          <FormControl placeholder="Search"/>
        </Form>
        <Login/>
        <Logout/>
      </Container>
    </Navbar>
  );
}

export default Banner