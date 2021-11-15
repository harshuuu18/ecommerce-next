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
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "25ch",
		},
	},
}));

export default function cart() {
	const classes = useStyles();
	const [cart, setCart] = useState([]);
	const [order, setOrder] = useState("");
	const [user, setUser] = useState([]);
	const [address, setAddress] = useState({});
	const [street, setStreet] = useState("");
	const [pin, setPin] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [changed, setChanged] = useState("");
	const options = {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	};

	const router = useRouter();
	const TotalPrice = [];

	useEffect(() => {
		var Cart = JSON.parse(localStorage.getItem("items"));
		var User = JSON.parse(localStorage.getItem("user"));
		if (!User) {
			router.push("/login");
		} else {
			setCart(Cart);
			setUser(User);
			const a = User.address;
			if (a) {
				setAddress(
					User.address
						? User.address
						: { street: "", pin: "", city: "", state: "" },
				);

				setStreet(a.street);
				setPin(a.pin);
				setCity(a.city);
				setState(a.state);
			}

			fetch("/api/auth/checkOrder", {
				method: "get",
				headers: {
					"Content-Type": "application/json",
					Authorization:
						"Bearer " + JSON.parse(localStorage.getItem("user")).token,
				},
			})
				.then((r) => {
					r.json().then((d) => {
						
						setOrder(d.order);
					});
				})
				.catch((err) => console.log(err));
		}
	}, []);

	const CartChanged = () => {
		var Cart = JSON.parse(localStorage.getItem("items"));

		setCart(Cart);
	};

	const updateAddress = async () => {
		if (!street || !pin || !city || !state) {
			return toast.warn("All fields are mendatory!", options);
		}

		try {
			const response = await fetch(`/api/auth/updateAddress`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
					Authorization: user.token,
				},
				body: JSON.stringify({ street, pin, city, state }),
			});

			const Data = await response.json();
			if (Data.error) {
				toast.error(Data.error, options);
			} else {
				toast.success("update", options);
				user.address = { street, pin, city, state };
				localStorage.setItem("user", JSON.stringify(user));
				router.reload();
			}
		} catch (err) {
			console.log(err);
		}
	};

	const CartProduct = ({
		cart,
		time,
		payment,
		comment,
		voucher,
		amount,
		orderid,
		address,
		totalitems,
		delivered,
	}) => {
		const [dropped, setDropped] = useState(false);
		return (
			<div className="cartDiv1in">
				<div className="cartImg">
					<div
						className="cartActualImg"
						style={{ backgroundImage: `url(${cart ? cart[0].items[0].mediaUrl : ""})` }}
					></div>
				</div>

				<div className="cartDetails">
					<h3> #{orderid} </h3>
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
							<b>Amount</b>: {amount}{" "}
						</span>
						<span>
							<b>Status</b>: {status ? "Delivered" : "Ongoing"}{" "}
						</span>
						<span>
							<b>comment</b>: {comment}{" "}
						</span>
						<span>
							<b>voucher</b>: {voucher}{" "}
						</span>
					</div>

					<div className="cdinfo">
						<span>
							<b>Address</b>: {address.street},{address.pin},{address.city},
							{address.state}{" "}
						</span>
					</div>

					{cart.map(({ id, items, status, vendor }) => {
						const [cdropped, setCDropped] = useState(false);
						return (
							<div className="cartDiv1in cdivln" key={id}>
								<div className="cartImg">
									<div
										className="cartActualImg"
										style={{ backgroundImage: `url(${items[0].mediaUrl})` }}
									></div>
								</div>

								<div className="cartDetails">
									<h3> {vendor} </h3>
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
									{items.map(
										({
											mediaUrl,
											name,
											price,
											quantity,
											url,
											vendor,
											_id,
											status,
										}) => {
											return (
												<div className="cartDiv1in" key={_id}>
													<div className="cartImg">
														<div
															className="cartActualImg"
															style={{ backgroundImage: `url(${mediaUrl})` }}
														></div>
													</div>
													<div className="cartDetails cdils">
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
																<span className="redBold">
																	${parseInt(price * quantity)}{" "}
																</span>
															</div>
														</div>
													</div>
												</div>
											);
										},
									)}
								</div>
							</div>
						);
					})}
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
					{order.length > 0 ? 
					
						order.map(
							({
								cart,
								time,
								payment,
								comment,
								voucher,
								amount,
								orderid,
								address,
								totalitems,
								delivered,
							}) => {
								console.log(order.length)
								return (
									<CartProduct
										address={address}
										amount={amount}
										comment={comment}
										payment={payment}
										status={status}
										voucher={voucher}
										cart={cart}
										time={time}
										orderid={orderid}
										totalitems={totalitems}
										delivered={delivered}
										key={orderid}
									/>
								);
							},
						)
						:
						<h1>You haven't ordered anything !</h1>
					}
				</div>
				<div className="cartDiv2" style={{ height: "600px" }}>
					<div className="cartTotal">
						<main>Hello {user.name}!</main>
					</div>
					<hr />
					<div className="cartComment">
						<p>Your Details-</p>
						<br />
						{user.email}
						<br />
						{address.street}
						<br />
						{address.pin}
						<br />
						{address.city}
						<br />
						{address.state}
					</div>
					<hr />
					<div className="cartComment">
						<p>Update your Address</p>
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
								updateAddress();
							}}
						>
							{" "}
							Update{" "}
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
