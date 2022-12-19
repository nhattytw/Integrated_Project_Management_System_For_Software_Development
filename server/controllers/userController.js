const user = require('../model/userInfo')
const errorFunction = require('../utils/errorFunction')
const { securePassword, validatePassword } = require('../utils/securePassword')
const connectToDB = require('../utils/dbConnect')

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
                              errorFunction(true, "Username Already Exists")
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
                        gitHubAccount: gitHubAccount
                  })

                  if (await newUser.save()) {
                        return res
                              .status(201)
                              .json(
                                    errorFunction(false, "User Created", newUser)
                              )
                  } else {
                        return res
                              .status(403)
                              .json(
                                    errorFunction(true, "Failed to Create User")
                              )
                  }
            }
      } catch (error) {
            console.error(error.message)
            return res
                  .status(500)
                  .json(
                        errorFunction(true, "Failed Adding User")
                  )
      }
}

// @desc     Signin user
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
                              errorFunction(true, "Username Not Found")
                        )
            } else {
                  const hashedPassword = existingUser.password
                  const validatedPassword = await validatePassword(
                        password,
                        hashedPassword
                  )

                  if (!validatedPassword) {
                        return res
                              .status(401)
                              .json(
                                    errorFunction(true, "Username/Password Incorrect")
                              )
                  }
                  // Add Authentication Method Here
                  console.log("Signedin")
                  return res
                        .status(200)
                        .json(
                              errorFunction(true, "You've Logged in")
                        )
                  // Until Here
                  // Then maybe have a way to work with a verifyAuthentication.js
            }
      } catch (error) {
            console.error(error.message)
            return res
                  .status(500)
                  .json(
                        errorFunction(true, "Failed Logging In, Please Try Again.")
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
                              errorFunction(true, "No Users Found.")
                        )
            } else {
                  // Show Users Information
                  // Data - existingUsers
                  return res.json(existingUsers)
            }
      } catch (error) {
            console.error(error.message)
            return res.status(500).json(
                  errorFunction(true, "Failed To Fetch Users, Please Try Again.")
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
                              errorFunction(true, "No User Found.")
                        )
            } else {
                  // Show User Information
                  // Data - existingUser
                  return res.json(existingUser)
            }
      } catch (error) {
            console.error(error.message)
            return res.status(500).json(
                  errorFunction(true, "Failed To Fetch User, Please Try Again.")
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
                              errorFunction(true, "Password Incorrect. Cannot Update.")
                        )
            } else {
                  try {
                        await user.updateOne(
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
                                    errorFunction(false, "Successfully Updated User Data.")
                              )
                  } catch (error) {
                        return res
                              .status(403)
                              .json(
                                    errorFunction(true, "Updating User Data Failed.")
                              )
                  }
            }
      } catch (error) {
            console.error(error.message)
            return res
                  .status(500)
                  .json(
                        errorFunction(true, "Updating User Data Failed. Please Try Again.")
                  )
      }
}


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
                              errorFunction(true, "Username Not Found")
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
                                    errorFunction(true, "Old Password Incorrect")
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
                                    errorFunction(true, "New Password cannot be same as the old one.")
                              )
                  } else {
                        try {
                              await user.updateOne(
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
                                          errorFunction(false, "Successfully Updated Password.",)
                                    )
                        } catch (error) {
                              return res
                                    .status(403)
                                    .json(
                                          errorFunction(true, "Updating Password Failed.")
                                    )
                        }

                  }
            }
      } catch (error) {
            console.error(error.message)
            return res
                  .status(500)
                  .json(
                        errorFunction(true, "Updating Password Failed. Please Try Again.")
                  )
      }
}

module.exports = {
      signup,
      signin,
      getUsersInfo,
      searchUser,
      updateUserInfo,
      updateUserPassword
}