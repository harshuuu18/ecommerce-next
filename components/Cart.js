import React, { useState } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Button from "@material-ui/core/Button";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Link from "next/link";

function Cart({ CartData }) {
  const { id, items, status, vendor } = CartData;
  const [cdropped, setCDropped] = useState(false);
  return (
    <div className="cartDiv1in cdivln">
      <div className="cartImg">
        <div
          className="cartActualImg"
          style={{ backgroundImage: `url(${items[0].mediaUrl})` }}
        ></div>
      </div>

      <div className="cartDetails">
        <h3> Vendor - {vendor} </h3>
        <div className="cartDetailsWBtn">
          <div className="cartValue cvl">
            <span>Total Item: {items.length}</span>
            <span>
              Status:<span className="redBold"> {status} </span>
            </span>
          </div>
          <div className="cartButton">
            <Button
              className="cartButtonv2"
              onClick={() => {
                if (!cdropped) {
                  setCDropped(true);
                } else {
                  setCDropped(false);
                }
              }}
            >
              {!cdropped ? (
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
        id={cdropped ? "showDetail" : "hideDetails"}
      >
        {items.map(({ mediaUrl, name, price, quantity, url, vendor, _id }) => {
          return (
            <div className="cartDiv1in">
              <div className="cartImg">
                <div
                  className="cartActualImg"
                  style={{ backgroundImage: `url(${mediaUrl})` }}
                ></div>
              </div>
              <div className="cartDetails cdils">
                <h3>
                  <Link href={`/product/${url}`}>
                    <a>{name}</a>
                  </Link>{" "}
                </h3>
                <div className="cartDetailsWBtn">
                  <div className="cartValue">
                    <span>
                      ${price} x {quantity}
                    </span>
                    <span className="redBold"> {price * quantity} </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cart;
