// In this question i will be learning all types of http methods in express

const express = require('express')

const fs = require('fs').promises
const { json } = require('stream/consumers');

const app = express();

app.use(express.json())

const notes = [
    {id:1, subject:"COA", completed: "true"},
    {id:2, subject:"SE", completed: "false"},
]



//get method

//1. Return all the notes
app.get('/notes', (req, res)=>{
    res.status(200).json(notes)
})

//2. Return by id
app.get('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const newNote = notes.filter(note => note.id === id)
    console.log(newNote)
    res.status(200).json(newNote);
})

//POST method
//3. Receieving User data

app.post('/notes', async (req, res)=>{
    const {subject, completed} = req.body;

    if(!subject || !completed){
        res.status(422).json({err:"Please send all the fields properly."})
    }

    const newNote = {
        id:Date.now(),
        subject:subject,
        completed:completed
    }

    const data = await fs.readFile('product.json', 'utf8');
    const notes = data ? JSON.parse(data) : [];

     notes.push(newNote);
    try {
        await fs.writeFile('product.json',JSON.stringify(notes))
        res.status(200).json({message:'Data written successfully into the file'})
    } catch (error) {
        res.status(422).json({error:`Error occurred while writing file ${error.message}`})
    }

    notes.push(newNote)
    // res.status(200).json({message:"data receieved successfully"})
})


//PUT method
//4. replacing the data content
app.put('/notes/:id', async (req, res) => {
    const id = Number(req.params.id)

    const {subject,completed} = req.body

    if(!subject || !completed){
        res.status(422).json({err:"Fill all the fields"})
    }

    const newNote = {
        id:Date.now(),
        subject:subject,
        completed:completed,
        replaced:"true"
    }

    try {
        const fileData =await fs.readFile('product.json','utf-8')
        const existedData = JSON.parse(fileData)


        console.log(existedData)
    } catch (error) {
        
    }
    const noteIndex = notes.findIndex((notes) => notes.id === id)

    if(noteIndex === -1){
        res.status(422).json({err:"Id of the element is not found in the list"})
    }

    // for (let i = 0; i < notes.length; i++) {
    //     if(notes[i].id === id){
    //         notes[i] = newNote
    //         break
    //     }
    // }
    notes[noteIndex] = newNote
    res.status(200).json({message:"Data updated successfully"})
})

//Patch method
app.patch('/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const {subject, completed} = req.body

    const index = notes.findIndex((notes) => notes.id === id)

    if(index === -1) res.status(422).json({err:"Index to replace not found"})

    if(subject) notes[index].subject = subject
    if(completed) notes[index].completed = completed

    res.status(200).json({message:`element ${id} updated successfully`})
    // notes[index].push({updated:"true"})
})


//Delete method

app.delete('/notes/:id', (req, res) => {
    const id = Number(req.params.id)

    const index = notes.findIndex((notes) => notes.id === id)

    if(index === -1) res.status(404).json({err:`not be able to delete the item at index ${id}`})

    notes.splice(index,1)
    res.status(200).json({message:"Data deleted successfully"})
})


const port = 5000;
app.listen(port,() => {
    console.log(`http://localhost:${port}`)
})