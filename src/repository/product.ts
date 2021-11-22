import { Product } from "../db-init/model/product";

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
