/** @format */

import Button from "@material-ui/core/Button";

import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import IconButton from "@material-ui/core/IconButton";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useEffect } from "react";

export default function TopNav() {
	const router = useRouter();
	const [search, setSearch] = useState("");
	const [cartLen, setCartLen] = useState(0);

	useEffect(() => {
		var Cart = JSON.parse(localStorage.getItem("items"));
		if (Cart) {
			setCartLen(Cart.length);
		}
	});

	const data = [
		{
			link: "/shop",
			src: "/flash512.png",
			checked: "/flash512r.png",
			name: "Shop",
		},
		{
			link: "/cart",
			src: "/bag512.png",
			checked: "/bag512r.png",
			name: "Cart",
		},
		{
			link: "/account",
			src: "/user512.png",
			checked: "/user512r.png",
			name: "Account",
		},
	];

	const SearchProduct = (e) => {
		e.preventDefault();
		if (!search) {
			return;
		}
		const search1 = search.split(" ");
		const search2 = search1.join("+");
		router.push(`/search/${search2}`);
	};

	return (
		<nav className="TopNav">
			<div className="logo" id="logoHide" >
				<Link href="/">
					<a>
						<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrfdDpK8FnYmt1TU-ysbghi7f3pH1jNyE2uA&usqp=CAU" alt="" width="130px" />
					</a>
				</Link>
			</div>
			<form className="SearchBox" onSubmit={(e) => SearchProduct(e)}>
				<input
					type="text"
					placeholder="Redmi Note 10"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Button className="SearchButton">
					<SearchRoundedIcon></SearchRoundedIcon>
				</Button>
			</form>

			<div className="logo TopNavButton">
				{data.map(({ link, src, checked, name }, index) => {
					return (
						<IconButton
							component="span"
							width="100px"
							key={index}
							className="desktopNavBtn"
						>
							<Link href={link}>
								<a>
									{name === "Cart" ? <section>{cartLen}</section> : ""}
									<img
										src={router.pathname === link ? checked : src}
										alt=""
										width="32px"
									/>
								</a>
							</Link>
						</IconButton>
					);
				})}
			</div>
		</nav>
	);
}
