/** @format */

import Product from "./Product";

export default function Carousel({ data,heading }) {
	return (
		<div className="CarouselDiv">
			<h2>
				<img src="/flash512r.png" alt="" width="32px" />
				{"  "}{heading?heading:"Flash Deals"}
			</h2>

			<div className="actualCarousel">
				{data
					? data.map(({ name, price, url, _id, mediaUrl }, index) => {
							return (
								<Product
									name={name}
									price={price}
									src={mediaUrl}
									url={`/product/${url}`}
									key={index}
								/>
							);
					  })
					: ""}
			</div>
		</div>
	);
}
