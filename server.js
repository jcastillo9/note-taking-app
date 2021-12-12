const express = require('express');
const fs = require('fs')
const path = require('path');
const db = require('./db/db.json')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', (err, data) => {
        err ? console.log(err) : res.json(JSON.parse(data))
    })
})
