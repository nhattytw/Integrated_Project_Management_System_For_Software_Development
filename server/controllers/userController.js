require('dotenv').config({ path: './config/config.env' })
const user = require('../model/userInfo')
const messageFunction = require('../utils/messageFunction')
const jwt = require('jsonwebtoken')
const connectToDB = require('../utils/dbConnect')
const { securePassword,
      validatePassword } = require('../utils/securePassword')

// @desc     Register user
// @access   Public
const signup = async (req, res) => {
      connectToDB()
      try {
            const { firstName, lastName, dob, phoneNumber, email, userName, password, position, gitHubAccount } = req.body

            const existingUser = await user.findOne({
                  userName: userName
            }).lean(true)

            if (existingUser) {
                  return res
                        .status(403)
                        .json(
                              messageFunction(true, 'Username Already Exists')
                        )
            } else {
                  const hashedPassword = await securePassword(password)

                  const newUser = new user({
                        firstName: firstName,
                        lastName: lastName,
                        dob: dob,
                        phoneNumber: phoneNumber,
                        email: email,
                        userName: userName,
                        password: hashedPassword,
                        position: position,
                        gitHubAccount: gitHubAccount,
                        secret: ""
                  })

                  if (await newUser.save()) {
                        return res
                              .status(201)
                              .json(
                                    messageFunction(
                                          false,
                                          'User Created',
                                          newUser
                                    )
                              )
                  } else {
                        return res
                              .status(403)
                              .json(
                                    messageFunction(
                                          true, 'Failed to Create User')
                              )
                  }
            }
      } catch (error) {
            console.error(error.message)
            return res
                  .status(500)
                  .json(
                        messageFunction(true, 'Failed Adding User')
                  )
      }
}

// @desc     Signin for registered users
// @access   Public
const signin = async (req, res) => {
      connectToDB()
      try {
            const { userName, password } = req.body

            const existingUser = await user.findOne({
                  userName: userName
            }).lean(true)

            if (!existingUser) {
                  return res
                        .status(400)
                        .json(
                              messageFunction(true, 'Username or Password Incorrect')
                        )
            } else {
                  const hashedPassword = existingUser.password
                  const validatedPassword = await validatePassword(
                        password,
                        hashedPassword
                  )

                  if (!validatedPassword) {
                        return res
                              .status(400)
                              .json(
                                    messageFunction(true, 'Username or Password Incorrect')
                              )
                  }
                  const payload = {
                        id: existingUser._id,
                        userName: existingUser.userName
                  }

                  jwt.sign(
                        payload,
                        process.env.JWT_SECRET,
                        {
                              expiresIn: '6h', // For 6 hours
                        },
                        (error, token) => {
                              if (error)
                                    return res
                                          .status(401)
                                          .json(
                                                messageFunction(true, 'Unauthorized')
                                          )

                              console.log('Signedin')
                              return res
                                    .status(200)
                                    .json(
                                          messageFunction(
                                                false,
                                                `You've Logged in.`,
                                                { token, userName }
                                          )
                                    )
                        }
                  )
            }
      } catch (error) {
            console.error(error.message)
            return res
                  .status(500)
                  .json(
                        messageFunction(true, 'Failed Logging In, Please Try Again.')
                  )
      }
}

// @desc     Get All Users Information
// @access   Public
const getUsersInfo = async (_req, res) => {
      connectToDB()
      try {
            const existingUsers = await user
                  .find()

            if (!existingUsers) {
                  return res
                        .status(400)
                        .json(
                              messageFunction(true, 'No Users Found.')
                        )
            } else {
                  // Show Users Information
                  // Data - existingUsers
                  return res
                        .status(200)
                        .json(
                              messageFunction(false,
                                    'Users Information',
                                    existingUsers
                              )
                        )
            }
      } catch (error) {
            console.error(error.message)
            return res.status(500).json(
                  messageFunction(true, 'Failed To Fetch Users, Please Try Again.')
            )
      }
}

// @desc     Get User Information
// @access   Public
const searchUser = async (req, res) => {
      connectToDB()
      try {
            const { userName } = req.body

            console.log(userName)

            const existingUser = await user
                  .findOne({
                        userName: userName
                  })

            if (!existingUser) {
                  return res
                        .status(400)
                        .json(
                              messageFunction(true, 'No User Found.')
                        )
            } else {
                  // Show User Information
                  // Data - existingUser
                  return res
                        .status(200)
                        .json(
                              messageFunction(false,
                                    'User Information',
                                    existingUser)
                        )
            }
      } catch (error) {
            console.error(error.message)
            return res.status(500).json(
                  messageFunction(true, 'Failed To Fetch User, Please Try Again.')
            )
      }
}

// @desc     Update User Information
// @access   Public
const updateUserInfo = async (req, res) => {
      connectToDB()
      try {
            const { phoneNumber, email, userName, password, position, gitHubAccount } = req.body

            // Try with checking session or cookie - of the authentication - to get the userName without being sent as part of the data

            const existingUser = await user.findOne({
                  userName: userName
            }).lean(true)

            const hashedPassword = existingUser.password

            const validatedPassword = await validatePassword(
                  password,
                  hashedPassword
            )

            if (!validatedPassword) {
                  return res
                        .status(403)
                        .json(
                              messageFunction(true, 'Password Incorrect. Cannot Update.')
                        )
            } else {
                  try {
                        const response = await user.updateOne(
                              { userName: existingUser.userName },
                              {
                                    $set: {
                                          phoneNumber: phoneNumber,
                                          email: email,
                                          position: position,
                                          gitHubAccount: gitHubAccount
                                    }
                              },
                              {
                                    new: true
                              }
                        )
                        return res
                              .status(201)
                              .json(
                                    messageFunction(
                                          false,
                                          'Successfully Updated User Data.',
                                          response
                                    )
                              )
                  } catch (error) {
                        return res
                              .status(403)
                              .json(
                                    messageFunction(true, 'Updating User Data Failed.')
                              )
                  }
            }
      } catch (error) {
            console.error(error.message)
            return res
                  .status(500)
                  .json(
                        messageFunction(true, 'Updating User Data Failed. Please Try Again.')
                  )
      }
}

// @desc     Update User Password
// @access   Public
const updateUserPassword = async (req, res) => {
      connectToDB()
      try {
            const { userName, password, newPassword } = req.body

            // Try with checking session or cookie - of the authentication - to get the userName
            const existingUser = await user.findOne({
                  userName: userName
            }).lean(true)

            if (!existingUser) {
                  return res
                        .status(400)
                        .json(
                              messageFunction(true, 'Username Not Found')
                        )
            } else {
                  const hashedOldPassword = existingUser.password

                  const validatedPassword = await validatePassword(
                        password,
                        hashedOldPassword
                  )

                  if (!validatedPassword) {
                        return res
                              .status(403)
                              .json(
                                    messageFunction(true, 'Old Password Incorrect')
                              )
                  }

                  const hashedNewPassword = await securePassword(newPassword)

                  const validatedPasswords = await validatePassword(
                        newPassword,
                        hashedOldPassword
                  )

                  if (validatedPasswords) {
                        return res
                              .status(406)
                              .json(
                                    messageFunction(true, 'New Password cannot be same as the old one.')
                              )
                  } else {
                        try {
                              const response = await user.updateOne(
                                    { userName: existingUser.userName },
                                    {
                                          $set: {
                                                password: hashedNewPassword
                                          }
                                    }
                              )
                              return res
                                    .status(201)
                                    .json(
                                          messageFunction(
                                                false,
                                                'Successfully Updated Password.',
                                                response
                                          )
                                    )
                        } catch (error) {
                              return res
                                    .status(403)
                                    .json(
                                          messageFunction(true, 'Updating Password Failed.')
                                    )
                        }

                  }
            }
      } catch (error) {
            console.error(error.message)
            return res
                  .status(500)
                  .json(
                        messageFunction(true, 'Updating Password Failed. Please Try Again.')
                  )
      }
}

// @desc     Update User Password
// @access   Public
const forgotPassword = async (req, res) => {
      connectToDB()
      try {
            const { userName, password, secret } = req.body

            const existingUser = await user.findOne({
                  userName: userName
            }).lean(true)

            if (!existingUser) {
                  return res
                        .status(400)
                        .json(
                              messageFunction(true, 'Username Not Found')
                        )
            } else {
                  const hashedOldSecret = existingUser.secret
                  const hashedOldPassword = existingUser.password

                  const validatedSecret = await validatePassword(
                        secret,
                        hashedOldSecret
                  )

                  if (!validatedSecret) {
                        return res
                              .status(403)
                              .json(
                                    messageFunction(true, 'Secret Key Incorrect')
                              )
                  }

                  const hashedNewPassword = await securePassword(password)

                  const validatedPasswords = await validatePassword(
                        password,
                        hashedOldPassword
                  )

                  if (validatedPasswords) {
                        return res
                              .status(406)
                              .json(
                                    messageFunction(true, 'New Password cannot be same as the old one.')
                              )
                  } else {
                        try {
                              const response = await user.updateOne(
                                    { userName: existingUser.userName },
                                    {
                                          $set: {
                                                password: hashedNewPassword
                                          }
                                    }
                              )
                              return res
                                    .status(201)
                                    .json(
                                          messageFunction(
                                                false,
                                                'Successfully Resetted Password.',
                                                response
                                          )
                                    )
                        } catch (error) {
                              return res
                                    .status(403)
                                    .json(
                                          messageFunction(true, 'Resetting Password Failed.')
                                    )
                        }

                  }
            }
      } catch (error) {
            console.error(error.message)
            return res
                  .status(500)
                  .json(
                        messageFunction(true, 'Resetting Password Failed. Please Try Again.')
                  )
      }
}

module.exports = {
      signup,
      signin,
      getUsersInfo,
      searchUser,
      updateUserInfo,
      updateUserPassword,
      forgotPassword
}