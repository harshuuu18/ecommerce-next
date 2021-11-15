export default function RemoveFromCart({_id}) {
    if(localStorage.getItem('items')){
        var Cart = JSON.parse(localStorage.getItem('items'))

        const find = Cart.find((i)=>i._id === _id)
        if(find){
            const id = Cart.indexOf(find)
            const quantity = Cart[id].quantity
            if(quantity === 1){
                Cart.splice(id,1)
            }else{
                Cart[id].quantity = quantity-1
            }
            localStorage.setItem('items',JSON.stringify(Cart))
        }
        
    }
};
