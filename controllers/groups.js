const Group = require('../models/group.js')
const {error_handling} = require('../utils.js')

exports.create_group = async (req, res) => {

  try {
    // Todo: add one as admin and member using a mongoose creation function
    const {user} = res.locals
    const properties = {
      members: [   {user_id: user._id, admin: true} ],
      creation_date: new Date(),
      ...req.body,
    }
    const group = await Group.create(properties)
    res.send(group)
    console.log(`[Mongoose] Group ${group._id} created`)
  }
  catch (error) {
    error_handling(error, res)
  }

}

exports.delete_group = async (req, res) => {

  try {
    const {_id} = req.params
    if(!_id) return res.status(400).send(`Group ID not defined`)

    const result = await Group.deleteOne({_id})

    res.send(result)
    console.log(`[Mongoose] Group ${_id} deleted`)
  }
  catch (error) {
    error_handling(error, res)
  }
}

exports.update_group = async (req, res) => {
  try {
    const {_id} = req.params
    if(!_id) return res.status(400).send(`Group ID not defined`)
    const properties = req.body

    const group = await Group.findOneAndUpdate({_id}, properties)

    res.send(group)
    console.log(`[Mongoose] Group ${group._id} updated`)
  }
  catch (error) {
    error_handling(error, res)
  }
}

exports.get_group = async (req, res) => {

  try {
    const {_id} = req.params
    if(!_id) return res.status(400).send(`Group ID not defined`)

    const group = await Group.findOne({_id})

    res.send(group)
    console.log(`[Mongoose] Group ${group._id} queried`)
  }
  catch (error) {
    error_handling(error, res)
  }

}

exports.get_groups = async (req, res) => {

  try {
    const {top} = req.query

    const query = {}
    if(top) query.parent = { $exists: 0}

    const groups = await Group.find(query)

    res.send(groups)
    console.log(`[Mongoose] Groups queried`)
  }
  catch (error) {
    error_handling(error, res)
  }

}

exports.get_subgroups_of_group = async (req, res) => {

  console.log('subgroups query')

  try {
    const {_id} = req.params
    if(!_id) return res.status(400).send(`Group ID not defined`)
    const subgroups =  await Group.find({parent: _id})
    res.send(subgroups)
    console.log(`[Mongoose] Subgroups of group ${_id} queried`)
  }
  catch (error) {
    error_handling(error, res)
  }


}
