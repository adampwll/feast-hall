
import request from 'superagent'
import moment from "moment";
const CALENDAR_ID = 'jl9gdt7p32alvfmfn2p85c8er0@group.calendar.google.com'
const API_KEY = 'AIzaSyB0nRsToLMw-rH1hf40UK01Yz4l3GonTfg'
const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`

export function getEvents(callback) {
  request
    .get(url)
    .end((err, resp) => {
      if (!err) {
        const events = []
        JSON.parse(resp.text).items.map((event) => {
          return events.push({
            start: event.start.date ? moment(event.start.date).toDate() : moment(event.start.dateTime).toDate(),
            end: event.end.date ? moment(event.end.date).toDate() : moment(event.end.dateTime).toDate(),
            title: event.summary,
            popup: true,
            description: event.description,
          })
        })
        callback(events)
      }
    })
}