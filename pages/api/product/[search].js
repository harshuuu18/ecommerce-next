import initDb from "../../../helpers/initDb";
import Product from "../../../models/Product"

initDb()

export default async(req,res)=>{
    const {search} = req.query
    
    
    try{

        var regex = await new RegExp(search, "i")

        await Product.find({name:regex},(err,prs)=>{
            
            res.status(200).json(prs)
            
        })
        
    }catch(err){

        console.log(err)

        res.status(422).send("error")

    }
}