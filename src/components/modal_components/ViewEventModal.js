import { Modal, Button, InputGroup, FormControl, Form, Col, Row, } from 'react-bootstrap';
import { calendarID } from '../../config/apiGoogleconfig.json';
import ApiCalendar from 'react-google-calendar-api/src/ApiCalendar';
import moment from "moment";
import { useState, useEffect } from 'react';

function DeleteEventModal(props) {
  const [event, setEvent] = useState(props.event);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    let newEvent = { summary: props.event.summary, description: props.event.description, id: props.event.id };
    newEvent.startDate = moment(props.event.start).format("yyyy-MM-DD");
    newEvent.endDate = moment(props.event.end).format("yyyy-MM-DD");
    newEvent.startTime = moment(props.event.start).format("H:mm:ss");
    newEvent.endTime = moment(props.event.end).format("H:mm:ss");
    setEvent(newEvent);
  }, [props.event]);

  const update = (field, e) => {
    return setEvent({ ...event, [field]: e.target.value });
  }

  const deleteEvent = () => {
    ApiCalendar.deleteEvent(event.id, calendarID).then(result => { props.onHide() })
  }

  const submitEvent = () => {
    let newEvent = { summary: event.summary, description: event.description, id: event.id };
    newEvent.start = { dateTime: moment(`${event.startDate} ${event.startTime}`).toDate("ddd MMM DD yyyy HH:mm:ss ZZ") }
    newEvent.end = { dateTime: moment(`${event.endDate} ${event.endTime}`).toDate("ddd MMM DD yyyy HH:mm:ss ZZ") }
    ApiCalendar.updateEvent(newEvent, newEvent.id, calendarID).then(result => { props.onHide() })
  }

  const createTimeOptions = () => {
    let options = [];
    for (let i = 0; i < 24; i++) {
      if (i === 0) {
        options.push(<option value={`${i}:00:00`}>{`12:00am`}</option>);
        options.push(<option value={`${i}:15:00`}>{`12:15am`}</option>);
        options.push(<option value={`${i}:30:00`}>{`12:30am`}</option>);
        options.push(<option value={`${i}:45:00`}>{`12:45am`}</option>);
      } else if (i < 12) {
        options.push(<option value={`${i}:00:00`}>{`${i}:00am`}</option>);
        options.push(<option value={`${i}:15:00`}>{`${i}:15am`}</option>);
        options.push(<option value={`${i}:30:00`}>{`${i}:30am`}</option>);
        options.push(<option value={`${i}:45:00`}>{`${i}:45am`}</option>);
      } else if (i === 12) {
        options.push(<option value={`${i}:00:00`}>{`12:00pm`}</option>);
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
        <fieldset disabled={!editing}>
        <Row>
          <h4>Summary</h4>
          <InputGroup size="sm" className="mb-3">
            <FormControl
              value={event.summary}
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
              onChange={e => { update("description", e) }} />
          </InputGroup>
        </Row>
        <br />
        <Row>
          <Col>
            <h4>Start Date/Time</h4>
            <InputGroup size="sm" className="mb-3">
              <Form.Group controlId="exampleForm.SelectCustom">
                <input type="date" id="start" name="trip-start"
                  value={event.startDate}
                  onChange={e => { update("startDate", e) }} />
                <Form.Control onChange={e => { update("startTime", e) }} as="select" custom htmlSize={4} value={event.startTime}>
                  {createTimeOptions()}
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
                  onChange={e => { update("endDate", e) }} />
                <Form.Control onChange={e => { update("endTime", e) }} as="select" custom htmlSize={4} value={event.endTime}>
                  {createTimeOptions()}
                </Form.Control>
              </Form.Group>
            </InputGroup>
          </Col>
        </Row>
        </fieldset>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => { deleteEvent() }}>Delete</Button>
        { !editing ?
          <Button onClick={() => setEditing(true) } variant="warning">Edit</Button> :
          <Button onClick={() => { submitEvent() }} variant="warning">Submit</Button> }
        <Button variant="outline-primary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteEventModal;