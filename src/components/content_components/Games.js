import {useEffect, useState} from 'react';
import { Table } from "react-bootstrap";
import moment from "moment";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { getEvents } from '../Calendar'
import CreateEventModal from '../modal_components/CreateEventModal'
import ViewEventModal from '../modal_components/ViewEventModal'
import { calendarID } from '../../apiGoogleconfig.json';
import ApiCalendar from 'react-google-calendar-api/src/ApiCalendar';
require('react-big-calendar/lib/css/react-big-calendar.css')

function Games() {
  const [games, setGames] = useState([]);
  const [event, setEvent] = useState({summary: "", description: "", start: "", end: ""});
  const [modalShow, setModalShow] = useState(false);
  const [viewModalShow, setViewModalShow] = useState(false);
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    getEvents((events) => {
      setGames(events)
    })
    ApiCalendar.setCalendar(calendarID)
  }, []);

  const handleDateClick = e => {
    let newEvent = {}
    newEvent.startDate = moment(e.start.toString()).format("yyyy-MM-DD")
    newEvent.endDate = moment(e.end.toString()).format("yyyy-MM-DD")
    newEvent.startTime = "12:00:00"
    newEvent.endTime = "12:00:00"
    setEvent(newEvent)
    setModalShow(true);
  }

  const handleEventClick = e => {
    setEvent(e)
    setViewModalShow(true);
  }

  const showUpcoming = () => {
    var today = new Date();
    let gamesList = [];
    
    let tempList = games;
    tempList = tempList.sort((a, b) => { return a.start - b.start })
    tempList = tempList.filter(game => { return game.start > today })

    for (let i = 0; i < 5; i++) {
      if (tempList[i]) {
        gamesList.push(
        <tr key={`upcoming_${i}`}>
            <td>{tempList[i].summary}</td>
            <td>{moment(tempList[i].start).format("ddd, MMM DD yyyy (h:mm a)")}</td>
            <td></td>
        </tr>);
      }
    }
    return gamesList;
  }

  return (
    <div>
      <h3>Games</h3>
      <h4 style={{ textAlign: "center" }}>Upcoming Games</h4>
      <Table striped bordered hover size="sm">
        <thead>
          <th>Summary</th>
          <th>Time</th>
          <th>Players</th>
        </thead>
        <tbody>
          { showUpcoming() }
        </tbody>
      </Table>
      <Calendar
        views={{
          month: true,
        }}
        localizer={localizer}
        events={games}
        startAccessor="start"
        endAccessor="end"
        selectable={"true"}
        tooltipAccessor={"start"}
        style={{ height: 500 }}
        onSelectEvent={ e => { handleEventClick(e) }}
        onSelectSlot={ e => { handleDateClick(e) }}
      />
      <CreateEventModal
        show={modalShow}
        onHide={() => {
          setModalShow(false)
          getEvents((events) => {
            setGames(events)
          })}}
        event={event}
      />
      <ViewEventModal
        show={viewModalShow}
        onHide={() => {
          setViewModalShow(false)
          getEvents((events) => {
            setGames(events)
          })
        }}
        event={event}
      />
    </div>
  );
}

export default Games;