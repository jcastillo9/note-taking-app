const express = require('express');
const path = require('path');
const PORT = 3001;
const fs = require('fs')

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', (err, data) => {
        err ? console.log(err) : res.json(JSON.parse(data))
    })
})

app.post('/api/notes', (req, res) => {
    var title = req.body.title
    var text = req.body.text
    var newNote = {
        title,
        text,
    }
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        var currentNotes = JSON.parse(data)
        currentNotes.push(newNote)
        fs.writeFile('db/db.json', JSON.stringify(currentNotes), (err) => {
            err ? console.log(err) : console.log(newNote.title + " has been saved");;
        })
        res.sendFile(path.join(__dirname, 'public/notes.html'));
    })
})

app.delete("/api/notes/:id", (req, res) => {

    let noteData = fs.readFileSync('./db/db.json');
    let noteTaker = JSON.parse(noteData);

    const notesSaved = noteTaker.find(n => n.id === parseInt(req.params.id));

    const notesIndex = noteTaker.indexOf(notesSaved);
    noteTaker.splice(notesIndex);


    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(noteTaker), (err, data) => {
     if (err) throw err;

     res.json(noteTaker)    
   }); 
 });

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});