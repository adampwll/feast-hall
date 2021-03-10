import { Modal, Button, InputGroup, FormControl, Form, Col, Row } from 'react-bootstrap';
import { calendarID } from '../apiGoogleconfig.json';
import ApiCalendar from 'react-google-calendar-api/src/ApiCalendar';
import moment from "moment";
import { useState, useEffect, useMemo } from 'react';

function CreateEventModal(props) {
  const [event, setEvent] = useState(props.event);
  const [editing, setEditing] = useState(false);
  const funSummaries = ["War Of The Dieing Forest", "Battle Of Bent Truths", "Siege Of The River Bank", "Battle Of Broken Wills", "Battle Of Frozen Fires", "Siege Of Delirium", "War Of Qywth", "Siege Of Vleth", "War Of Blybahr", "Battle Of Blusig", "Battle Of The Light", "Attack Of Attrition", "Battle Of Wits", "Siege Of The Righteous", "Battle Of Lust", "Attack Of Mercy", "Siege Of Brer", "War Of Strugh", "Attack Of Pludyh", "Assault Of Knidad", "War Of New Hope", "Assault Of The Infested", "Attack Of Poisoned Crops", "War Of The Ancestors", "Assault Of The Nomads", "Battle Of The Eclipse", "Battle Of Fest", "Battle Of Qlam", "Attack Of Glilah", "War Of Bawahr", "Battle Of The High Seas", "Battle Of Horrors", "War Of Executioners", "Assault Of The Dry Sea", "Siege Of Secrets", "Battle Of The Light", "Battle Of Stohsh", "War Of Kan", "War Of Trohihs", "Battle Of Jujog", "Battle Of Truth", "War Of Burning Plains", "Battle Of Allies", "War Of Spears", "Siege Of Camouflage", "Attack Of The People", "Attack Of Zimt", "Assault Of Clyll", "Battle Of Zawog", "Battle Of Glizag", "Attack Of Resources", "Siege Of The Occult", "War Of Purification", "Battle Of Eternal Bombardments", "War Of The Oppressor", "Siege Of Eternal Suffering", "Battle Of Knosp", "Battle Of Voh", "Siege Of Kruroht", "Siege Of Fohyht", "Siege Of Vile Actions", "Attack Of Broken Mountains", "War Of Silence", "Siege Of Heaven", "Siege Of Faiths", "Siege Of Eternal Bombardments", "War Of Glels", "Battle Of Urk", "War Of Wadahr", "War Of Zyihr", "Siege Of Kings Hill", "Battle Of The Eternal Day", "War Of Sons", "Assault Of The Dead Sea", "War Of The Risen", "War Of Titans", "War Of Bur", "Battle Of Prihr", "Battle Of Jasigh", "Siege Of Gleveht", "Battle Of Loyalties", "Siege Of Mad Kings", "Assault Of Beliefs", "Battle Of The False Prophet", "Battle Of The True King", "War Of The Molten Mountain", "Siege Of Ots", "Battle Of Prerc", "War Of Gnenuhr", "Battle Of Gnihigh"]
  const [random, setRandom] = useState(Math.floor(Math.random() * funSummaries.length));

  useMemo(() => { 
    setRandom(Math.floor(Math.random() * funSummaries.length)) 
  }, [funSummaries.length])

  const timeOptions = useMemo(() => {
    let options = [];
    for (let i = 0; i < 24; i++) {
      let hour = i % 12 || 12;
      let morningAfternoon = i < 12 ? 'am' : 'pm';
      for (let j = 0; j < 4; j++) {
        let minute = j * 15 || '00';
        options.push(
          <option key={`${hour}:${minute} ${morningAfternoon}`} value={`${i}:${minute}:00`}>
            {`${hour}:${minute} ${morningAfternoon}`}
          </option>);
      }
    }
    return options;
  }, [])

  useEffect(() => {
    setEvent(props.event)
    setEditing(false)
  }, [props.event]);
  
  const update = (field, e) => {
    return setEvent({ ...event, [field]: e.target.value } );
  }

  const submitEvent = () => {
    let newEvent = { 
      summary: event.summary, 
      description: event.description, 
      start: { dateTime: moment(`${event.startDate} ${event.startTime}`).toDate("ddd MMM DD yyyy HH:mm:ss ZZ") },
      end: { dateTime: moment(`${event.endDate} ${event.endTime}`).toDate("ddd MMM DD yyyy HH:mm:ss ZZ") }
    };
    
    if (props.modaltype === "Create") {
      ApiCalendar.createEvent(newEvent, calendarID).then(result => { props.onHide() });
    } else {
      newEvent.id = event.id;
      ApiCalendar.updateEvent(newEvent, newEvent.id, calendarID).then(result => { props.onHide() });
    }
  }

  const deleteEvent = () => {
    ApiCalendar.deleteEvent(event.id, calendarID).then(result => { props.onHide() })
  }

  const createFooter = () => {
    if (props.modaltype === "Create") {
      return (
        <Modal.Footer>
          <Button onClick={() => { submitEvent() }}>Submit</Button>
          <Button variant="outline-primary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>)
    } else {
      return (
        <Modal.Footer>
          <Button variant="danger" onClick={() => { deleteEvent() }}>Delete</Button>
          {!editing ?
            <Button onClick={() => setEditing(true)} variant="warning">Edit</Button> :
            <Button onClick={() => { submitEvent() }} variant={"warning"}>Update</Button>}
          <Button variant="outline-primary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>)
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {`${props.modaltype} an event`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <fieldset disabled={!editing && props.modaltype === 'Edit'}>
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
                    <Form.Control onChange={e => { update("startTime", e) }} as="select" custom htmlSize={4} value={event.startTime}>
                    { timeOptions }
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
                  <Form.Control onChange={e => { update("endTime", e) }} as="select" custom htmlSize={4} value={event.endTime}>
                    { timeOptions }
                  </Form.Control>
                </Form.Group>
              </InputGroup>
            </Col>
          </Row>
        </fieldset>
      </Modal.Body>
      { createFooter() }
    </Modal>
  );
}

export default CreateEventModal;