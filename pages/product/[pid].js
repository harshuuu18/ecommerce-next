import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import Carousel from "../../components/Carousel";
import AddToCart from "../../helpers/AddToCart";
import { useState } from "react";
import { Link } from "@mui/material";

export default function pid({ data }) {
  const router = useRouter();
  const { pid } = router.query;
  const { _id, name, url, mediaUrl, price, brand, vendor, description, vid } =
    data;
  const [currImage, setCurrImage] = useState(mediaUrl[0]);

  return (
    <>
      {!mediaUrl ? (
        <h1>Product not found</h1>
      ) : (
        <>
          <div className="detailPage">
            <div className="detailPageLeft">
              {/* <img src="https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fheadphone.png&w=640&q=75" width="300px" alt="" /> */}

              <img
                src={currImage ? currImage : mediaUrl[0]}
                width="300px"
                alt=""
              />
              <div className="ProductImageS">
                {mediaUrl
                  ? mediaUrl.map((l, i) => {
                      return (
                        <span
                          style={{
                            backgroundImage: `url(${l})`,
                            borderColor: `${currImage == l ? "#f94144" : ""}`,
                          }}
                          onClick={() => setCurrImage(l)}
                          key={i}
                        ></span>
                      );
                    })
                  : ""}
              </div>
            </div>
            <div className="detailPageRight">
              <h2>{name}</h2>
              <br />
              <span>
                Brand: <h4>{brand}</h4>
              </span>
              <br />
              <span>
                Vendor:{" "}
                <Link href={`/vendor/${vendor}/${vid}`}>
                  {" "}
                  <a>
                    <h4>{vendor}</h4>
                  </a>{" "}
                </Link>
              </span>
              <br />
              <span className="priceTag">${price} </span>
              <br />
              <span>Stock Available</span>
              <br />
              <Button
                className="AddToCartBtn"
                onClick={() =>
                  AddToCart({
                    _id,
                    name,
                    url,
                    mediaUrl: mediaUrl[0],
                    price,
                    vendor,
                  })
                }
              >
                Add to Cart
              </Button>
            </div>
          </div>

          <div className="DetailPage2">
            <br />
            <span>Specification:</span>
            <p>{description}</p>
          </div>
        </>
      )}
      <br />
      <Carousel />
    </>
  );
}

export async function getServerSideProps({ query }) {
  const response = await fetch(`http://localhost:3000/api/p/${query.pid}`);

  const data = await response.json();

  return {
    props: { data: data }, // will be passed to the page component as props
  };
}
