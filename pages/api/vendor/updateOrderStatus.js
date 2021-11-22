/** @format */

import initDb from "../../../helpers/initDb";
import User from "../../../models/User";
import Order from "../../../models/Order";
import jwt from "jsonwebtoken";

initDb();

export default async (req, res) => {
  const { authorization } = req.headers;
  const JwtSecret = process.env.JWTSECRET;
  const id = req.body._id;
  const OrderStatus = req.body.status;
  const cartId = req.body.cartId;

  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in 1" });
  }
  if (!id || !OrderStatus || !cartId) {
    return res.status(401).json({ error: "Please provide all details" });
  }

  try {
    const token = await authorization.replace("Bearer ", "");

    const { _id } = await jwt.verify(token, JwtSecret);

    await User.findOne({ _id: _id }).then((u, err) => {
      if (u.role == "vendor" || u.role == "admin") {
        Order.findOne({ _id: id }, (erro, uv) => {
          const CartIndex = uv.cart.map((c) => c.id).indexOf(cartId);
          uv.markModified("cart");
          uv.cart[CartIndex].status = OrderStatus;
          uv.save()
            .then((suc) =>
              res.status(200).json({ message: "Update Successfully" })
            )
            .catch((err) => res.status(400).json({ err: "not modified" }));
        });
      }
    });
  } catch (err) {
    return await res
      .status(401)
      .json({ error: "you must be logged in 2" + err });
  }
};
