import cheerio from 'cheerio'

import axios from 'axios'

export default async (req,res) => {
    const fetchHTML = async(url) => {
        const { data } = await axios.get(url,{headers:{ 'User-Agent': 'My User Agent 1.0'}})
        const $ = await cheerio.load(data)
        
        
        const name = await $("#productTitle").text().trim()
        const price = await $("span#priceblock_dealprice").text().trim()
        const brand = await $("a#bylineInfo").text().trim()
        const brandUrl = await $("a#bylineInfo").attr("href")
        const MainImage = await $("#imgTagWrapperId > img").attr("src")
        const OtherImages = await $("span.a-button-text > img")
        const Desc = await $("div#feature-bullets > ul.a-unordered-list > li")
        var DescArray = []
        Array.from(Desc).map((d)=>{
            Array.from(d.firstChild.children).map((dm)=>{
                DescArray.push(dm.data.trim())
            })
        })
        
        
        var ImageArray = []
        await Array.from(OtherImages).filter((f)=>f.name == 'img').map((i)=>{
            var Url = i.attribs.src
            if(Url.match(".jpg")){
                var newUrl = Url.replace("_SX38_SY50_CR,0,0,38,50_","_SX500_SY500_")
                ImageArray.push(newUrl)
            }
        })    
        
       return await {name,price,MainImage,brand,brandUrl,ImageArray,DescArray}
    }

    await fetchHTML("https://www.amazon.in/dp/B09BFCJFLB").then(d=>{
        if(!d){
            return console.log("error")
        }
        return res.json(d)
    })
}
