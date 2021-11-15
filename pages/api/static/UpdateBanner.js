/** @format */
import fs from "fs";
import Banner from "../../../data/Banner.json";

export default async function (req, res) {
	const newData = req.body;
	if (!newData) {
		return res.json({ error: "Please Provide Data" });
	}
	fs.writeFileSync("data/Banner.json", JSON.stringify(newData));
}
