import bcrypt from "bcrypt"
const hashPassword = async (pass: string, salt?: string) => {
	if (salt === undefined) {
		salt = await bcrypt.genSalt()
	}
	const hashed = await bcrypt.hash(pass, salt)
	return {hashed, salt}
}

const passwordIsValid = async (password: string, hashedPassword: string) => {
	return await bcrypt.compare(password, hashedPassword)
}

export {hashPassword, passwordIsValid}
