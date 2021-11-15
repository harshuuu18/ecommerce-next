/** @format */

import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	brand: {
		type: String,
	},
	vendor: {
		type: String,
	},
	description: {
		type: String,
		required: true,
	},
	mediaUrl: {
		type: Array,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	vid: {
		type: String,
	},
});

module.exports =
	mongoose.models.Product || mongoose.model("Product", ProductSchema);
