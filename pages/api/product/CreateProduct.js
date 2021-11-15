/** @format */

import initDb from "../../../helpers/initDb";
import Product from "../../../models/Product";
import jwt from "jsonwebtoken";

initDb();

const Data = {
	name: "Samsung A 5",
	description: "Shop Online",
	price: 299,
	mediaUrl:
		"https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_a5be7c1651a2673a6010d0366927395d/autocad.jpeg",
};

export default async (req, res) => {
	// const {name,price,description,mediaUrl} = req.body
	const { authorization } = req.headers;
	const JwtSecret = process.env.JWTSECRET;
	const { name, price, brand, vendor, description, mediaUrl } = req.body;

	if (!authorization) {
		return res.status(401).json({ error: "you must be logged in 1" });
	}

	try {
		if (!name || !price || !description || !mediaUrl) {
			return res.status(422).json({ error: "Please add all the fields" });
		}
		const token = await authorization.replace("Bearer ", "");

		const { _id } = await jwt.verify(token, JwtSecret);

		await User.findOne({ _id: _id }, async (err, u) => {
			if (u.role == "vendor" || u.role == "admin") {
				const url1 = name.split(" ");
				const url = url1.join("-").toLowerCase() + "-" + _id;
				const vid = _id;

				const product = await new Product({
					name,
					price,
					brand,
					vendor,
					description,
					mediaUrl,
					url: url,
					vid,
				}).save();
				res.status(201).json(product);
			} else {
				return res
					.status(402)
					.json({ error: "You are not allowed to create product" });
			}
		});
	} catch (err) {
		res.status(500).json({ error: "internal server error" });
		console.log(err);
	}
};
