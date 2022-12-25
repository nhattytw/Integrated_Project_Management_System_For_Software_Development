const express = require('express')
const router = express.Router()
const verifyAuthentication = require('../middleware/verifyAuthentication')
const {
      createMeeting,
      listMeetings,
      getMeeting,
      deleteMeeting } = require('../controllers/zoomController')

// @route    GET api/createMeeting
// @desc     Create a Zoom Meeting
// @access   Private
router.get(
      '/createMeeting',
      verifyAuthentication,
      createMeeting
)

// @route    GET api/listMeetings
// @desc     List Created Zoom Meetings
// @access   Private
router.get(
      '/listMeetings',
      verifyAuthentication,
      listMeetings
)

// @route    GET api/getMeetings
// @desc     List Created Zoom Meetings
// @access   Private
router.get(
      '/getMeeting',
      verifyAuthentication,
      getMeeting
)

// @route    GET api/getMeetings
// @desc     List Created Zoom Meetings
// @access   Private
router.get(
      '/deleteMeeting',
      verifyAuthentication,
      deleteMeeting
)

module.exports = router;