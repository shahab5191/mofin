import express from "express"
import {signupRouter} from "./routes/signup"
import {body} from "express-validator"

const router = express.Router()

router.post(
	`${process.env.API_PREFIX}/user/signup`,
	[
		body("email").isEmail().withMessage("email is not valid"),
		body("password").isStrongPassword().withMessage("password is not safe!")
	],
	signupRouter
)

export {router as authRouter}
