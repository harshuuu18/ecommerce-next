/** @format */

import initDb from "../../../../helpers/initDb";
import Product from "../../../../models/Product";

initDb();

export default async (req, res) => {
	const { vendor } = req.body;
	try {
		const Products = await Product.find();
		const vendorProduct = await Products.filter((pf) => pf.vendor == vendor);
		res.status(200).send(vendorProduct.length);
	} catch (err) {
		console.log(err);
	}
};
