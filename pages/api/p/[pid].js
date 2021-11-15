import initDb from "../../../helpers/initDb";
import Product from '../../../models/Product'

initDb()

const notFound = {
    _id: "6144c0dadb0a5c2e65135f26",
    name: "Sorry this Product is not available now!",
    price: 189,
    description: "Shop Online",
    mediaUrl: ["https://www.pngitem.com/pimgs/m/254-2549750_index-of-assets-minimal-404-error-logo-svg.png"],
    url: "Redmi-note-5-pr",
    brand:"",
    vendor:""
}

export default async (req,res)=>{
    const {pid} = req.query

    try{
        await Product.findOne({url:pid},(err,pr)=>{
            if(pr){
                res.status(200).json(pr)
            }else{
                res.status(404).json(notFound)
            }
        })
    }catch(err){
        console.log(err)
        res.status(404).json(notFound)
    }
}