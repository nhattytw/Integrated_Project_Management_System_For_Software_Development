const express = require('express')
const router = express.Router()
const verifyAuthentication = require('../middleware/verifyAuthentication')
const meetingValidation = require('../middleware/meetingValidation')
const {
      createMeeting,
      listMeetings,
      getMeeting,
      deleteMeeting,
      deleteMeetingDB,
      instantMeeting } = require('../controllers/zoomController')

// @route    POST api/createMeeting
// @desc     Create a Zoom Meeting
// @access   Private
router.post(
      '/createMeeting',
      verifyAuthentication,
      meetingValidation,
      createMeeting
)

// @route    GET api/instantMeeting
// @desc     Create a Zoom Meeting
// @access   Private
router.get(
      '/instantMeeting',
      verifyAuthentication,
      instantMeeting
)

// @route    POST api/listMeetings
// @desc     List Created Zoom Meetings
// @access   Private
router.post(
      '/listMeetings',
      // verifyAuthentication,
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

// @route    GET api/deleteMeeting
// @desc     List Created Zoom Meetings
// @access   Private
router.get(
      '/deleteMeeting',
      verifyAuthentication,
      deleteMeeting
)

// @route    GET api/getMeetings
// @desc     List Created Zoom Meetings
// @access   Private
router.get(
      '/deleteMeetingDB',
      verifyAuthentication,
      deleteMeetingDB
)

module.exports = router;