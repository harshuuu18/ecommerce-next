import { useState } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Button from "@material-ui/core/Button";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Cart from "./Cart";

export default function CartProduct({ OrderData }) {
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
    _id,
  } = OrderData;
  console.log(cart ? cart : "");
  const [dropped, setDropped] = useState(false);
  return (
    <div className="cartDiv1in">
      <div className="cartImg">
        <div
          className="cartActualImg"
          style={{
            backgroundImage: `url(${cart ? cart[0].items[0].mediaUrl : ""})`,
          }}
        ></div>
      </div>

      <div className="cartDetails">
        <h3> #{_id} </h3>
        <div className="cartDetailsWBtn">
          <div className="cartValue cvl">
            <span>Total Item: {totalitems}</span>
            <span>
              Status:
              <span className="redBold">
                {" "}
                {delivered ? "Delivered" : "Ongoing"}{" "}
              </span>
            </span>
          </div>
          <div className="cartButton">
            <Button
              className="cartButtonv2"
              onClick={() => {
                if (!dropped) {
                  setDropped(true);
                } else {
                  setDropped(false);
                }
              }}
            >
              {!dropped ? (
                <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
              ) : (
                <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div
        className="detailedOrderDiv"
        id={dropped ? "showDetail" : "hideDetails"}
      >
        <div className="cdinfo">
          <span>
            <b>Amount</b>: {amount}
          </span>
          <span>
            <b>Status</b>: {delivered ? "Delivered" : "Ongoing"}{" "}
          </span>
          <span>
            <b>comment</b>: {comment}
          </span>
          <span>
            <b>voucher</b>: {voucher}
          </span>
        </div>

        <div className="cdinfo">
          <span>
            <b>Address</b>:
            {`${address.street}, ${address.city}, ${address.state} - ${address.pin}`}
          </span>
        </div>

        {cart
          ? cart.map((CartData) => {
              return <Cart CartData={CartData} />;
            })
          : ""}
      </div>
    </div>
  );
}
