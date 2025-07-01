const connectToMongo = require("./db")
const express = require('express')
const app = express()
const port = 5000
const authRouter = require("./routes/auth.js");
const notesRouter = require("./routes/notes.js");
app.use(express.json())
// available routes
app.use('/api/auth', authRouter)
app.use('/api/notes', notesRouter)



app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/v1/login', (req, res) => {
  res.send('LOGIN')
})

app.get('/v1/signup', (req, res) => {
  res.send('SIGNUP')
})


app.listen(port, () => {
  console.log(`Example app listening on port at http://localhost:${port}`)
})


connectToMongo();