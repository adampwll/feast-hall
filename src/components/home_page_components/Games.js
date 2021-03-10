import {useEffect, useState} from 'react';
import { Table } from "react-bootstrap";
import moment from "moment";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { getEvents } from '../Calendar'
import CreateEventModal from '../EventModal'
import { calendarID } from '../../apiGoogleconfig.json';
import ApiCalendar from 'react-google-calendar-api/src/ApiCalendar';
require('react-big-calendar/lib/css/react-big-calendar.css')

function Games() {
  const [games, setGames] = useState([]);
  const [event, setEvent] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    getEvents((events) => {
      setGames(events)
    })
    ApiCalendar.setCalendar(calendarID)
  }, []);

  const handleDateClick = e => {
    setEvent({
      summary: "",
      description: "",
      startDate: moment(e.start.toString()).format("yyyy-MM-DD"),
      endDate: moment(e.end.toString()).format("yyyy-MM-DD"),
      startTime: "12:00:00",
      endTime: "12:00:00"
    })
    setModalType("Create");
    setModalShow(true);
  }

  const handleEventClick = e => {
    setEvent({
      summary: e.summary || "",
      description: e.description || "",
      startDate: moment(e.start).format("yyyy-MM-DD"),
      endDate: moment(e.end).format("yyyy-MM-DD"),
      startTime: moment(e.start).format("H:mm:ss"),
      endTime: moment(e.end).format("H:mm:ss"),
      id: e.id
    });
    setModalType("Edit");
    setModalShow(true);
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
      <h3 style={{ textAlign: "center" }} >Games</h3>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Summary</th>
            <th>Time</th>
            <th>Players</th>
          </tr>
        </thead>
        <tbody>
          { showUpcoming() }
        </tbody>
      </Table>
      <Calendar
        views={{
          month: true,
        }}
        localizer={momentLocalizer(moment)}
        events={games}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
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
        modaltype={modalType}
        event={event}
      />
    </div>
  );
}

export default Games;