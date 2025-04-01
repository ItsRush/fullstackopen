require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



morgan.token('body', function(req) { 
    if(req.method === 'POST')
        return JSON.stringify(req.body)
    })

const errorHandler = (error,request,reponse,next) => {
    console.log(error.message)

    if(error.name === 'CastError') {
        return reponse.status(400).send({ error: 'malformatted id'})
    }
    
    next(error)
}

const unknownEndpoint = (request,response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.get('/', (request, response) => {
    Person.find({}).then(persons => {
        response.send(`<p>Phonebook has info for  ${persons.length} people </p>
                   <p>${Date()}</p> `)
     })
  })

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request,response,next) => {
    Person.find(request.params.id).then(person => {
        if(person){
            response.json(person)
        }else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
    })
 

app.delete('/api/persons/:id', (request,response,next) => {
    Person.findByIdAndDelete(request.params.id) 
        .then(result => {
            response.status(204).end()
            
        })
        .catch(error => next(error))
})

const generateID = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(p => Number(p.id))) : 0
    return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {

    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({error: 'content missing'})
    }

    const duplicate = persons.find(person => person.name === body.name)
    if(duplicate){
        return response.status(400).json({
             error: 'name must be unique' 
        })
    }

    const person = new Person({
        id: generateID(),
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
    
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})

//mongo 

