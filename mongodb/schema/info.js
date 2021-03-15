const mongoose = require('mongoose')

const { Schema, model } = mongoose

const InfoSchema = new Schema({
  hobby: [String],
  gender: Number,
  age: Number,
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

InfoSchema.pre('save', function (next) {
  if (this.isNew) {
    this.hobby = []
    this.gender = 1
    this.age = 0
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

// mongoose.model(arg1, arg2, arg3), 第3个参数表示操作的collection,如果不传 操作arg1 + s集合
module.exports = model('Info', InfoSchema)
