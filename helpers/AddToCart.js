export default function AddToCart({_id,name,url,mediaUrl,price,vendor}) {
    if(localStorage.getItem('items')){
        var Cart = JSON.parse(localStorage.getItem('items'))

        const find = Cart.find((i)=>i._id === _id)
        if(find){
            const id = Cart.indexOf(find)
            const quantity = Cart[id].quantity
            Cart[id].quantity = quantity+1
        }else{
            Cart.push({
                _id,
                name,
                url,
                mediaUrl,
                price,
                vendor,
                quantity:1
            })
        }
        localStorage.setItem('items',JSON.stringify(Cart))
        
    }
};
