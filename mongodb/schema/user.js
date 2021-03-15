const mongoose = require('mongoose')

const { Schema, model } = mongoose
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema({
  username: String,
  password: String,
  mobile: String,
  info: {
    type: ObjectId,
    ref: 'Info'
  },
  meta: {
    createdAt: {
      type: Date,
      default: new Date()
    },
    updatedAt: {
      type: Date,
      default: new Date()
    }
  }
})

UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

module.exports = model('User', UserSchema)
