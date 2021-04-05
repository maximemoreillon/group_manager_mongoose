const express = require('express')
const controller = require('../controllers/groups.js')
const member_router = require('./members.js')

const router = express.Router()

router.route('/')
  .post(controller.create_group)
  .get(controller.get_groups)

router.route('/top')
  .get(controller.get_groups_with_no_parent)

router.route('/:group_id')
  .get(controller.get_group)
  .delete(controller.delete_group)
  .put(controller.update_group)

router.route('/:group_id/subgroups')
  .get(controller.get_subgroups_of_group)

router.use('/:group_id/members', member_router)

module.exports = router
