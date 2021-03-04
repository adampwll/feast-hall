import { render } from "@testing-library/react"
import {useEffect, useState} from 'react';
import { Table } from "react-bootstrap";
import moment from "moment";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { getEvents } from '../Calendar'
import ApiCalendar from 'react-google-calendar-api/src/ApiCalendar';

require('react-big-calendar/lib/css/react-big-calendar.css')
const localizer = momentLocalizer(moment);

function Games() {
  const [games, setGames] = useState([]);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getEvents((events) => {
      setGames(events)
    })
  }, []);

  return (
    <div>
      <h3>Games</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Upcoming</td>
          </tr>
        </thead>
        <tbody>
          {lists}
        </tbody>
      </Table>
      <Calendar
        localizer={localizer}
        events={games}
        startAccessor="start"
        endAccessor="end"
        tooltipAccessor={"start"}
        style={{ height: 500 }}
        onSelectEvent={() => {console.log("hello world!")}}
      />
    </div>
  );
}

export default Games;