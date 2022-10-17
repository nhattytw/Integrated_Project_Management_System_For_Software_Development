const mongoose = require('mongoose')
const DB_URL = process.env.DB_URL

const connectToDB = async () => {
      try {
            mongoose
            .connect(
                  DB_URL, {
                  useNewUrlParser: true,
                  useUnifiedTopology: true,
            })
            console.log("Successfully connected to MongoDB.")
      } catch (error) {
            console.log("Can't connect to MongoDb")
            console.error(error.message)
            process.exit(1)
      }
}

module.exports = connectToDB