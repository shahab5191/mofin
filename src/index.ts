import { sequelize } from './db/connect'
import { app } from "./app"
let port = 4000
if(process.env.PORT !== undefined) {
	port = parseInt(process.env.PORT)
}

const startService = async(): Promise<void> => {
	try {
		await sequelize.authenticate()
		await sequelize.sync({ force: true })
		app.listen(port, () => {
			console.log(`server started at port: ${port}`)
		})
	} catch (err) {
		console.log(err)
		return
	}
}

void startService()
