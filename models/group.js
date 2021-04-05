const mongoose = require('mongoose')

const groupSchema = {
  name: String,
  avatar: String,
  members: Array,
  administrators: Array,
  parent: String,
  restricted: Boolean,
  official: Boolean,
  creation_date: Date,
 }

const Group = mongoose.model('Group', groupSchema)

module.exports = Group
