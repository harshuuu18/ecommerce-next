/** @format */

import initDb from "../../../helpers/initDb";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

initDb();

export default async (req, res) => {
	try {
		await User.find(async (err, u) => {
			await res.status(200).json(u);
		});
	} catch (err) {
		return await res
			.status(401)
			.json({ error: "you must be logged in 2" + err });
	}
};
