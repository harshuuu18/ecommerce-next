import { processEnv } from '@next/env';
import initDb from '../../../helpers/initDb';
import User from '../../../models/User'
import jwt from 'jsonwebtoken'


initDb()

export default async(req,res)=>{
    
    const {name,email,mobile} = req.body
    const JwtSecret = process.env.JWTSECRET

    const sendToken = (User_Id,UserDetails)=>{
        const token = jwt.sign({_id:User_Id},JwtSecret)
        const {name,email,_id,address,mobile,vendor,role} = UserDetails
        res.json({user:{_id,name,email,token,address,mobile,vendor,role}})
    }

    try{

        if(!name || !email || !mobile){
            return   res.status(422).json({error:"Please add all fields"})
        }

        await User.findOne({email}).then((savedUser)=>{

            if(!savedUser) {
    
                const user = new User({
                    name,
                    email,
                    mobile
                })
                
                user.save().then(user=>{
                    sendToken(user._id,user)
                }).catch((err)=>{
                    console.log(err)
                })   
    
            }else{
                sendToken(savedUser._id,savedUser)
            }
            }).catch((err)=>console.log(err))

    }catch(err){
        console.log(err)
    }

}