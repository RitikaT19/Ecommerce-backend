import { Cart } from "../db-init/model/cart";
import { Product } from "../db-init/model/product";

/**
 * @description mongoose method for adding product to a cart
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

/**
 * @description mongoose method for fetching the details of all the carts
 * @returns
 */
export const fetchCartDetails = async () => {
  try {
    const result = await Cart.find({});
    return { data: result };
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description mongoose method for fetching the cart by user id
 * @param id
 * @returns
 */
export const fetchCartByUser = async (id: any) => {
  try {
    const result = await Cart.findOne({ user: id });
    // .select("_id_type, quantity")
    // console.log(result, "result")
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return { success: false, error };
  }
};

/**
 * @description mongoose method for fetching product details
 * @param id
 * @returns
 */
export const fetchProductDetails = async (id: any) => {
  try {
    const result = await Product.findOne({ _id: id })
      // selecting id, name and price from the product detail
      .select("_id_type, name price");
    return { success: true, data: result };
  } catch (error) {
    return { success: false };
  }
};
