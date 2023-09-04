import Group from "../models/group"
import { Request, Response } from "express"

export const get_members_of_group = async (req: Request, res: Response) => {
  const { _id } = req.params
  if (!_id) return res.status(400).send(`Group ID not defined`)

  const { members } = await Group.findById(_id)
  res.send(members)

  console.log(`[Mongoose] Members of group ${_id} queried`)
}

export const add_member_to_group = async (req: Request, res: Response) => {
  const { user_id } = req.body
  const { _id } = req.params
  if (!_id) return res.status(400).send(`Group ID not defined`)

  const group = await Group.findById(_id)

  const found_member = group.members.find(
    (member: any) => member.user_id === user_id
  )
  if (found_member) throw { code: 400, message: `User already in group` }

  group.members.push({ user_id })

  await group.save()

  res.send(group)

  console.log(`[Mongoose] User ${user_id} added to group ${_id}`)
}

export const remove_member_from_group = async (req: Request, res: Response) => {
  const { _id, member_id } = req.params

  if (!_id) return res.status(400).send(`Group ID not defined`)

  const group = await Group.findById(_id)
  const { members } = group

  const member_index = members.find(({ _id, user_id }: any) => {
    return _id.toString() === member_id || user_id.toString() === member_id
  })

  if (member_index < 0) return res.status(404).send(`Member not found`)

  members.splice(member_index, 1)

  await group.save()

  res.send({ member_id })
}
