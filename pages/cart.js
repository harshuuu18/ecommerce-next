/** @format */

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import AddToCart from "../helpers/AddToCart";
import RemoveFromCart from "../helpers/RemoveFromCart";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Cart() {
	const [cart, setCart] = useState([]);
	const [user, setUser] = useState([]);
	const [street, setStreet] = useState("");
	const [pin, setPin] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [comment, setComment] = useState("");
	const [voucher, setVoucher] = useState("");
	const [changed, setChanged] = useState("");

	const router = useRouter();
	const TotalPrice = [];

	useEffect(() => {
		var Cart = JSON.parse(localStorage.getItem("items"));
		var User = JSON.parse(localStorage.getItem("user"));
		setCart(Cart);
		if (User) {
			setUser(User);

			const a = User.address;
			if (a) {
				setStreet(a.street);
				setPin(a.pin);
				setCity(a.city);
				setState(a.state);
			}
		}
	}, []);

	const CartChanged = () => {
		var Cart = JSON.parse(localStorage.getItem("items"));

		setCart(Cart);
	};

	const CheckOut = () => {

		if(!street || !pin || !city || !state){
			return console.log("Please update profile")
		}

		var checkOutCart = [];

		var vendors = [...new Map(cart.map((i) => [i.vendor, i])).values()].map(
			(v) => v.vendor,
		);

		vendors.forEach((f, index) => {
			var orders = cart.filter((fn) => fn.vendor === f);
			var id = Date.now() + index;

			checkOutCart.push({ items: orders, vendor: f, id: id, status: "Placed" });
		});

		var d = new Date();
		var orderid = Date.now() + Math.floor(Math.random() * 1881);
		var time = d.toString();
		var date = d.toLocaleDateString();
		var amount = TotalPrice.reduce((a, b) => a + b, 0);

		if (user.length == 0) {
			router.push("/login");
		} else {
			var Data = {
				cart: checkOutCart,
				time,
				payment: "Pending",
				comment,
				voucher,
				amount,
				orderid,
				address: { street, pin, city, state },
				totalitems: cart.length,
				delivered: false,
				date,
			};

			localStorage.setItem("temperory-cart", JSON.stringify(Data));
			router.push("/checkout");
		}
	};

	const CartProduct = ({
		mediaUrl,
		name,
		price,
		quantity,
		url,
		_id,
		vendor,
	}) => {
		return (
			<div className="cartDiv1in">
				<div className="cartImg">
					<div
						className="cartActualImg"
						style={{ backgroundImage: `url(${mediaUrl})` }}
					></div>
				</div>
				<div className="cartDetails">
					<h3>
						{" "}
						<Link href={`/product/${url}`}>
							<a>{name}</a>
						</Link>{" "}
					</h3>
					<div className="cartDetailsWBtn">
						<div className="cartValue">
							<span>
								${price} x {quantity}
							</span>
							<span className="redBold">${parseInt(price * quantity)} </span>
						</div>
						<div className="cartButton">
							<Button
								className="cartButtonv2"
								onClick={() => {
									RemoveFromCart({ _id });
									CartChanged();
								}}
							>
								-
							</Button>
							<span>{quantity}</span>
							<Button
								className="cartButtonv2"
								onClick={() => {
									AddToCart({ _id });
									CartChanged();
								}}
							>
								+
							</Button>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			<Head>
				<title>Cart</title>
				<meta
					name="description"
					content="Shop Quality products online form {Store Name} at best prices with fast delivery"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="cartDiv">
				<div className="cartDiv1">
					{cart.length === 0 ? (
						<h1>Your Cart is empty !</h1>
					) : (
						cart.map(({ mediaUrl, name, price, quantity, url, _id }) => {
							TotalPrice.push(parseInt(price * quantity));
							return (
								<CartProduct
									mediaUrl={mediaUrl}
									name={name}
									price={price}
									quantity={quantity}
									url={url}
									_id={_id}
									key={_id}
								/>
							);
						})
					)}
				</div>
				<div className="cartDiv2">
					<div className="cartTotal">
						<span>Total:</span>
						<main>${TotalPrice.reduce((a, b) => a + b, 0)} </main>
					</div>
					<hr />
					<div className="cartComment">
						<p>Add note</p>
						<br />
						<textarea
							name="comment"
							id=""
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						></textarea>
						<br />
						<p>Voucher</p>
						<br />
						<input
							type="text"
							placeholder="Voucher.."
							value={voucher}
							onChange={(e) => setVoucher(e.target.value)}
						/>
						<br />
						<Button id="VoucherBtn">Add Voucher</Button>
					</div>
					<hr />
					<div className="cartComment">
						<p>Address</p>
						<br />
						<input
							type="text"
							placeholder="Street name"
							value={street}
							onChange={(e) => setStreet(e.target.value)}
						/>
						<input
							type="text"
							placeholder="Pin code"
							defaultValue={pin}
							onChange={(e) => setPin(e.target.value)}
						/>
						<input
							type="text"
							placeholder="City"
							defaultValue={city}
							onChange={(e) => setCity(e.target.value)}
						/>
						<input
							type="text"
							placeholder="State"
							defaultValue={state}
							onChange={(e) => setState(e.target.value)}
						/>
						<br />
						<br />
						<Button
							id="CheckoutBtn"
							onClick={(e) => {
								CheckOut();
							}}
						>
							{" "}
							Checkout{" "}
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
