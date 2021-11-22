import * as cartRepository from "../repository/cart";
const addToCart = async (cartDetails: any) => {
  try {
    const cartExists = await cartRepository.fetchCart(cartDetails.user)
    if(cartExists){
        // const itemExists = await cartRepository.fetchItem(cartDetails.cartItems)
        // if(itemExists){
        //     throw{

        //     }
        // }
        console.log(cartDetails.cartItems, "products")
        const update=await cartRepository.updateCart(cartDetails)
        if(!update){
            throw{
                statusCode: 400,
                customMessage: "Wasn't able to update cart"
            }
        }
    }
    else{
        const result = await cartRepository.addToCart(cartDetails);
        if (!result) {
            throw {
              statusCode: 400,
              customMessage: "Wasn't able to add to the cart",
            };
          }
         
    }

    return { isError: false };
    
    
  } catch (error) {
    return { isError: true, error };
  }
};

export default { addToCart };
