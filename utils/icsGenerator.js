const ical = require('ical-generator');
const moment = require('moment');
const cal = ical({domain: 'github.com', name: 'my first iCal'});

function test() {
  cal.createEvent({
    start: moment(),
    end: moment().add(1, 'hour'),
    summary: 'Example Event',
    description: 'It works ;)',
    location: 'my room',
    url: 'http://github.com/'
  });

  return cal;
}

function createEvents(events) {
  const eventsArr = [];

  events.map(event => {
    let eventObj = {};

    eventObj.start = event.start;
    eventObj.end = event.end;
    eventObj.summary = event.title

    eventsArr.push(eventObj);
  })

  cal.events(eventsArr);

  return cal;
}

module.exports = { test, createEvents };
