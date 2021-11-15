/** @format */

export default async function (req, res) {
	const url = "https://mercury-uat.phonepe.com/v4/debit/";
	const options = {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			"X-CALLBACK-URL": "https://www.demoMerchant.com/callback",
		},
	};

	fetch(url, options)
		.then((res) => res.json())
		.then((json) => console.log(json))
		.catch((err) => console.error("error:" + err));
}
