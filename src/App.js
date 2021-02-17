import logo from './logo.svg';
import './styles/main.scss';
import Banner from './components/Banner';
import Container from 'react-bootstrap/Container'
import HomePage from './components/HomePage';
import { Col, Row } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Banner/>
      </Container>
      <Container fluid>
        <HomePage/>
      </Container>
    </div>
  );
}

export default App;
