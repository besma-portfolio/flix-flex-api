import mongoose from "mongoose"
import config from "./config"

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true
}

const database = mongoose
  .connect(
    config.database.host,
    options
  )
  .then(() => {
    console.log(`** connected to database **`)
  })
  .catch((err) => console.error("Error connecting to database:", err.message))

export default database

