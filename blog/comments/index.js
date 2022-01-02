const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/posts/:id/comments', async (req, res) => {
    const postId = req.params.id;
    const commentId = randomBytes(4).toString('hex');

    const {content: commentContent} = req.body;

    const commentData = {
        id: commentId,
        content: commentContent,
        status: 'pending',
        postId
    };
    
    await axios.post('http://event-bus-clusterip-service:4002/events', {
        type: 'CommentCreated',
        data: commentData
    });

    res.status(201).send(commentData);
});

app.post('/events', async (req, res) => {
    const eventData = req.body;
    const {type, data} = eventData;
    console.log('Event received: ', type);

    if (type === 'CommentModerated') {
        const updatedComment = data;
        await axios.post('http://event-bus-clusterip-service:4002/events', {
            type: 'CommentUpdated',
            data: updatedComment
        });
    }
    
    res.send({status: 'event received'});
});

app.listen(4001, () => {
    console.log('Comments service started in port 5000');
});
