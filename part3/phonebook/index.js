const express = require('express')
const app = express()

let phonebookData = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  },
  { 
    "id": "5",
    "name": "Barry Poppendieck", 
    "number": "39-23-6423122"
  },
];

app.get('/info', (request, response) => {
  response.send(`Phonebook has info for ${phonebookData.length} people <br/> ${new Date(Date.now())}`
  )
})

app.get('/api/persons', (request, response) => {
  response.json(phonebookData)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = phonebookData.find(person => person.id === id)

  if (person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  phonebookData = phonebookData.filter(person => person.id !== id)

  response.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})