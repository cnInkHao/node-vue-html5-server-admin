const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

require('./routes/admin')(app)
require('./plugins/db')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000 server is running');
})