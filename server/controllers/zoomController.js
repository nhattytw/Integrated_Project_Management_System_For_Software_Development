require('dotenv').config({ path: './config/config.env' })
const requestPromise = require('request-promise')
const jwt = require('jsonwebtoken')
const messageFunction = require('../utils/messageFunction')
const Meeting = require('../model/meetings')
const connectToDB = require('../utils/dbConnect')
const User = require('../model/userInfo')

// Create model if needed to show the scheduled meetings
// Automatic delete if a meeting is time passed? or just listMeetings

const payload = {
      iss: process.env.ZOOM_API_KEY, // API KEY
      exp: new Date().getTime(),
}

const token = jwt.sign(
      payload,
      process.env.ZOOM_API_SECRET // API SECRET
)

//request the zoom api to create a meeting and adding participants
//registered with company email

// @desc     Create Zoom Meeting
// @access   Public
const createMeeting = async (req, res) => {
      // email = 'nathnael.tesfaye.hh4142@gmail.com'  // Company email account that has a zoom developer
      const { duration, start_time, topic, userName } = req.body

      var options = {
            method: 'POST',
            uri: 'https://api.zoom.us/v2/users/me/meetings',
            body: {
                  topic: topic,
                  type: 2, // Type - Schedule Meeting (2)
                  start_time: start_time,
                  // Duration can't be above 60 
                  duration: duration,
                  // participants: [
                  //       "nhatty567@gmail.com"
                  // ],
                  settings: {
                        host_video: 'true',
                        participant_video: 'true',
                        join_before_host: 'true',
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
            .then(async (response) => {
                  connectToDB()
                  try {
                        const userResult = await User.findOne({
                              userName: userName
                        })

                        if (userResult) {
                              const existingUserMeeting = await Meeting.findOne({
                                    projectManager: userResult._id
                              })

                              if (existingUserMeeting) {
                                    // appends the meetingId array of that user, no duplicate entry for same user
                                    const addMeeting = await Meeting.updateOne(
                                          {
                                                projectManager: userResult._id
                                          },
                                          {
                                                $push: {
                                                      meetingInfo: [{
                                                            meetingId: response.id,
                                                            meetingTopic: response.topic,
                                                            meetingDuration: response.duration,
                                                            meetingStartTime: response.start_time,
                                                            meetingStartUrl: response.join_url
                                                      }]
                                                }
                                          }
                                    )
                                    if (addMeeting) {
                                          return res
                                                .status(200)
                                                .json(
                                                      messageFunction(
                                                            false,
                                                            'Meeting Created',
                                                            response
                                                      )
                                                )
                                    } else {
                                          await deleteMeetingDB(response.id)
                                          return res
                                                .status(400)
                                                .json(
                                                      messageFunction(
                                                            false,
                                                            'Adding Meeting Failed'
                                                      )
                                                )
                                    }
                              } else {
                                    const newMeeting = await new Meeting({
                                          projectManager: userResult._id,
                                          meetingInfo: [{
                                                meetingId: response.id,
                                                meetingTopic: response.topic,
                                                meetingDuration: response.duration,
                                                meetingStartTime: response.start_time,
                                                meetingStartUrl: response.join_url
                                          }]
                                    }).save()

                                    if (newMeeting) {
                                          // creates new meeting
                                          return res
                                                .status(200)
                                                .json(
                                                      messageFunction(
                                                            false,
                                                            'Meeting Created',
                                                            response
                                                      )
                                                )
                                    } else {
                                          await deleteMeetingDB(response.id)
                                          return res
                                                .status(400)
                                                .json(
                                                      messageFunction(
                                                            false,
                                                            'Creating Meeting Failed'
                                                      )
                                                )
                                    }
                              }
                        } else {
                              await deleteMeetingDB(response.id)
                              return res
                                    .status(400)
                                    .json(
                                          messageFunction(
                                                false,
                                                'Username Not Found'
                                          )
                                    )
                        }
                  } catch (error) {
                        await deleteMeetingDB(response.id)
                        return res
                              .status(403)
                              .json(
                                    messageFunction(
                                          false,
                                          'Error Occured, Try again!'
                                    )
                              )
                  }
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
const listMeetings = async (req, res) => {
      const { userName } = req.body

      try {
            connectToDB()
            const userResult = await User.findOne({
                  userName: userName
            })

            if (userResult) {
                  const existingUserMeeting = await Meeting.findOne({
                        projectManager: userResult._id
                  })

                  if (existingUserMeeting) {
                        var data = existingUserMeeting.meetingInfo

                        return res
                              .status(200)
                              .json(
                                    messageFunction(
                                          false,
                                          'List of Meetings',
                                          data
                                    )
                              )
                  }
            }

      } catch (error) {
            return res
                  .status(500)
                  .json(
                        messageFunction(true, 'Server Error occured')
                  )
      }

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
                  type: 1, // Instant Meeting Type
                  settings: {
                        host_video: 'true',
                        participant_video: 'true',
                        join_before_host: 'true',
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

// @desc     Delete a Zoom Meeting from DB
// @access   Public
const deleteMeetingDB = (meetingId, _req, res) => {

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
      instantMeeting,
      deleteMeetingDB
}
