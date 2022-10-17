let bcrypt = require('bcrypt')

// @desc     salt + hash password
// @access   Public
// @return   hashedPassword
const securePassword = async (password) => {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(
            password,
            salt
      )
      return hashedPassword
}

// @desc     VerifyPassword
// @access   Public
// @return   boolean
const validatePassword = async (password, hashedPassword) => {
      const comparePassword = await bcrypt.compare(
            password,
            hashedPassword
      )

      return comparePassword
}

module.exports = { securePassword, validatePassword }