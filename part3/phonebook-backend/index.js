const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
// use the morgan middleware to log HTTP requests and responses
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))

let people = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => { 
    res.send(`<p>Phonebook has info for ${people.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/people', (req, res) => {
    res.json(people)
})

app.get('/api/people/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = people.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/people/:id', (req, res) => {
    const id = Number(req.params.id)
    people = people.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/people', (req, res) => { 
    const body = req.body
    if (!body.name || !body.number) {
        return res.status(400).json({ 
            error: 'content missing' 
        })
    }
    if (people.find(person => person.name === body.name)) {
        return res.status(400).json({ 
            error: 'name must be unique' 
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 1000000),
    }
    people = people.concat(person)
    res.json(person)
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})