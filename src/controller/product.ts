import * as productRepository from "../repository/product";

const createProduct = async (productDetails: any) => {
  try {
    // call repo to fetch product name
    const existingProduct = await productRepository.fetchProduct(
      productDetails.name
    );
    // if product name exists, throw an error
    if (existingProduct) {
      throw {
        statusCode: 400,
        customMessage: "Product already exists",
      };
    }
    // if product name does not exists, call repo to create a new product
    const result = await productRepository.createProduct(productDetails);
    // if result is not received, throw an error
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
    // call repo to fetch product details
    const result: any = await productRepository.fetchProductDetails();
    // if result is not received, throw an error
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

export const fetchProductById = async (id: any) => {
  try {
    const result: any = await productRepository.fetchProductById(id);
    if (!result) {
      throw {
        statusCode: 400,
        customMessage: "Some error occured while fetching products",
      };
    }
    console.log(result, "from controller");
    return { isError: false, data: result.data };
  } catch (error) {
    return { isError: true };
  }
};

export const fetchProductByCategoryId = async (id: string) => {
  try {
    // call repo to fetch category id
    const result: any = await productRepository.fetchCategoryById(id);
    // if result is not received, throw an error
    if (!result.success) {
      throw {
        statusCode: 400,
        customMessage: "category not found",
      };
    }
    // if category id is found, then call the repo to fetch the product
    const productInformation = await productRepository.fetchProductByCategoryId(
      id
    );
    // if productInformation is not success, throw an error
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

export const deleteProduct = async (id: string) => {
  try {
    // call repo to delete the product
    const result = await productRepository.deleteProduct(id);
    // if result is not received, throw error
    if (!result) {
      throw {
        statusCode: 400,
        customMessage: "Product could not be deleted!",
      };
    }
    return { isError: false };
  } catch (error) {
    return { isError: true, error };
  }
};

export const updateProduct = async (productDetails: any) => {
  try {
    // call repo to update the product
    const result: any = await productRepository.updateProduct(productDetails)  
    // if result is not received, throw an error
    if (!result) {
      throw {
        statusCode: 400,
        customMessage: "Product could not be updated",
      };
    }
    return { isError: false, data: result };
  } catch (error) {
    return { isError: true, error };
  }
};

export default {
  createProduct,
  fetchProduct,
  fetchProductByCategoryId,
  fetchProductById,
  deleteProduct,
  updateProduct,
};
