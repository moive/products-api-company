import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
	username: string;
	email: string;
	password: string;
	roles: Array<String>;
}

export interface UserModel extends Model<IUser> {
	encryptPassword: (password: string) => Promise<String>;
	comparePassword: (
		password: string,
		receivedPassword: string
	) => Promise<Boolean>;
}

const userSchema = new Schema<IUser, UserModel>(
	{
		username: {
			type: String,
			unique: true,
		},
		email: {
			type: String,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		roles: [
			{
				ref: "Role",
				type: Schema.Types.ObjectId,
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

userSchema.static("encryptPassword", async (password: string) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
});

userSchema.static(
	"comparePassword",
	async (password: string, receivedPassword: string) => {
		return await bcrypt.compare(password, receivedPassword);
	}
);

export default model<IUser, UserModel>("User", userSchema);
