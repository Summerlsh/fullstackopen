const mongoose = require('mongoose');

const url = process.env.MONGODB_URI

console.log('connecting to mongodb...')

mongoose
  .connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(res => {
    console.log('connected to mongodb')
  })
  .catch(err => {
    console.log('error connecting to mongodb', err.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
