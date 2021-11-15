/** @format */

import Button from "@material-ui/core/Button";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import validator from "validator";

export default function LoginModal({ styles }) {
	const StyleRef = useRef();
	const router = useRouter();
	const [order, setOrder] = useState({});
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [mobile, setMobile] = useState("");
	const [otp, setOtp] = useState("");
	const [gOtp, setGOtp] = useState();
	const [verified, setVerified] = useState(false);
	const [user, setUser] = useState([]);
	const options = {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	};
	const {
		time,
		payment,
		comment,
		voucher,
		amount,
		orderid,
		address,
		totalitems,
		delivered,
		date,
	} = order;

	useEffect(() => {
		var Order = JSON.parse(localStorage.getItem("temperory-cart"));
		var User = JSON.parse(localStorage.getItem("user"));
		setOrder(Order);
		if (User) {
			setUser(User);
		}
	}, []);

	const CheckOut = async () => {
		if (!order) {
			return toast.error("You Cart is empty", options);
		}

		try {
			toast.info("Placing Your Order", options);
			console.log(order);
			const response = await fetch(`/api/auth/checkOut`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + user.token,
				},
				body: JSON.stringify(order),
			});

			const Data = await response.json();
			if (Data.message) {
				toast.success("Order placed successfully", options);
				localStorage.removeItem("temperory-cart");
				localStorage.removeItem("items");
				router.push("/account");
			} else {
				toast.error(Data.error, options);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="modal" style={styles}>
			<form className="login-div" style={{ height: "80%" }}>
				<Button
					id="login-back"
					onClick={(e) => {
						router.back();
					}}
				>
					X
				</Button>

				<div className="login-heading">
					<h2>Welcome to Ecommerce</h2>
					<h5>Login with Email & Mobile </h5>
				</div>

				<div className="checkout-detail">
					<span>
						<img src="/bag512.png" alt="" width="15px" />
						Total Item: {totalitems}
					</span>

					<span>
						<img src="/rupee.png" alt="" width="15px" />
						Total price: {amount}
					</span>
				</div>

				<div className="checkout-detail">
					<span>
						<img src="/user512.png" alt="" width="15px" />
						{user.name}
					</span>

					<span>
						<img src="/user512.png" alt="" width="15px" />
						{user.email}
					</span>

					<span>
						<img src="/home512.png" alt="" width="15px" />
						{address ? address.street : ""}, {"  "}
						{address ? address.city : ""},{address ? address.state : ""},
						{address ? address.pin : ""}
					</span>
				</div>

				<div className="checkout-detail">
					<span>
						<img src="/flash512.png" alt="" width="15px" />
						Note: {comment}
					</span>

					<span>
						<img src="/flash512.png" alt="" width="15px" />
						Discount: {voucher}
					</span>
				</div>

				<div className="checkout-detail">
					<span>
						<img src="/rupee.png" alt="" width="15px" />
						Payment Status: {payment}
					</span>
				</div>

				<br />
				<Button id="login-button-v">Confirm Payment</Button>
				<br />
				<Button id="login-button" onClick={() => CheckOut()}>
					Order
				</Button>
			</form>
		</div>
	);
}
