import logo from './logo.svg';
import './App.css';
import Banner from './components/Banner';
import Container from 'react-bootstrap/Container'
import HomePage from './components/HomePage';

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
