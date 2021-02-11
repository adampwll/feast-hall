import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import { Col, Row } from 'react-bootstrap';

function Banner() {
  return( 
    <Navbar bg="light">
      <Container>
        <h1>Welcome</h1>
      </Container>
      <Container right-justified>
        <Form inline>
          <FormControl placeholder="Search"/>
        </Form>
      </Container>
    </Navbar>
  );
}

export default Banner