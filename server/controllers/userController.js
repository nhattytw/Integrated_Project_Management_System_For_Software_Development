const user = require('../model/userInfo')
const errorFunction = require('../utils/errorFunction')
const { securePassword, validatePassword } = require('../utils/securePassword')

// @desc     Register user
// @access   Public
const signup = async (req, res) => {
      try {
            const { fullName, email, userName, password } = req.body

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
                        fullName: fullName,
                        email: email,
                        userName: userName,
                        password: hashedPassword
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

module.exports = { signup, signin }