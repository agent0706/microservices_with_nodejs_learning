const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const{title} = req.body;
    await axios.post('http://localhost:4002/events', {
        type: 'PostCreated',
        data: {id, title}
    });
    res.status(201).send({id, title});
});

app.post('/events', (req, res) => {
    const eventData = req.body;
    console.log('Event received: ', eventData.type);
    res.send({status: 'event received'});
});


app.listen(4000, () => {
    console.log('Posts service running successfully');
});
