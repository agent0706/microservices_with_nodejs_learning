const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const postData = {};

app.get('/posts', (req, res) => {
    res.status(200).send(postData);
});

app.get('/:id/comments', (req, res) => {
    const postId = req.params.id;
    res.status(200).send(postData[postId]?.comments || []);
});

const handleNewPostCreation = (newPostData) => {
    postData[newPostData.id] = {
        ...newPostData,
        comments: []
    };
};

const handleNewCommentCreation = (commentData) => {
    const {postId} = commentData;
    if (postData[postId]) {
        postData[postId].comments.push({
            id: commentData.id,
            content: commentData.content,
            status: commentData.status
        });
    }
};

const handleCommentUpdate = (updatedCommentData) => {
    const {postId, id: commentId, status, content} = updatedCommentData;
    const commentsByPost = postData[postId].comments;
    const currentComment = commentsByPost.find((comment) => comment.id === commentId);
    currentComment.status = status;
    currentComment.content = content;
};

const handleEvent = (eventData) => {
    const {type, data} = eventData;
    switch(type) {
        case 'PostCreated':
            handleNewPostCreation(data);
            break;
        case 'CommentCreated':
            handleNewCommentCreation(data);
            break;
        case 'CommentUpdated':
            handleCommentUpdate(data);
    }
}

app.post('/events', (req, res) => {
    const eventData = req.body;
    console.log('Event received: ', eventData.type);
    handleEvent(eventData);
    res.send({status: 'event processed'});
});

app.listen(4003, async () => {
    console.log('query service started on port 4003');
    console.log('starting event sync process');
    try {
        const events = await axios.get('http://localhost:4002/events');
        events.data.forEach((event) => handleEvent(event));
        console.log('finshed event synching');
    }
    catch(err) {
        console.error('Error synching old events', err);
    }
})