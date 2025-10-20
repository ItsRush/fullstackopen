require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

if(!url){
    console.log('MONGODB_URI is not defined')
    process.exit(1)
}


const name = process.argv[3]
const number = process.argv[4]

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: function(name) {
                return name.length > 2
            },
            message: props => `${props.value} is shorter than the allowed minimum length (3)`
        }
    },
    number: String
})

personSchema.set('toJSON', {
    transform:(document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3){
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}

else if(process.argv.length === 5){
    const person = new Person({
        name: name,
        number: number
    })
    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}

module.exports = mongoose.model('Person', personSchema)