import cheerio from 'cheerio'

import axios from 'axios'

export default async (req,res) => {
    const fetchHTML = async(url) => {
        const { data } = await axios.get(url,{headers:{ 'User-Agent': 'My User Agent 1.0'}})
        const $ = await cheerio.load(data)
        var ProductArray = []
        
        await $("div.s-result-item").each((i,el)=>{
            const title = $(el).find('span.a-text-normal').text()
            const img = $(el).find('img.s-image').attr('src')
            const brand = $(el).find('h5.s-line-clamp-1 > span.a-size-base-plus').text()
            const price = $(el).find('span.a-price-whole').text()
            const asin = $(el).attr("data-asin")
            console.log(title)
            if(title && img && price && asin){
                ProductArray.push({title,img,brand,price,asin})
            }
        })
        return ProductArray

        
        
        
       
    }

    await fetchHTML("https://www.amazon.in/s?k=iphone").then(d=>{
        if(!d){
            return console.log("error")
        }
        return res.json(d)
    })
}
