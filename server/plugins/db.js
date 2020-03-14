module.exports = app => {
  const mongoose = require('mongoose')

  mongoose.connect('mongodb://127.0.0.1:27017/king-of-glory-full-stack', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  require('require-all')(__dirname + '/../models')
}
