import express from "express"
import "express-async-errors"
import cors from "cors"
import dotenv from "dotenv"
import groups_router from "./routes/groups"
import { version, author } from "./package.json"
import { connect as dbConnect, MONGODB_URL, MONGODB_DB } from "./db"
// @ts-ignore
import auth from "@moreillon/express_identification_middleware"

dotenv.config()

const { EXPRESS_PORT = 80, USER_MANAGER_API_URL = "http://user-manager" } =
  process.env

const auth_options = { url: `${USER_MANAGER_API_URL}/users/self` }

dbConnect()

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send({
    application_name: "Group manager",
    version,
    author,
    mongodb: {
      url: MONGODB_URL,
      db: MONGODB_DB,
    },
    auth_options,
  })
})

app.use(auth(auth_options))

app.use("/groups", groups_router)

app.listen(EXPRESS_PORT, () => {
  console.log(`[Express] listening on port ${EXPRESS_PORT}`)
})
