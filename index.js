const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const groups_router = require('./routes/groups.js')
const {version, author} = require('./package.json')
const db = require('./db.js')
const auth = require('@moreillon/express_identification_middleware')

dotenv.config()

const {
  EXPRESS_PORT = 80,
  USER_MANAGER_API_URL = 'http://user-manager'
} = process.env

const auth_options = {url: `${USER_MANAGER_API_URL}/users/self`}

db.connect()

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send({
    application_name: 'Group manager',
    version,
    author,
    mongodb:{
      url: db.url,
      db: db.db,
    },
    auth_options,
  })
})

app.use(auth(auth_options))

app.use('/groups', groups_router)


app.listen(EXPRESS_PORT, () => {
  console.log(`Group manager listening on port ${EXPRESS_PORT}`)
})
