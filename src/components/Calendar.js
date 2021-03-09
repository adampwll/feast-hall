import { calendarID, apiKey } from "../config/apiGoogleconfig.json";
import request from 'superagent'
import moment from "moment";
const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events?key=${apiKey}`

export function getEvents(callback) {
  request
    .get(url)
    .end((err, resp) => {
      if (!err) {
        const events = []
        JSON.parse(resp.text).items.map((event) => {
          console.log(event)
          return events.push({
            start: event.start.date ? moment(event.start.date).toDate() : moment(event.start.dateTime).toDate(),
            end: event.end.date ? moment(event.end.date).toDate() : moment(event.end.dateTime).toDate(),
            title: event.summary,
            summary: event.summary,
            description: event.description,
            recurrence: event.recurrence,
            id: event.id,
          })
        })
        callback(events)
      }
    })
}