import { Modal, Button, InputGroup, FormControl, Form, Col, Row, Container } from 'react-bootstrap';
import { calendarID } from '../../config/apiGoogleconfig.json';
import ApiCalendar from 'react-google-calendar-api/src/ApiCalendar';
import moment from "moment";
import { useState, useEffect } from 'react';

function CreateEventModal(props) {
  const [event, setEvent] = useState(props.event);
  const funSummaries = ["War Of The Dieing Forest", "Battle Of Bent Truths", "Siege Of The River Bank", "Battle Of Broken Wills", "Battle Of Frozen Fires", "Siege Of Delirium", "War Of Qywth", "Siege Of Vleth", "War Of Blybahr", "Battle Of Blusig", "Battle Of The Light", "Attack Of Attrition", "Battle Of Wits", "Siege Of The Righteous", "Battle Of Lust", "Attack Of Mercy", "Siege Of Brer", "War Of Strugh", "Attack Of Pludyh", "Assault Of Knidad", "War Of New Hope", "Assault Of The Infested", "Attack Of Poisoned Crops", "War Of The Ancestors", "Assault Of The Nomads", "Battle Of The Eclipse", "Battle Of Fest", "Battle Of Qlam", "Attack Of Glilah", "War Of Bawahr", "Battle Of The High Seas", "Battle Of Horrors", "War Of Executioners", "Assault Of The Dry Sea", "Siege Of Secrets", "Battle Of The Light", "Battle Of Stohsh", "War Of Kan", "War Of Trohihs", "Battle Of Jujog", "Battle Of Truth", "War Of Burning Plains", "Battle Of Allies", "War Of Spears", "Siege Of Camouflage", "Attack Of The People", "Attack Of Zimt", "Assault Of Clyll", "Battle Of Zawog", "Battle Of Glizag", "Attack Of Resources", "Siege Of The Occult", "War Of Purification", "Battle Of Eternal Bombardments", "War Of The Oppressor", "Siege Of Eternal Suffering", "Battle Of Knosp", "Battle Of Voh", "Siege Of Kruroht", "Siege Of Fohyht", "Siege Of Vile Actions", "Attack Of Broken Mountains", "War Of Silence", "Siege Of Heaven", "Siege Of Faiths", "Siege Of Eternal Bombardments", "War Of Glels", "Battle Of Urk", "War Of Wadahr", "War Of Zyihr", "Siege Of Kings Hill", "Battle Of The Eternal Day", "War Of Sons", "Assault Of The Dead Sea", "War Of The Risen", "War Of Titans", "War Of Bur", "Battle Of Prihr", "Battle Of Jasigh", "Siege Of Gleveht", "Battle Of Loyalties", "Siege Of Mad Kings", "Assault Of Beliefs", "Battle Of The False Prophet", "Battle Of The True King", "War Of The Molten Mountain", "Siege Of Ots", "Battle Of Prerc", "War Of Gnenuhr", "Battle Of Gnihigh"]
  const [random, setRandom] = useState(Math.floor(Math.random() * funSummaries.length));

  useEffect(() => {
    setEvent(props.event)
    setRandom(Math.floor(Math.random() * funSummaries.length))
  }, [props.event]);
  
  const update = (field, e) => {
    return setEvent({ ...event, [field]: e.target.value } );
  }

  const submitEvent = () => {
    let newEvent = { summary: event.summary, description: event.description, start: event.startDate};
    newEvent.start = { dateTime: moment(`${event.startDate} ${event.startTime}`).toDate("ddd MMM DD yyyy HH:mm:ss ZZ") }
    newEvent.end = { dateTime: moment(`${event.endDate} ${event.endTime}`).toDate("ddd MMM DD yyyy HH:mm:ss ZZ") }
    ApiCalendar.createEvent(newEvent, calendarID).then(result => { props.onHide() })
  }

  const createTimeOptions = () => {
    let options = [];
    for (let i = 0; i < 24; i++) {
      if (i === 0) {
        options.push(<option value={`${i}:00:00`}>{`12:00am`}</option>);
        options.push(<option value={`${i}:15:00`}>{`12:15am`}</option>);
        options.push(<option value={`${i}:30:00`}>{`12:30am`}</option>);
        options.push(<option value={`${i}:45:00`}>{`12:45am`}</option>);
      } else if (i < 12 ) {
        options.push(<option value={`${i}:00:00`}>{`${i}:00am`}</option>);
        options.push(<option value={`${i}:15:00`}>{`${i}:15am`}</option>);
        options.push(<option value={`${i}:30:00`}>{`${i}:30am`}</option>);
        options.push(<option value={`${i}:45:00`}>{`${i}:45am`}</option>);
      } else if (i === 12) {
        options.push(<option value={`${i}:00:00`} selected>{`12:00pm`}</option>);
        options.push(<option value={`${i}:15:00`}>{`12:15pm`}</option>);
        options.push(<option value={`${i}:30:00`}>{`12:30pm`}</option>);
        options.push(<option value={`${i}:45:00`}>{`12:45pm`}</option>);
      } else {
        options.push(<option value={`${i}:00:00`}>{`${i - 12}:00pm`}</option>);
        options.push(<option value={`${i}:15:00`}>{`${i - 12}:15pm`}</option>);
        options.push(<option value={`${i}:30:00`}>{`${i - 12}:30pm`}</option>);
        options.push(<option value={`${i}:45:00`}>{`${i - 12}:45pm`}</option>);
      }
    }
    return options;
  } 

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create an Event
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <h4>Summary</h4>
          <InputGroup size="sm" className="mb-3">
            <FormControl
              value={event.summary}
              placeholder={funSummaries[random]}
              onChange={e => { update("summary", e) }}
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>
          </Row>
          <Row>
          <h4>Description</h4>
          <InputGroup>
            <FormControl 
              as="textarea" 
              aria-label="With textarea" 
              value={event.description}
              onChange={e => { update("description", e) }}/>
          </InputGroup>
        </Row>
        <br/>
        <Row>
          <Col>
        <h4>Start Date/Time</h4>
        <InputGroup size="sm" className="mb-3">
          <Form.Group controlId="exampleForm.SelectCustom">
            <input type="date" id="start" name="trip-start"
              value={event.startDate} 
              onChange={ e => {update("startDate", e)} }/>
            <Form.Control onChange={e => { update("startTime", e) }} as="select" custom htmlSize={4} default={2}>
              { createTimeOptions() }
            </Form.Control>
          </Form.Group>
        </InputGroup>
          </Col>
          <Col>
        <h4>End Date/Time</h4>
        <InputGroup size="sm" className="mb-3">
          <Form.Group controlId="exampleForm.SelectCustom">
            <input type="date" id="end" name="trip-start"
              value={moment(event.endDate).format("yyyy-MM-DD")} 
              onChange={e => { update("endDate", e) }}/>
            <Form.Control onChange={e => { update("endTime", e) }} as="select" custom htmlSize={4}>
              {createTimeOptions()}
            </Form.Control>
          </Form.Group>
        </InputGroup>
        </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => { submitEvent() }}>Submit</Button>
        <Button variant="outline-primary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateEventModal;