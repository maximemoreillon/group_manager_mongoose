const {Schema, model} = require('mongoose')

/*
Could think of having array of users with an 'Admin' property
{user_id: String, admin: Boolean}
*/

// TODO: prevent member duplicate
const memberSchema = new Schema({
  user_id: {type: String},
  admin: Boolean
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
