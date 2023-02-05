require('dotenv').config({ path: './config/config.env' })
const requestPromise = require('request-promise')
const jwt = require('jsonwebtoken')
const messageFunction = require('../utils/messageFunction')
const Meeting = require('../model/meetings')
const connectToDB = require('../utils/dbConnect')
const User = require('../model/userInfo')
const Project = require('../model/project')
const teamAssignment = require('../model/teamAssignment')
const { getAllProject } = require('./projectController')

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
      const { duration, start_time, topic, userName, projectName } = req.body

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
                              const existingProjectMeeting = await Meeting.findOne({
                                    projectName: projectName
                              })

                              if (existingProjectMeeting) {
                                    // appends the meetingId array of that user, no duplicate entry for same project
                                    const addMeeting = await Meeting.updateOne(
                                          {
                                                projectName: existingProjectMeeting.projectName
                                          },
                                          {
                                                $push: {
                                                      meetingInfo: [{
                                                            meetingId: response.id,
                                                            meetingTopic: response.topic,
                                                            meetingDuration: response.duration,
                                                            meetingStartTime: response.start_time,
                                                            meetingStartUrl: response.join_url,
                                                            projectName: projectName
                                                      }],
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
                                                            response.meetingInfo
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
                                                meetingStartUrl: response.join_url,
                                                projectName: projectName
                                          }],
                                          projectName: projectName
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
const listMeetings = async (req, res) => {
      const { userName } = req.body

      const sort_by_key = (array, key) => {
            return array.sort(function (a, b) {
                  var x = a[key]
                  var y = b[key]
                  return ((x < y) ? -1 : ((x > y) ? 1 : 0))
            })
      }
      try {
            connectToDB()
            const userResult = await User.findOne({
                  userName: userName
            })

            if (userResult) {
                  await Meeting.find({
                        projectManager: userResult._id
                  }).exec((error, existingUserMeeting) => {
                        existingUserMeeting = sort_by_key(
                              existingUserMeeting,
                              "projectName"
                        )
                        console.log(existingUserMeeting)
                        return res
                              .status(200)
                              .json(
                                    messageFunction(
                                          false,
                                          'List of Meetings',
                                          existingUserMeeting
                                    )
                              )
                  })
            } else {
                  return res
                        .status(403)
                        .json(
                              messageFunction(
                                    true,
                                    'Failed to Fetch Meetings, Please try again!'
                              )
                        )

            }
      } catch (error) {
            return res
                  .status(500)
                  .json(
                        messageFunction(true, 'Server Error occured')
                  )
      }

}

// @desc     Get All Developer Zoom Meetings
// @access   Public
const listDevMeetings = async (req, res) => {
      const { userName } = req.body
      connectToDB()

      try {
            var userTeamResult = await User.findOne({
                  userName: userName
            })
            var project = []

            await userTeamResult.assignedTeam.map(async (item) => {
                  var team = await teamAssignment.findOne({
                        teamName: item
                  })
                  var meeting = Meeting.find({
                        projectName: team.assignedProject[0]
                  }).exec((err, meet) => {
                        if (meet) {
                              project.push(meet[0].meetingInfo)
                        }
                        console.log("=>", project)
                  })
            })


            // return res
            //       .status(200)
            //       .json(
            //             messageFunction(
            //                   false,
            //                   'List of Meetings',
            //                   project
            //             )
            //       )
            //             }).then((item) => {
            //                   console.log("-----------", item)
            //             })
            //       })

            // })
            // })

            // else {
            //       return res
            //             .status(403)
            //             .json(
            //                   messageFunction(
            //                         true,
            //                         'Failed to Fetch Meetings, Please try again!'
            //                   )
            //             )

            // }
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
      deleteMeetingDB,
      listDevMeetings
}
