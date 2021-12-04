const express = require('express')
const member_router = require('./members.js')
const {
  create_group,
  get_groups,
  get_group,
  delete_group,
  update_group,
  get_subgroups_of_group
} = require('../controllers/groups.js')

const router = express.Router()

router.route('/')
  .post(create_group)
  .get(get_groups)

router.route('/:_id')
  .get(get_group)
  .delete(delete_group)
  .put(update_group)
  .patch(update_group)

router.route('/:_id/subgroups')
  .get(get_subgroups_of_group)

router.use('/:_id/members', member_router)

module.exports = router
