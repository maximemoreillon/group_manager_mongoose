const Group = require('../models/group.js')
const {error_handling} = require('../utils.js')

exports.get_members_of_group = async (req, res) => {

  console.log('members query')


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

exports.add_member_to_group = (req, res) => {
  res.status(501).send('not implemented')
}

exports.remove_member_from_group = (req, res) => {
  res.status(501).send('not implemented')
}
