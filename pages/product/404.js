import { useRouter } from "next/router"
import Button from '@material-ui/core/Button';
import Carousel from '../../components/Carousel';

export default function pid({data}) {
    const router = useRouter()
    const {pid} = router.query
    
    return(
        <>
            <div className="detailPage">
                <div className="detailPageLeft">
                    <img src="https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fheadphone.png&w=640&q=75" width="300px" alt="" />
                    <div className="ProductImageS">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="detailPageRight">
                    <h2>{data.name}</h2>
                    <br />
                    <span>Brand: {' '}  <h4>Xiaomi</h4></span>
                    <br />
                    <span>Vendor: {' '}  <h4>Rahul</h4></span>
                    <br />
                    <span className="priceTag">${data.price} </span>
                    <span>Stock Available</span>
                    <br />
                    <Button className="AddToCartBtn" >Add to Cart</Button>
                </div>
            </div>
            
            <div className="DetailPage2">
                <br />
                <span>Specification:</span>
                <p>
                    {data.description}
                </p>
            </div>
            <br />
            <Carousel />
        </>
    )
};

export async function getServerSideProps({query}){
    

    

    


    return {
        props: {data:data}, // will be passed to the page component as props
      }
}