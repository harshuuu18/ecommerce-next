/** @format */

import React, { useState } from "react";
import BtnSlider from "./BtnSlider";
import Link from 'next/link'
import { useEffect } from "react";

export default function Slider({ dataSlider }) {
	const [slideIndex, setSlideIndex] = useState(1);

	const nextSlide = () => {
		if (slideIndex !== dataSlider.length) {
			setSlideIndex(slideIndex + 1);
		} else if (slideIndex === dataSlider.length) {
			setSlideIndex(1);
		}
	};

	const prevSlide = () => {
		if (slideIndex !== 1) {
			setSlideIndex(slideIndex - 1);
		} else if (slideIndex === 1) {
			setSlideIndex(dataSlider.length);
		}
	};

	const moveDot = (index) => {
		setSlideIndex(index);
	};
	var i = 0;

	return (
		<div className="container-slider">
			{dataSlider
				? dataSlider.map((obj, index) => {
						return (
							<Link href={obj.link} >
								<a>
							<div
								key={index}
								className={
									slideIndex === index + 1 ? "slide active-anim" : "slide"
								}
								>
								
								<img src={obj.original} />
							</div>
							</a>
							</Link>
						);
				  })
				: ""}
			<BtnSlider moveSlide={nextSlide} direction={"next"} />
			<BtnSlider moveSlide={prevSlide} direction={"prev"} />

			<div className="container-dots">
				{Array.from({ length: 5 }).map((item, index) => (
					<div
						key={index}
						onClick={() => moveDot(index + 1)}
						className={slideIndex === index + 1 ? "dot active" : "dot"}
					></div>
				))}
			</div>
		</div>
	);
}
