import express from "express"
import {
  get_members_of_group,
  add_member_to_group,
  remove_member_from_group,
} from "../controllers/members"

const router = express.Router({ mergeParams: true })

router.route("/").get(get_members_of_group).post(add_member_to_group)

router.route("/:member_id").delete(remove_member_from_group)

export default router
