const express = require('express')
const cors = require('cors')

const app = express()

app.set('secret', 'i2u34y12oi3u4y8')

app.use(express.json())
app.use(cors())

require('./plugins/db')(app) 
require('./routes/admin')(app)
require('./routes/web')(app)

app.use('/uploads', express.static(__dirname + '/uploads'))

app.listen(3000, () => {
  console.log('http://localhost:3000 server is running');
})
