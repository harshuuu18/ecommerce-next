import initDb from "../../../helpers/initDb";
import User from "../../../models/User";
import Order from "../../../models/Order";
import jwt from "jsonwebtoken";

initDb();

export default async (req, res) => {
  const { authorization } = req.headers;
  const JwtSecret = process.env.JWTSECRET;

  const {
    cart,
    time,
    payment,
    comment,
    voucher,
    amount,
    userid,
    username,
    mobile,
    address,
    totalitems,
    delivered,
    date,
    vendors,
  } = await req.body;

  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in 1" });
  }

  try {
    const token = await authorization.replace("Bearer ", "");

    const { _id } = await jwt.verify(token, JwtSecret);

    var order = new Order({
      cart,
      time,
      payment,
      comment,
      voucher,
      amount,
      userid,
      username,
      mobile,
      address,
      totalitems,
      delivered,
      date,
      vendors,
    });

    order.save().then(() => {
      return res.json({ message: "Order Placed Successfully" });
    });
  } catch (err) {
    return await res
      .status(401)
      .json({ error: "you must be logged in 2" + err });
  }
};
