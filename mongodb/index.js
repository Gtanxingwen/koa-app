const mongoose = require('mongoose')
const { connectionStr } = require('../config')

// 连接数据库
const database = () => {
  mongoose.connect(
    connectionStr,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log('Connected to MongoDB ', connectionStr)
  )
  mongoose.connection.on('error', console.error)
}


module.exports = database
