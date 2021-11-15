export default function Carousel2() {
    const VendorDiv = ()=>{
        return (
            <div className="Carousel2-img">
                    <img src="/shop (1).png" alt="" />
                    <h3>Vendor</h3>
            </div>
        )
    }
    return(
        <div className="Carousel2"  >
        <br />
            <h2><img src="/flash512r.png" alt="" width="32px" />{'  '}Top Vendors</h2>
            <div className="Carousel2-inner" >
            <VendorDiv />
            <VendorDiv />
            <VendorDiv />
            <VendorDiv />
            </div>
        </div>
    )
};
