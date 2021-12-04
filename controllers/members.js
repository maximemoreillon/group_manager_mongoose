const Group = require('../models/group.js')
const {error_handling} = require('../utils.js')

exports.get_members_of_group = async (req, res) => {

  try {
    const {_id} = req.params
    if(!_id) return res.status(400).send(`Group ID not defined`)

    const {members} = await Group.findById(_id)
    res.send(members)

    console.log(`[Mongoose] Members of group ${_id} queried`)
  }
  catch (error) {
    error_handling(error, res)
  }


}

exports.add_member_to_group = async (req, res) => {
  try {
    const {user_id} = req.body
    const {_id} = req.params
    if(!_id) return res.status(400).send(`Group ID not defined`)

    const group = await Group.findById(_id)

    group.members.push({user_id})

    await group.save()

    res.send(group)

    console.log(`[Mongoose] User ${user_id} added to group ${_id}`)
  }
  catch (error) {
    error_handling(error, res)
  }
}

exports.remove_member_from_group = async (req, res) => {
  try {
    const {_id, member_id} = req.params

    if(!_id) return res.status(400).send(`Group ID not defined`)

    const group = await Group.findById(_id)
    const {members} = group

    const member_index = members.find( ({_id, user_id}) => {
      return _id.toString() === member_id
        || user_id.toString() === member_id
    } )

    if(member_index < 0) return res.status(404).send(`Member not found`)

    members.splice(member_index,1)

    await group.save()

    res.send({member_id})

  }
  catch (error) {
    error_handling(error, res)
  }
}
