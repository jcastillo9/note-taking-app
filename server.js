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

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    
    const newNote = {
        title,
        text,
    }
    fs.readFile('db/db.json', (err, data) => {
        const createNote = JSON.parse(data)
        createNote.push(newNote)
        fs.writeFile('db/db.json', JSON.stringify(createNote), (err) => {
            err ? console.log(err) : console.log(" Note has been saved");;
        })
        res.sendFile(path.join(__dirname, 'public/notes.html'));
    })
})