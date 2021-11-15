/** @format */

import initDb from "../../../helpers/initDb";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

initDb();

export default async (req, res) => {
	const { authorization } = req.headers;
	const JwtSecret = process.env.JWTSECRET;
	const { role, UserId } = await req.body;

	if (!authorization) {
		return res.status(401).json({ error: "you must be logged in 1" });
	}
	if (!role || !UserId) {
		return res.status(401).json({ error: "Please provide all details" });
	}

	try {
		const token = await authorization.replace("Bearer ", "");

		const { _id } = await jwt.verify(token, JwtSecret);

		const Admin = await User.findOne({ _id: _id });
		if (Admin.role !== "admin") {
			return res.status(401).json({ error: "UnAuthorized User" });
		}

		if (Admin.role == "admin") {
			await User.findOne({ _id: _UserId }, async (err, u) => {
				if (!u) {
					return res.status(404).json({ error: "User not exist" });
				}
				u.role = role;
				await u.save().then(async (newUser) => {
					return await res.status(200).json({ user: newUser });
				});
			});
		}
	} catch (err) {
		return await res
			.status(401)
			.json({ error: "you must be logged in 2" + err });
	}
};
