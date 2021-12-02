import { Product } from "../db-init/model/product";
import {Category} from "../db-init/model/categories"

/**
 * @description mongoose method for fetching product by name
 * @param name 
 * @returns 
 */
export const fetchProduct = async(name: string) =>{
  try{
    const result = await Product.findOne({name: name})
    return result;
  }catch(error){
    console.log(error)
  }
}
/**
 * @description mongoose method for creating product
 * @param productDetails 
 * @returns 
 */
export const createProduct = async (productDetails: any) => {
  try {
    await Product.create(productDetails);
    return true;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description mongoose method for fetching all the products
 * @returns 
 */
export const fetchProductDetails = async() =>{
  try{
    const result = await Product.find({})
    return { data: result}
  }catch(error){
    console.log(error)
  }
}

/**
 * @description mongoose method for fetching product by id
 * @param id 
 * @returns 
 */
 export const fetchProductById = async(id: string) =>{
  try{
    const result = await Product.findOne({_id:id})
    //  .select("_id_type")
    console.log(result,id, "fetch by idddddddd from product...")
    return {success: true,
      data: result } 
  }catch(error){
    return{ success: false}
  }
}
/**
 * @description mongoose emthod for fetching category by id
 * @param id 
 * @returns 
 */
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
/**
 * @description mongoose method for fetching category from product
 * @param category 
 * @returns 
 */
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