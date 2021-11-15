import initDb from "../../../helpers/initDb";
import Product from "../../../models/Product"

initDb()

export default async(req,res)=>{
    res.status(422).json({message:"You have not entered anything"})
}