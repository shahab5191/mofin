import express, { json }from "express"
import morgan from "morgan"
import cookieSession from "cookie-session"
import cors from "cors"
import { authRouter } from "./auth/auth"
const app = express()

app.use(json())
app.use(cors())
app.use(morgan("tiny"))
app.use(cookieSession({
	name:"session",
	signed: false,
	secure: false
	}))
app.use(authRouter)
app.all("*",(_,res)=>{
	res.status(200).send({test: "Server is Working"})
})
export { app }
