import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import ApiCalendar from 'react-google-calendar-api/src/ApiCalendar';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Clock from './Clock';

function Banner() {
    const [user, setUser] = useState({});

    useEffect(() => {
      console.log("im heeeere")
      ApiCalendar.onLoad(() => {
        setUser(ApiCalendar.getBasicUserProfile() || {})
      })
    }, []);

  const greetings = () => {
    const options = ["Hello, sunshine!", "Howdy, partner!", "Hey, hi, hello!", "What’s kickin’, little chicken?", "Peek-a-boo!", "Howdy-doody!", "Hey there, freshman!", "My name's Ralph, and I'm a bad guy.", "Welcome!", "I come in peace!", "Put that cookie down!", "Ahoy, matey!", "Hiya!", "'Ello, gov'nor!", "Top of the mornin’ to ya!", "What’s crackin’?", "GOOOOOD MORNING, VIETNAM!", "Howdy, howdy, howdy!", "Hello, my name is Inigo Montoya.", "I'm Batman.", "So, at last, we meet for the first time, for the last time!", "Here's Johnny!", "Ghostbusters, whatya want?", "Yo!", "Whaddup.", "Greetings and salutations!", "Doctor.", "‘Ello, mate.", "Oh, yoooouhoooo!", "How you doin'?", "I like your face.", "What's cookin', good lookin'?", "Why, hello there!", "Hey, boo.", "Listen!", "Generic Greeting!"]
    return options[Math.floor(Math.random() * options.length)]
  }

  let handleLogIn = () => {
    ApiCalendar.handleAuthClick()
    ApiCalendar.listenSign(() => {
      setUser(ApiCalendar.getBasicUserProfile() || {})
    })
  }

  let handleLogOut = () => {
    setUser({})
    ApiCalendar.handleSignoutClick();
  }

  return( 
    <Navbar bg="light">
      <Container>
        <h1>{greetings()}</h1>
      </Container>
      <Container center-justified="true">
        <Clock/>
      </Container>
      <Container right-justified="true">
        <Form inline>
          <FormControl placeholder="Search"/>
        </Form>
        {
          user.jI ?
          <button onClick={() => { handleLogOut() }} style={{ backgroundImage: `url(${user.jI})`, height: "50px", width: "50px", backgroundPosition: "center", backgroundSize: "cover", borderRadius: "50px", border: "0px" }}></button> :
          <button onClick={() => { handleLogIn() }} style={{ backgroundImage: `url()`, height: "50px", width: "50px", backgroundPosition: "center", backgroundSize: "cover", borderRadius: "50px", border: "0px" }}></button>
        }
      </Container>
    </Navbar>
  );
}

export default Banner