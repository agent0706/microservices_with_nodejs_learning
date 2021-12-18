const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('hi there');
});

app.listen(4001, () => {
    console.log('application started in port 4001');
});