/** @format */

import initDb from "../../../helpers/initDb";
import Product from "../../../models/Product";
import jwt from "jsonwebtoken";
import User from "../../../models/User";

initDb();

export default async (req, res) => {
	// const {name,price,description,mediaUrl} = req.body
	const { authorization } = req.headers;
	const JwtSecret = process.env.JWTSECRET;
	const { name, price, brand, vendor, description, mediaUrl, productId } =
		req.body;

	if (!authorization) {
		return res.status(401).json({ error: "you must be logged in 1" });
	}

	try {
		if (!name || !price || !description || !mediaUrl || !productId) {
			return res.status(422).json({ error: "Please add all the fields" });
		}
		const token = await authorization.replace("Bearer ", "");

		const { _id } = await jwt.verify(token, JwtSecret);

		await User.findOne({ _id: _id }, async (err, u) => {
			if (u.role == "vendor" || u.role == "admin") {
				const url1 = name.split(" ");
				const url = url1.join("-").toLowerCase();

				Product.findOne({ _id: productId }, async (err2, p) => {
					if (err2) return res.json({ error: "not found" });

					p.name = name;
					p.price = price;
					p.brand = brand;
					p.vendor = vendor;
					p.description = description;
					p.mediaUrl = mediaUrl;
					p.url = url + "-" + _id;

					await p.save().then(async (newProduct) => {
						return await res.status(200).json({ product: newProduct });
					});
				});
			} else {
				return res
					.status(402)
					.json({ error: "You are not allowed to udpate product" });
			}
		});
	} catch (err) {
		res.status(500).json({ error: "internal server error" });
		console.log(err);
	}
};
