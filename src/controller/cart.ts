import * as cartRepository from "../repository/cart";

/**
 * @description function for adding to the cart
 * @param cartDetails
 * @returns
 */
const addToCart = async (cartDetails: any) => {
  try {
    // checking if the cart exists for the certain user
    const cartExists = await cartRepository.fetchCart(cartDetails.user);
    if (cartExists) {
      // if the cart exists, update the cart
      const update = await cartRepository.updateCart(cartDetails);
      // if update not found, throw an error
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
      // if result is not found, throw an error
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
    // call cartRepository for fetching cart
    const result: any = await cartRepository.fetchCartDetails();
    // if result is not found, the cart does not exists, throw an error
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
    // call cartRepository to fetch cart by user id
    const result: any = await cartRepository.fetchCartByUser(id);
    // if result is not success, throw an error
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
      // call cart Repository to fetch Product details of index 0
      const productInformation = await cartRepository.fetchProductDetails(
        result.data.cartItems[0].product
      );
      // if productInformation is not available, throw error
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
