const express = require("express");
const EventEmitter = require("events");
const myEvent = new EventEmitter();

myEvent.on('test-event', ()=>{
    console.log('this event is listening');
})

const app = express();

const port = 3000;

app.get("/", (req, res)=>{
    myEvent.emit('test-event');
    res.json({'Response': 'Get Method'})
})

// Merge routes 
app.route('/book').get((req, res)=>{
    res.json({'Response': 'Get All Books'})
}).post((req, res)=>{
    res.json({'Response': 'Book is stored'})
})

app.get("/book", (req, res)=>{
    res.send({'Response': 'All Books'})
})


app.get("/book/:id", (req, res)=>{
    const id = req.params.id;  
    res.json({'Response': `Get Book with id ${id}`})
})

app.post("/", (req, res)=>{
    res.json({'Response': 'POST Method'})
})

app.all("*", (req, res)=>{
    res.send("<h1>Page not found</h1>");
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})
