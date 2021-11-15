import formidable from 'formidable'
import fs from 'fs'
import slugify from 'slugify'
import path from 'path'

export const config = {
    api:{
        bodyParser:false
    }
}

export default async(req,res)=>{
    

    
    
    fs.mkdir('./public/uploads',{recursive:true},(err)=>{
        return console.log(err)
    })
    const data  = await new Promise((resolve,reject)=>{
        
        const form = formidable({
            multiples:true,
            uploadDir:"./public/uploads",
            
        })
        form.keepExtensions = true
        form.keepFileName = true
    
    form.on('fileBegin',(name,file)=>{
        file.path = path.join('public/uploads', slugify(file.name))
        
    })

    form.parse(req,(err,fields,files)=>{
        if(err) return reject(err)
        resolve(files)
    })
    
    })
    
    res.json(data)

}