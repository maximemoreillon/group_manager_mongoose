const express = require('express')
const controller = require('../controllers/groups.js')
const member_router = require('./members.js')

const router = express.Router()

router.route('/')
  .post(controller.create_group)
  .get(controller.get_groups)


router.route('/:_id')
  .get(controller.get_group)
  .delete(controller.delete_group)
  .put(controller.update_group)

router.route('/:_id/subgroups')
  .get(controller.get_subgroups_of_group)

router.use('/:_id/members', member_router)

module.exports = router
