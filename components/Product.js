import Link from 'next/link'
export default function Product({name,price,url,src}) {
    return(
        <div className="product">

            <Link href={url?url:"/"}>
            <a>

            {/* <img src="https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fflash-1.png&w=1920&q=75" alt="" /> */}
            <div className="PrImgCover">
            <img src={src?src:"https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fflash-1.png&w=1920&q=75"} alt="" />
            </div>
            <h4> {name} </h4>
            <section className="price-tag">₹ {price} </section>
            </a>
            </Link>
            <div className="sale-bookmark"><p>25% Off</p></div>
        </div>            
    )
};
