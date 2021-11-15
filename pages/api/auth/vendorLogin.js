/** @format */

import { processEnv } from "@next/env";
import initDb from "../../../helpers/initDb";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

initDb();

export default async (req, res) => {
	const { name, email, mobile } = req.body;
	const JwtSecret = process.env.JWTSECRET;

	const sendToken = (User_Id, UserDetails) => {
		const token = jwt.sign({ _id: User_Id }, JwtSecret);
		const { name, email, _id, address, mobile, vendor, role } = UserDetails;
		res.json({
			user: { _id, name, email, token, address, mobile, vendor, role },
		});
	};

	try {
		if (!name || !email || !mobile) {
			return res.status(422).json({ error: "Please add all fields" });
		}

		await User.findOne({ email })
			.then((savedUser) => {
				if (!savedUser) {
					return res.status(404).json({ error: "User not Found" });
				}

				if (savedUser.role == "vendor" || savedUser.role == "admin") {
					return sendToken(savedUser._id, savedUser);
				} else {
					res.status(422).json({ error: "Vendor does not exist!" });
				}
			})
			.catch((err) => console.log(err));
	} catch (err) {
		console.log(err);
	}
};
