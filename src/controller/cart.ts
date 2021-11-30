import * as cartRepository from "../repository/cart";

const addToCart = async (cartDetails: any) => {
  try {
    // checking if the cart exists for the certain user
    const cartExists = await cartRepository.fetchCart(cartDetails.user);
    if (cartExists) {
      // if the cart exists, update the cart
      const update = await cartRepository.updateCart(cartDetails);
      if (!update) {
        throw {
          statusCode: 400,
          customMessage: "Wasn't able to update cart",
        };
      }
    }
    // if the cart does not exists, then make a new cart
    else {
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

export const fetchCart = async() =>{
  try{
    const result: any = await cartRepository.fetchCartDetails();
    if(!result){
      throw{
        statusCode: 400,
        customMessage: "Not able to fetch cart details"
      }
    }
    return{isError: false, data: result.data}


  }catch(error){
    return{ isError: true, error}
  }
}

export const fetchCartByUser = async(id: string) =>{
  try{
    const result: any = await cartRepository.fetchCartByUser(id)
    if(!result){
      throw{
        statusCode: 400,
        customMessage: "Not able to fetch cart details"
      }
    }
    console.log(result)
    return{ isError: false, data: result.data}
  }catch(error){
    return{isError: true, error}
  }
}
export default { addToCart, fetchCart, fetchCartByUser };
