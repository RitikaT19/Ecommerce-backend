import { Product } from "../db-init/model/product";
import {Category} from "../db-init/model/categories"
import{ Request, Response} from "express";
import category from "../controller/category";

export const fetchProduct = async(name: string) =>{
  try{
    const result = await Product.findOne({name: name})
    return result;
  }catch(error){
    console.log(error)
  }
}
export const createProduct = async (productDetails: any) => {
  try {
    await Product.create(productDetails);
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductDetails = async() =>{
  try{
    const result = await Product.find({})
    return { data: result}
  }catch(error){
    console.log(error)
  }
}

// ****************************************************************************************
export const fetchProductById = async(id: string) =>{
  try{
    const result = await Product.findById(id)
    //  .select("_id_type")
    console.log(result,id, "fetch by idddddddd from product...")
    return {success: true,
      data: result } 
  }catch(error){
    return{ success: false}
  }
}
// ********************************************************************************************

export const fetchCategoryById = async(id:string) =>{
  try{
    const result = await Category.findById(id)
    .select("_id_type")
    return{
      success: true,
      data: result
    }
  }catch(error){
    return{ success: false}
  }
}

export const fetchProductByCategoryId = async(category: string) =>{
  try{
    const result = await Product.find({category: category})
    return{
      success: true,
      data: result
    }
  }catch(error){
    return{ success: false}
  }
}