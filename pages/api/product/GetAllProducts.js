import initDb from "../../../helpers/initDb";
import Product from "../../../models/Product"

initDb()

export default async (req,res)=>{
    try{
        const Products = await Product.find()
        res.status(200).json(Products)
    }catch(err){
        console.log(err)
    }
}