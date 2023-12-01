import dotenv from "dotenv"
import { Sequelize } from "sequelize"
dotenv.config()

const PG_USER = process.env.PG_USER
const PG_PASS = process.env.PG_PASS
const PG_URL = process.env.PG_URL
const PG_PORT  = process.env.PG_PORT
const PG_DB = process.env.PG_DB

if(!(PG_URL && PG_PORT && PG_USER && PG_PASS)){
	console.log("Postgres auth is not available!")
	throw new Error("Postgres auth is not available!")
}

const PG_ADR = `postgres://${PG_USER}:${PG_PASS}@${PG_URL}:${PG_PORT}/${PG_DB}`
const sequelize = new Sequelize(PG_ADR)

export { sequelize }
