import initDb from '../../../helpers/initDb';
import User from '../../../models/User'
import jwt from 'jsonwebtoken'

initDb()




export default async(req,res)=>{
    const {authorization} = req.headers
    const JwtSecret = process.env.JWTSECRET
    

    if(!authorization){
        return res.status(401).json({error:"you must be logged in 1"})
    }
    
    
    try{
        
        const token = await authorization.replace("Bearer ","")
        
        const {_id} = await jwt.verify(token,JwtSecret)
        
        await User.findOne({_id:_id}, async(err,u)=>{
            console.log(u)
            await res.status(200).json({order:u.order.reverse()})

        })

        
    }catch(err){
        return await res.status(401).json({error:"you must be logged in 2"+err})
    }
}