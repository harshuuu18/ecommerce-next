/** @format */

module.exports = {
	reactStrictMode: true,
	env: {
		JWTSECRET: process.env.JWTSECRET,
		BASE_URL: process.env.BASE_URL,
	},
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
};
