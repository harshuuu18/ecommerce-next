/** @format */

import initDb from "../../../helpers/initDb";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

initDb();

export default async (req, res) => {
	const { authorization } = req.headers;
	const JwtSecret = process.env.JWTSECRET;
	const { street, pin, city, state } = await req.body;

	if (!authorization) {
		return res.status(401).json({ error: "you must be logged in 1" });
	}
	if (!street || !pin || !city || !state) {
		return res.status(401).json({ error: "Please provide all details" });
	}

	try {
		const token = await authorization.replace("Bearer ", "");

		const { _id } = await jwt.verify(token, JwtSecret);

		await User.findOne({ _id: _id }, async (err, u) => {
			u.address = { street, pin, city, state };
			await u.save().then(async (newUser) => {
				return await res.status(200).json({ user: newUser });
			});
		});
	} catch (err) {
		return await res
			.status(401)
			.json({ error: "you must be logged in 2" + err });
	}
};
