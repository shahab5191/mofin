import express from "express"
import {signupRouter} from "./routes/signup"
import {signinRouter} from "./routes/signin"
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

router.post(
	`${process.env.API_PREFIX}/user/signin`,
	[
		body("email").notEmpty().withMessage("email cannot be empty"),
		body("password").notEmpty().withMessage("password cannot be empty")
	],
	signinRouter
)

export {router as authRouter}
