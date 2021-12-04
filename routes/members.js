const express = require('express')
const controller = require('../controllers/members.js')

const router = express.Router({mergeParams: true})

router.route('/')
  .get(controller.get_members_of_group)
  .post(controller.add_member_to_group)

router.route('/:member_id')
  .delete(controller.remove_member_from_group)

module.exports = router
