const mongoose = require('mongoose')
const DB_URL = process.env.DB_URL

mongoose.set("strictQuery", false)

const connectToDB = async (_req, res) => {
      try {
            await mongoose
                  .connect(
                        DB_URL, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                  })

            console.log("Successfully connected to MongoDB.")

      } catch (error) {
            console.log("Can't connect to MongoDb")
            console.error(error.message)

            return res
                  .status(400)
                  .json(
                        messageFunction(
                              true,
                              `Can't connect to MongoDb! Please make sure you are connected to the internet.`
                        )
                  )
      }
}

module.exports = connectToDB