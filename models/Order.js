/** @format */

import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  cart: {
    type: Array,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  voucher: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  totalitems: {
    type: Number,
    required: true,
  },
  delivered: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  vendors: [String],
});

module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);
