import { useRouter } from "next/dist/client/router";
import Product from "../../../components/Product";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import Head from "next/head";
import Carousel from "../../../components/Carousel";
import { Button } from "@material-ui/core";

export default function pid({ data }) {
  // const products = data.sort((a, b) => a - b) for low to high
  // const products = data.sort((a, b) => b - a) for high to low
  const [filter, setFilter] = useState("");
  var { Details, FilteredProducts } = data;
  console.log(Details);
  let products = FilteredProducts;

  if (!filter) {
    products = FilteredProducts;
    console.log("no filter");
  } else if (filter === "lth") {
    products = FilteredProducts.sort((a, b) => a - b);
    console.log("filter low to high");
  } else if (filter === "htl") {
    products = FilteredProducts.sort((a, b) => b - a);
    console.log("filter high to low");
  }
  const router = useRouter();
  const { pid } = router.query;
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <Head>
        <title>{"Buy " + pid.replace("+", " ") + " Online"}</title>
      </Head>
      <br />
      {Details ? (
        <>
          <div className="VendorPageBanner">
            <div className="VendorPageInfo">
              <h5>Shop from {Details?.name}</h5>
              <h2>{Details?.name}</h2>
              <p>{Details?.about}</p>
              <span id="VSB">
                <Button
                  id="VendorShopBtn"
                  onClick={(e) =>
                    document
                      .getElementById("demo-simple-select")
                      .scrollIntoView()
                  }
                >
                  {"Shop Now-->"}
                </Button>
              </span>
            </div>
            <div
              className="VendorPageImage"
              style={{ backgroundImage: `url(${Details?.image})` }}
            ></div>
          </div>
          <br />
        </>
      ) : (
        ""
      )}

      <div className="searchHeading">
        <h2>Shop Latest items from {Details?.name} </h2>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth error>
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              sx={{
                minWidth: "100%",
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
              }}
              id="demo-simple-select"
              value={filter}
              label="Filter"
              onChange={handleChange}
            >
              <MenuItem value={"lth"}>Price: Low to High</MenuItem>
              <MenuItem value={"htl"}>Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <hr id="srp-line" />
      <br />

      <div className="searchResultPage">
        {products.map(({ name, price, url, _id, mediaUrl, brand }) => {
          return (
            <Product
              name={name}
              price={price}
              src={mediaUrl[0]}
              url={`/product/${url}`}
              key={_id}
            />
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const response = await fetch(
    `http://localhost:3000/api/v/${query.vname}/${query.pid}`
  );

  const data = await response.json();

  return {
    props: { data: data }, // will be passed to the page component as props
  };
}
