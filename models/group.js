const {Schema, model} = require('mongoose')


// TODO: prevent member duplicate
const memberSchema = new Schema({
  user_id: {type: String},
  admin: {type: Boolean, default: false}
})


const groupSchema = new Schema({
  name: String,
  avatar: String,
  members: [memberSchema],
  parent: String, // parent group
  restricted: Boolean,
  official: Boolean,
  creation_date: Date,
})

const Group = model('Group', groupSchema)

module.exports = Group
