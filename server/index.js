const express = require('express')
const cors = require('cors')

const app = express()

app.set('secret', 'asdasdasdasdasdsa')

app.use(express.json())
app.use(cors())

require('./routes/admin')(app)
require('./plugins/db')(app)

app.use('/uploads', express.static(__dirname + '/uploads'))

app.listen(3000, () => {
  console.log('http://localhost:3000 server is running');
})
