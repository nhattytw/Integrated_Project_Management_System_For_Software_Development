
require('dotenv').config({ path: './config/config.env' })
const jwt = require('jsonwebtoken/verify')

module.exports = function (req, res, next) {
      // Format of TOKEN
      // Authorization: Bearer <access_token>
      const tokenHeader = req.header('authorization')

      if (!tokenHeader) {
            return res
                  .status(403)
                  .send('Forbidden')
      }
      else {
            const bearerToken = tokenHeader.split(' ')
            const token = bearerToken[1]

            if (!token)
                  return res
                        .status(401)
                        .send('Access Denied')
            try {
                  const verified = jwt(
                        token,
                        process.env.JWT_SECRET
                  )
                  req.user = verified
                  next()

            } catch (err) {
                  return res
                        .status(401)
                        .send('Access Denied')
            }
      }
}