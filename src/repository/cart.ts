import { Cart } from "../db-init/model/cart";
import {request, Request} from "express"

export const addToCart = async (cartDetails: any) => {
  try {
    const result = await Cart.create(cartDetails);
    return { data: result };
  } catch (error) {
    console.error(error);
  }
};

export const fetchCart = async (user: string) => {
  try {
    const result = await Cart.findOne({ user: user });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateCart = async(cartDetails: any) =>{
    try{
        const result = await Cart.findOneAndUpdate({cartDetails},{
            "$push":{
               cartItems:cartDetails.cartItems
            }
        })
        return result
    }catch(error){
        console.log(error)
    }
}