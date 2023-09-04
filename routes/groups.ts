import express from "express"
import member_router from "./members"
import {
  create_group,
  get_groups,
  get_group,
  delete_group,
  update_group,
  get_subgroups_of_group,
} from "../controllers/groups"

const router = express.Router()

router.route("/").post(create_group).get(get_groups)

router
  .route("/:_id")
  .get(get_group)
  .delete(delete_group)
  .put(update_group)
  .patch(update_group)

router.route("/:_id/subgroups").get(get_subgroups_of_group)

router.use("/:_id/members", member_router)

export default router
