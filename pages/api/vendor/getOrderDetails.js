/** @format */

import initDb from "../../../helpers/initDb";
import User from "../../../models/User";
import Order from "../../../models/Order";
import jwt from "jsonwebtoken";

initDb();

export default async (req, res) => {
  const { authorization } = req.headers;
  const JwtSecret = process.env.JWTSECRET;

  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in 1" });
  }

  try {
    const token = await authorization.replace("Bearer ", "");

    const { _id } = await jwt.verify(token, JwtSecret);
    const VendorName = await User.findById(_id).then((r) => r.vendor);

    if (!VendorName) {
      return res.status(401).json({ error: "you must be logged in 2" });
    }

    const data = await Order.find({ vendors: VendorName });

    if (!data) {
      return res.status(401).json({ error: "No Order yet" });
    }

    const newData = await data.map((orders) => {
      const vendorCart = orders.cart.filter(
        (carts) => carts.vendor == VendorName
      );
      orders.cart = vendorCart;
      return orders;
    });
    return res.json(newData);
  } catch (err) {
    return await res
      .status(401)
      .json({ error: "you must be logged in 2" + err });
  }
};
