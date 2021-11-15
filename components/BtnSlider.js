/** @format */

import React from "react";

export default function BtnSlider({ direction, moveSlide }) {
	return (
		<button
			onClick={moveSlide}
			className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
		>
			<img
				src={
					direction === "next"
						? "https://raw.githubusercontent.com/Ziratsu/Slider-React/8d20927f5b19d9261b49ae717fc7957e5d66080f/src/Components/Slider/icons/right-arrow.svg"
						: "https://raw.githubusercontent.com/Ziratsu/Slider-React/8d20927f5b19d9261b49ae717fc7957e5d66080f/src/Components/Slider/icons/left-arrow.svg"
				}
			/>
		</button>
	);
}
