const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
const fileSystem = require('./data'); 

const port = 3000
// API endpoint to get file system data
app.get('/api/filesystem', (req, res) => {
  res.json(fileSystem)
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
