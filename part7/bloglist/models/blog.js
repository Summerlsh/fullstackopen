const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: {
    type: Array
  }
})

blogSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

blogSchema.pre('remove', function (next) {
  this.model('User').updateOne(
    { blogs: this._id },
    { $pull: { blogs: this._id } },
    next
  )
})

module.exports = mongoose.model('Blog', blogSchema)
