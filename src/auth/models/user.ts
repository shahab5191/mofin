import { Model, DataTypes } from "sequelize"
import { sequelize } from "../../db/connect"

export class User extends Model {
	declare id: string;
	declare username: string;
	declare email: string;
	declare password: string;
	declare salt: string;
	declare role: number;
}

User.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		email: {type: DataTypes.STRING },
		username: {type: DataTypes.STRING },
		password: {type: DataTypes.STRING },
		salt: {type: DataTypes.STRING },
		role: {type: DataTypes.INTEGER }
	},
	{
		sequelize,
		modelName:"User"
	}
)

User.addScope("withNoPass", { attributes: { exclude: ["password", "salt"] } })
