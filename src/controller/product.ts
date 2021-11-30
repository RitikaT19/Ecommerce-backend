import * as productRepository from "../repository/product";
const createProduct = async (productDetails: any) => {
  try {
    const existingProduct = await productRepository.fetchProduct(
      productDetails.name
    );
    if (existingProduct) {
      throw {
        statusCode: 400,
        customMessage: "Product already exists",
      };
    }
    const result = await productRepository.createProduct(productDetails);
    if (!result) {
      throw {
        statusCode: 400,
        customMessage: "Some error occurred",
      };
    }
    return { isError: false };
  } catch (error) {
    return { isError: true, error };
  }
};

export const fetchProduct = async () => {
  try {
    const result: any = await productRepository.fetchProductDetails();
    if (!result) {
      throw {
        statusCode: 400,
        customMessage: "Some error occured while fetching products",
      };
    }
    return { isError: false, data: result.data };
  } catch (error) {
    return { isError: true };
  }
};
// export const fetchProductById = async(products: any)=>{
//     try{
//         const fetchCategory: any = await productRepository.fetchProductById(products.id);
//         if(fetchCategory){
//             const result: any = await productRepository.fetchProductByCategoryId(products.category)
//             return {isError: false, data: result.data}
//         }
//         return{ isError: false, data: result.data}
//         if(!result){
//             throw{
//                 statusCode: 400,
//                 customMessage: "Some error occured while fetching products"
//             }
//         }
//         return{isError: false, data: result.data}
//     }catch(error){
//         return{ isError: true}
//     }
// }

export const fetchProductByCategoryId = async (id: string) => {
  try {
    const result: any = await productRepository.fetchCategoryById(id);
    if (!result.success) {
      throw {
        statusCode: 400,
        customMessage: "category not found",
      };
    }
    const productInformation = await productRepository.fetchProductByCategoryId(
      id
    );
    if (!productInformation.success) {
      throw {
        statusCode: 400,
        customMessage: "products not found",
      };
    }
    return { isError: false, data: productInformation.data };
  } catch (error) {
    return { isError: true, error };
  }
};

export default { createProduct, fetchProduct, fetchProductByCategoryId };
