/** @format */

import Head from "next/head";
import Carousel from "../components/Carousel";
import Carousel2 from "../components/Carousel2";
import NewArrivals from "../components/NewArrivals";
import { useEffect } from "react";
import { useState } from "react";
import Slider from "../components/Slider";
import Banner from '../data/Banner.json'
import FlashDeal from '../data/FlashDeal.json'

export default function Home() {
	
	

	return (
		<>
			<Head>
				<title>Best Online shopping store in India</title>
				<meta
					name="description"
					content="Shop Quality products online form {Store Name} at best prices with fast delivery"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* <Banner imageData={data.Banner} /> */}
			<Slider dataSlider={Banner} />

			<NewArrivals />
			<Carousel data={FlashDeal} />
			<br />
			<Carousel2 />
			<br />
		</>
	);
}

