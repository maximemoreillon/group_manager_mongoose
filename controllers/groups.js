
const Group = require('../models/group.js')

exports.create_group = (req, res) => {

  // Todo: use joy
  const new_group = new Group(req.body)

  new_group.save()
  .then((result) => {
    console.log(`[Mongoose] New group inserted`)
    res.send(result)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send('Error')
  })

}

exports.delete_group = (req, res) => {

  const {group_id} = req.params
  if(!group_id) return res.status(400).send(`Group ID not defined`)

  Group.deleteOne({_id: group_id})
  .then(() => {
    console.log(`[Mongoose] Group ${group_id} deleted`)
    res.send(`Group ${group_id} deleted`)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })

}

exports.update_group = (req, res) => {
  res.send('Not implemented')
}

exports.get_group = (req, res) => {

  const {group_id} = req.params
  if(!group_id) return res.status(400).send(`Group ID not defined`)

  Group.findById(group_id)
  .then(group => {
    console.log(`[Mongoose] Group ${group?._id} queried`)
    res.send(group)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })

}

exports.get_groups = (req, res) => {
  Group.find({})
  .then(groups => {
    console.log(`[Mongoose] Groups queried`)
    res.send(groups)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })
}

exports.get_groups_with_no_parent = (req, res) => {

  Group.find({parent: { $exists: 0}})
  .then(subgroups => {
    console.log(`[Mongoose] Groups with no parent queried`)
    res.send(subgroups)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })

}

exports.get_subgroups_of_group = (req, res) => {

  const {group_id} = req.params
  if(!group_id) return res.status(400).send(`Group ID not defined`)

  Group.find({parent: group_id})
  .then(subgroups => {
    console.log(`[Mongoose] Subgroups of group ${group_id} queried`)
    res.send(subgroups)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })

}
