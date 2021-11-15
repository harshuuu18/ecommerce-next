/** @format */

import initDb from "../../../helpers/initDb";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

initDb();

export default async (req, res) => {
	const { authorization } = req.headers;
	const JwtSecret = process.env.JWTSECRET;

	if (!authorization) {
		return res.status(401).json({ error: "you must be logged in 1" });
	}

	try {
		const token = await authorization.replace("Bearer ", "");

		const { _id } = await jwt.verify(token, JwtSecret);
		const VendorName = await User.findById(_id).then((r) => r.vendor);

		await User.find()
			.then((r) => {
				var newString = r.map(
					({ order, role, vendor, _id, name, email, mobile, address }) => {
						var nOrder = order.map(
							({
								cart,
								time,
								date,
								payment,
								comment,
								voucher,
								amount,
								orderid,
								address,
								totalitems,
								delivered,
							}) => {
								var NCart = cart.filter((c) => c.vendor == VendorName);

								return {
									cart: NCart,
									time,
									date,
									payment,
									comment,
									voucher,
									amount,
									orderid,
									address,
									totalitems,
									delivered,
								};
							},
						);
						return {
							order: nOrder,
							role,
							vendor,
							_id,
							name,
							email,
							mobile,
							address,
						};
					},
				);
				res.status(200).json(newString);
			})
			.catch((err) => console.log(err));
	} catch (err) {
		return await res
			.status(401)
			.json({ error: "you must be logged in 2" + err });
	}
};
