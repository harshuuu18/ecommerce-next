import nodemailer from 'nodemailer'
import Product from '../../../components/Product'


export default async (req,res)=>{
    const {email,otp} = req.body

    var transporter = await nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'mailauth3@gmail.com',
            pass:'rizlalala123'
        }
    })

    var mailOption = await {
        from: 'mailauth3@gmail.com',
        to: email,
        subject: 'Verification Code',
        html:`<h1>Your OTP:  ${otp} </h1>`
    }

    try{
        await transporter.sendMail(mailOption,(error,info)=>{
            if(error){
                console.log(error)
                res.status(422).json({error:"Something went wrong"})
            }else{
                res.status(200).json({message:"OTP Sent Succesfully"})
            }
        })
    }catch(err){
        console.log(err)
    }
}
