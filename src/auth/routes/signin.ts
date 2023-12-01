import {Request, Response} from "express";
import {validationResult} from "express-validator";
import {User} from "../models/user";
import Jwt from "jsonwebtoken"
import {passwordIsValid} from "../../utils/encryption";

const signin = async (req: Request, res: Response) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		console.error(errors)
		return res.status(403).send({err: "you must provide valid email and password"})
	}

	const {email, password} = req.body
	let foundUser: User | null;

	try {
		foundUser = await User.findOne({where: {email}})
	} catch (err) {
		console.error("[signin]: ", err)
		return res.status(500).send({err: "Somthing went wrong! please try again later"})
	}
	if (!foundUser || (!passwordIsValid(password, foundUser.password))) {
		return res.status(404).send({err: "email or password is wrong!"})
	}

	let token = ""
	try {
		token = Jwt.sign({id: foundUser.id, email: foundUser.email, username: foundUser.email}, process.env.JWT_SECRET!)
	} catch (err) {
		console.error(err)
		return res.status(500).send("Somthing went wrong! please try again later.")
	}

	req.session = {jwt: token}

	return res.status(200).send({id: foundUser.id, email: foundUser.email, password: foundUser.password})
}

export {signin as signinRouter}
