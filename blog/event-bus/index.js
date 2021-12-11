const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const events = [];

app.get('/events', (req, res) => {
    res.send(events);
});

app.post('/events', (req, res) => {
    const eventPayload = req.body;

    events.push(eventPayload);

    axios.post('http://localhost:4000/events', eventPayload).catch((err) => console.log('error connection to posts service'));
    axios.post('http://localhost:4001/events', eventPayload).catch((err) => console.log('error connection to comments service'));
    axios.post('http://localhost:4003/events', eventPayload).catch((err) => console.log('error connection to query service'));
    axios.post('http://localhost:4004/events', eventPayload).catch((err) => console.log('error connection to moderation service'));

    res.send({status: 'ok'});
});

app.listen(4002, () => {
    console.log('event bus started on port 4002');
});