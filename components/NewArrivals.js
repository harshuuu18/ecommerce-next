/** @format */

import Link from "next/link";

export default function NewArrivals() {
	return (
		<div className="newArrival">
			<h2>
				<img src="/new512.png" alt="" width="32px" />
				{"  "}New Arrivals
			</h2>

			<div className="newArrivalDiv">
				<div className="newArrivalProduct">
					<Link href="/">
						<a>
							<div className="newArrivalProductIn"></div>
							<span>Hello</span>
						</a>
					</Link>
				</div>

				<div className="newArrivalProduct">
					<Link href="/">
						<a>
							<div className="newArrivalProductIn"></div>
							<span>Hello</span>
						</a>
					</Link>
				</div>

				<div className="newArrivalProduct">
					<Link href="/">
						<a>
							<div className="newArrivalProductIn"></div>
							<span>Hello</span>
						</a>
					</Link>
				</div>

				<div className="newArrivalProduct">
					<Link href="/">
						<a>
							<div className="newArrivalProductIn"></div>
							<span>Hello</span>
						</a>
					</Link>
				</div>

				<div className="newArrivalProduct">
					<Link href="/">
						<a>
							<div className="newArrivalProductIn"></div>
							<span>Hello</span>
						</a>
					</Link>
				</div>

				<div className="newArrivalProduct">
					<Link href="/">
						<a>
							<div className="newArrivalProductIn"></div>
							<span>Hello</span>
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
}
