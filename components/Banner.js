/** @format */

import { useRouter } from "next/router";
import ImageGallery from "react-image-gallery";

const images = [
	{
		original: "https://picsum.photos/id/1018/1500/600/",
		thumbnail: "https://picsum.photos/id/1018/250/150/",
		link: "/deal1",
	},
	{
		original: "https://picsum.photos/id/1015/1500/600/",
		thumbnail: "https://picsum.photos/id/1015/250/150/",
		link: "/deal2",
	},
	{
		original: "https://picsum.photos/id/1019/1500/600/",
		thumbnail: "https://picsum.photos/id/1019/250/150/",
		link: "/deal3",
	},
];

export default function Banner({ imageData }) {
	const router = useRouter();
	const RedirectDeal = (e) => {
		const url = imageData.find((i) => i.original == e.target.src).link;

		router.push(url);
	};

	return (
		<>
			<div className="banner">
				<ImageGallery
					items={imageData}
					onClick={(e) => {
						RedirectDeal(e);
					}}
					lazyLoad
					showThumbnails={false}
					showNav={false}
					showFullscreenButton={false}
					autoPlay={true}
					showPlayButton={false}
				/>
			</div>
		</>
	);
}
