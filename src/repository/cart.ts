import { Cart } from "../db-init/model/cart";

/**
 * @description mongoose method for add a cart
 * @param cartDetails
 * @returns
 */
export const addToCart = async (cartDetails: any) => {
  try {
    const result = await Cart.create(cartDetails);
    return { data: result };
  } catch (error) {
    console.error(error);
  }
};

/**
 * @description mongoose method for fetching the cart
 * @param user
 * @returns
 */
export const fetchCart = async (user: string) => {
  try {
    const result = await Cart.findOne({ user: user });
    return result;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description mongoose method for updating the cart
 * @param cartDetails
 * @returns
 */
export const updateCart = async (cartDetails: any) => {
  try {
    const result = await Cart.findOneAndUpdate(
      { cartDetails },
      {
        $push: {
          cartItems: cartDetails.cartItems,
        },
      }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

// export const fetchItem = async(id:string) =>{
//     try{
//         const result = await Cart.findById({_id:id})
//         return result
//     }catch(error){
//         console.log(error)
//     }
// }

export const fetchCartDetails = async() =>{
  try{
    const result = await Cart.find({})
    return{ data: result}
  }catch(error){
    console.log(error)
  }
}

export const fetchCartByUser = async(id:any) =>{
  try{
    const result = await Cart.findOne({user: id})
    console.log(result, "result")
    return{data: result}
  }catch(error){
    console.log(error)
  }
}