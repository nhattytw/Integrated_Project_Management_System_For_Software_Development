require('dotenv').config({ path: './config/config.env' })
const requestPromise = require('request-promise')
const jwt = require('jsonwebtoken')
const messageFunction = require('../utils/messageFunction')

// Create model if needed to show the scheduled meetings
// Automatic delete if a meeting is time passed? or just listMeetings

const payload = {
      iss: process.env.ZOOM_API_KEY, // API KEY
      exp: new Date().getTime() + 5000,
}

const token = jwt.sign(
      payload,
      process.env.ZOOM_API_SECRET // API SECRET
)

// @desc     Create Zoom Meeting
// @access   Public
//request the zoom api to create a meeting and adding participants
const createMeeting = (req, res) => {
      // email = 'nathnael.tesfaye.hh4142@gmail.com'  // your zoom developer email account

      var options = {
            method: 'POST',
            uri: 'https://api.zoom.us/v2/users/me/meetings',
            body: {
                  topic: req.body.topic, //meeting title
                  type: 2, // Schedule Meeting Type
                  start_time: req.body.start_time, // use this format and accept time (user input)
                  duration: req.body.duration, // duration can't be above 60
                  timezone: 'GMT+3',
                  // participants: [
                  //       "nhatty567@gmail.com"
                  // ],
                  settings: {
                        host_video: 'true',
                        participant_video: 'true',
                  },
            },
            auth: {
                  bearer: token,
            },
            headers: {
                  'User-Agent': 'Zoom-api-Jwt-Request',
                  'content-type': 'application/json',
            },
            json: true, //Parse the JSON string in the response
      }

      requestPromise(options)
            .then((response) => {
                  return res
                        .status(200)
                        .json(
                              messageFunction(
                                    false,
                                    'Meeting Created',
                                    response
                              )
                        )
            })
            .catch(() => {
                  // API call failed...
                  return res
                        .status(422)
                        .json(
                              messageFunction(true, 'Unprocessable Entity')
                        )
            })
}

// @desc     Get All Zoom Meetings
// @access   Public
//lists all active meetings
const listMeetings = (_req, res) => {
      var options = {
            method: 'GET',
            uri: 'https://api.zoom.us/v2/users/me/meetings',
            auth: {
                  type: 2,
                  bearer: token,
            },
            headers: {
                  'User-Agent': 'Zoom-api-Jwt-Request',
                  'content-type': 'application/json',
            },
            json: true, //Parse the JSON string in the response
      }

      requestPromise(options)
            .then((response) => {
                  return res
                        .status(200)
                        .json(
                              messageFunction(
                                    false,
                                    'List of Meetings',
                                    response
                              )
                        )
            })
            .catch(() => {
                  // API call failed...
                  return res
                        .status(422)
                        .json(
                              messageFunction(true, 'Unprocessable Entity')
                        )
            })
}

// @desc     Get Zoom Meeting
// @access   Public
const getMeeting = (req, res) => {
      const meetingId = req.body.meetingId

      if (!meetingId) {
            console.log('Meeting Id Required')
            return res
                  .status(400)
                  .json(
                        messageFunction(true, 'Meeting Id Required')
                  )
      }
      var options = {
            method: 'GET',
            uri: 'https://api.zoom.us/v2/meetings/' + meetingId,
            auth: {
                  bearer: token,
            },
            headers: {
                  'User-Agent': 'Zoom-api-Jwt-Request',
                  'content-type': 'application/json',
            },
            json: true, //Parse the JSON string in the response
      }

      requestPromise(options)
            .then((response) => {
                  return res
                        .status(200)
                        .json(
                              messageFunction(
                                    false,
                                    'Meeting Info',
                                    response
                              )
                        )
            })
            .catch(() => {
                  // API call failed...
                  return res
                        .status(422)
                        .json(
                              messageFunction(true, 'Unprocessable Entity')
                        )
            })
}

// @desc     Create Instant Meeting
// @access   Public
const instantMeeting = (req, res) => {
      var options = {
            method: 'POST',
            uri: 'https://api.zoom.us/v2/users/me/meetings',
            body: {
                  topic: req.body.topic, //meeting title
                  type: 1, // Instant Meeting Type
                  settings: {
                        host_video: 'true',
                        participant_video: 'true',
                  },
            },
            auth: {
                  bearer: token,
            },
            headers: {
                  'User-Agent': 'Zoom-api-Jwt-Request',
                  'content-type': 'application/json',
            },
            json: true, //Parse the JSON string in the response
      }

      requestPromise(options)
            .then((response) => {
                  console.log(response.start_url)
                  return res
                        .status(200)
                        .json(
                              messageFunction(
                                    false,
                                    'Meeting Created',
                                    response
                              )
                        )
            })
            .catch(() => {
                  // API call failed...
                  return res
                        .status(422)
                        .json(
                              messageFunction(true, 'Unprocessable Entity')
                        )
            })
}

// @desc     Delete a Zoom Meeting
// @access   Public
const deleteMeeting = (req, res) => {
      const meetingId = req.body.meetingId

      if (!meetingId) {
            console.log('Meeting Id Required')
            return res
                  .status(400)
                  .json(
                        messageFunction(true, 'Meeting Id Required')
                  )
      }
      var options = {
            method: 'DELETE',
            uri: 'https://api.zoom.us/v2/meetings/' + meetingId,
            auth: {
                  bearer: token,
            },
            headers: {
                  'User-Agent': 'Zoom-api-Jwt-Request',
                  'content-type': 'application/json',
            },
            json: true, //Parse the JSON string in the response
      }

      requestPromise(options)
            .then((response) => {
                  return res
                        .status(200)
                        .json(
                              messageFunction(
                                    false,
                                    'Meeting Deleted Successfully',
                                    response
                              )
                        )
            })
            .catch(() => {
                  // API call failed...
                  return res
                        .status(422)
                        .json(
                              messageFunction(true, 'Unprocessable Entity')
                        )
            })
}


module.exports = {
      createMeeting,
      listMeetings,
      getMeeting,
      deleteMeeting,
      instantMeeting
}
