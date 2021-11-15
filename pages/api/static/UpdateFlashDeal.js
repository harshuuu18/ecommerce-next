/** @format */
import fs from "fs";
import FlashDeal from "../../../data/FlashDeal.json";

export default async function (req, res) {
	const newData = req.body;
	fs.writeFileSync("data/FlashDeal.json", JSON.stringify(newData));
}
