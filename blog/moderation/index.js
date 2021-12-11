const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const eventPayload = req.body;
    const {type, data: commentData} = eventPayload;
    if (type === 'CommentCreated') {
        const status = commentData.content.includes('orange') ? 'rejected' : 'approved';

        await axios.post('http://localhost:4002/events', {
            type: 'CommentModerated',
            data: {
                ...commentData,
                status
            }
        });
    }
    res.status({});
});

app.listen(4004, async () => {
    console.log('moderation service started on 4004');
});