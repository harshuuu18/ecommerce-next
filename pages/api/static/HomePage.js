/** @format */
import Banner from "../../../data/Banner.json";
import FlashDeal from "../../../data/FlashDeal.json";

export default async function (req, res) {
	res.status(200).json({ Banner, FlashDeal });
}
