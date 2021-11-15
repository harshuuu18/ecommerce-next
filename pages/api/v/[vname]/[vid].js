/** @format */

import initDb from "../../../../helpers/initDb";
import Product from "../../../../models/Product";
import VendorData from '../../../../data/VendorData.json'
import fs from 'fs'

initDb();

export default async (req, res) => {
	const { vname, vid } = req.query;
	
	// return fs.writeFileSync("data/VendorData.json",JSON.stringify(VendorData))

	try {
		const Products = await Product.find();
		const Details = VendorData[vname+" "+vid]
		const FilteredProducts = Products.filter(
			(pf) => pf.vendor == vname && pf.vid == vid,
		);
		res.status(200).json({FilteredProducts,Details});
	} catch (err) {
		console.log(err);
	}
};
