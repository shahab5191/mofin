import {Request, Response} from "express"
import Jwt from "jsonwebtoken"
import {validationResult} from "express-validator"
import {hashPassword} from "../../utils/encryption"
import {User} from "../models/user"
const signupRouter = async (req: Request, res: Response) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res
			.status(400)
			.send({err: "please provide valid email and password!"})
	}
	const {email, password} = req.body

	let foundUser: User | null
	foundUser = await User.findOne({where: {email}})
	if (foundUser) return res.status(403).send({err: "User already exists!"})

	const {hashed, salt} = await hashPassword(password)

	foundUser = await User.create({
		email,
		password: hashed,
		salt,
		role: 1,
		username: ""
	})
	let token = ""
	try {
		token = Jwt.sign({id: foundUser.id, email: foundUser.email, username: foundUser.username}, process.env.JWT_SECRET!)
	} catch {
		console.error("JWT creation in failed")
		return res.status(500).send({err: "somthing went wrong! please try again later."})
	}

	req.session = {jwt: token}

	return res.status(201).send({
		id: foundUser.id,
		email: foundUser.email,
		username: foundUser.username
	})
}

export {signupRouter}
