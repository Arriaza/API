// imports
const mongoose = require('mongoose')
const express = require('express')
const user = require('./user.controller')

// starting the app
const app = express()
const port = 3000

app.use(express.json())
// ! put the url
mongoose.connect('')

// endpoint, handler, controller
app.get('/users', user.list)
app.post('/users', user.create)
app.get('/users/:id', user.get)
app.put('/users/:id', user.update)
app.patch('/users/:id', user.update)
app.delete('/users/:id', user.delete)

// returns HTML
app.get('/', (req, res) => {
  console.log(__dirname)
  res.sendFile(`${__dirname}/index.html`)
})

// file management
app.use(express.static('app'))

// uncontrolled routes
app.get('*', (req, res) => {
  res.status(404).send('Page not found')
})

app.post('*', (req, res) => {
  res.status(404).send('Page not found')
})

// listening requests
app.listen(port, () => {
  console.log('Running the app')
})
