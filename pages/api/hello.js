/** @format */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import initDb from "../../helpers/initDb";
import { GoogleSpreadsheet } from "google-spreadsheet";
import Cred from "../../helpers/cred.json";

export default async function handler(req, res) {
	const RESPONSES_SHEET_ID = "1maRrBTykz-Ak4mVxcHygLxXNsM4ISMJh6WzOHSaOEko";
	const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);

	try {
		await doc.useServiceAccountAuth({
			client_email: Cred.client_email,
			private_key: Cred.private_key,
		});

		await doc.loadInfo();
		let sheet = await doc.sheetsByTitle["Sample"];
		let image = await doc.sheetsByTitle["Banner"];
		let carousel = await doc.sheetsByTitle["Flast Deal"];

		let rows = await sheet.getRows();
		let imageData = await image.getRows();
		let carouselData = await carousel.getRows();

		const row = rows.map((i) => {
			return {
				name: i.name,
				price: i.price,
				brand: i.brand,
				vendor: i.vendor,
			};
		});

		const images = await imageData.map((i) => {
			return {
				original: i.original,
				thumbnail: i.thumbnail,
				link: i.link,
			};
		});

		const images1 = await carouselData.map((i) => {
			return {
				name: i.name,
				price: i.price,
				url: i.url,
				_id: i._id,
				mediaUrl: i.mediaUrl,
			};
		});

		await res.status(200).send({ images, deal: images1 });
	} catch (err) {
		console.log(err);
	}
}
