/** @format */

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	mobile: {
		type: String,
		required: true,
	},
	address: {
		type: Object,
	},
	order: {
		type: Array,
	},
	role: {
		type: String,
		default: "User",
	},
	vendor: {
		type: String,
		unique: true,
		default: "",
	},
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
