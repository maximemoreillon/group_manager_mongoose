import Group from "../models/group"
import { Request, Response } from "express"

export const create_group = async (req: Request, res: Response) => {
  // Todo: add one as admin and member using a mongoose creation function
  const { user } = res.locals
  const properties = {
    members: [{ user_id: user._id, admin: true }],
    creation_date: new Date(),
    ...req.body,
  }
  const group = await Group.create(properties)
  res.send(group)
  console.log(`[Mongoose] Group ${group._id} created`)
}

export const delete_group = async (req: Request, res: Response) => {
  const { _id } = req.params
  if (!_id) return res.status(400).send(`Group ID not defined`)

  const result = await Group.deleteOne({ _id })

  res.send(result)
  console.log(`[Mongoose] Group ${_id} deleted`)
}

export const update_group = async (req: Request, res: Response) => {
  const { _id } = req.params
  if (!_id) return res.status(400).send(`Group ID not defined`)
  const properties = req.body

  const group = await Group.findOneAndUpdate({ _id }, properties)

  res.send(group)
  console.log(`[Mongoose] Group ${group._id} updated`)
}

export const get_group = async (req: Request, res: Response) => {
  const { _id } = req.params
  if (!_id) return res.status(400).send(`Group ID not defined`)

  const group = await Group.findOne({ _id })

  if (!group) throw { code: 404, message: `Group ${_id} no found` }

  res.send(group)
  console.log(`[Mongoose] Group ${group._id} queried`)
}

export const get_groups = async (req: Request, res: Response) => {
  const { top } = req.query

  const query: any = {}
  if (top) query.parent = { $exists: 0 }

  const groups = await Group.find(query)

  res.send(groups)
  console.log(`[Mongoose] Groups queried`)
}

export const get_subgroups_of_group = async (req: Request, res: Response) => {
  const { _id } = req.params
  if (!_id) return res.status(400).send(`Group ID not defined`)
  const subgroups = await Group.find({ parent: _id })
  res.send(subgroups)
  console.log(`[Mongoose] Subgroups of group ${_id} queried`)
}
