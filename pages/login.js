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
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [mobile, setMobile] = useState("");
	const [otp, setOtp] = useState("");
	const [gOtp, setGOtp] = useState();
	const [verified, setVerified] = useState(false);
	const options = {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	};

	useEffect(() => {
		if (otp == gOtp) {
			toast.success("OTP Verified", options);
			setVerified(true);
		}
	}, [otp]);

	const SendOtp = async () => {
		if (!email || !name || !mobile) {
			return toast.warn("Please Add All Fields", options);
		}
		if (!validator.isEmail(email)) {
			return toast.error("Wrong Email Address", options);
		}
		if (!validator.isMobilePhone(mobile)) {
			return toast.error("Wrong Mobile No.", options);
		}
		try {
			toast.info(" Sending OTP", options);
			const GenerateOtp = Math.floor(100000 + Math.random() * 900000);
			setGOtp(GenerateOtp);

			const data = {
				email: email,
				otp: GenerateOtp,
			};

			const response = await fetch(`/api/auth/mail`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const Data = await response.json();
			if (Data.message) {
				toast.success("OTP Sent", options);
			} else {
				toast.error(Data.error, options);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const Login = async () => {
		if (!verified) {
			return toast.error("OTP not verified yet!", options);
		}

		try {
			toast.info("Logging you in", options);

			const data = {
				name,
				email,
				mobile,
			};

			const response = await fetch(`/api/auth/login`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const Data = await response.json();
			if (Data.user) {
				toast.success("Logged in successfully", options);
				localStorage.setItem("user", JSON.stringify(Data.user));
				router.back();
			} else {
				toast.error(Data.error, options);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="modal" style={styles}>
			<form className="login-div">
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
					<h5>Login with Email & Mobile</h5>
				</div>

				<div className="login-input-div">
					<span>Name</span>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>

				<div className="login-input-div">
					<span>Email</span>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className="login-input-div">
					<span>Phone</span>
					<input
						type="text"
						value={mobile}
						onChange={(e) => setMobile(e.target.value)}
					/>
				</div>

				<div className="login-otp-div">
					<div>
						<span>OTP</span>
						<input
							type="number"
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
						/>
					</div>
					<Button
						id={verified ? "login-otp-verified" : "login-otp"}
						onClick={() => SendOtp()}
					>
						{verified ? "Verified" : "Send OTP"}
					</Button>
				</div>

				<Button id="login-button" onClick={() => Login()}>
					Login
				</Button>
			</form>
		</div>
	);
}
