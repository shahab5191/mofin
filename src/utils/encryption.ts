import bcrypt from "bcrypt"
const hashPassword = async (pass:string, salt?: string) => {
	if(salt === undefined){
		salt = await bcrypt.genSalt()
	}
	const hashed = await bcrypt.hash(pass, salt)
	return {hashed, salt}
}

export { hashPassword }
