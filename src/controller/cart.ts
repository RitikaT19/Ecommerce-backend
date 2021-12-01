import * as cartRepository from "../repository/cart";
import * as productRepository from "../repository/product"

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

export const fetchCart = async () => {
  try {
    const result: any = await cartRepository.fetchCartDetails();
    if (!result) {
      throw {
        statusCode: 400,
        customMessage: "Not able to fetch cart details",
      };
    }
    return { isError: false, data: result.data };
  } catch (error) {
    return { isError: true, error };
  }
};

export const fetchCartByUser = async (id: any) => {
  try {
    const result: any = await cartRepository.fetchCartByUser(id);
    console.log(result, "resultttttttttttttttttttttttttttt")
    
    if (!result.success) {
      throw {
        statusCode: 400,
        customMessage: "Not able to fetch cart details",
      };
    } else {
      // let cartItems = {};
      // result.data.cartItems.forEach((item,index)=>{
      //   cartItems[item.product.to]
      // })
      const productInformation =await cartRepository.fetchProductDetails(result.data.cartItems[0].product);
      if (!productInformation) {
        throw {
          customCode: 400,
          customMessage: "products not found",
        };
      }
      return { isError: false, data: productInformation.data };
    }
  } catch (error) {
    return { isError: true, error };
  }
};
export default { addToCart, fetchCart, fetchCartByUser };
