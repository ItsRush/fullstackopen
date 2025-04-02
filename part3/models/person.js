const mongoose = require('mongoose')



mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB', error.message)
    })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'is shorter than the minimum allowed length (3)'],
    required: true
  },
  number: {
    type: String,
    minLength: [8, 'is shorter than the minimum allowed length (8)'],
    
    validate:{
        validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v)
    },
    message: props => `${props.value} is not a valid number`
},
        required: true
  }
})



const Person = mongoose.model('Person', personSchema)


personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        // the _id is not a string its an object
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
} )

module.exports = mongoose.model('Person', personSchema)