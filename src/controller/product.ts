import * as productRepository from "../repository/product"
const createProduct = async(productDetails: any) =>{
    try{
        const existingProduct = await productRepository.fetchProduct(productDetails.name)
        if(existingProduct){
            throw{
                statusCode: 400,
                customMessage: "Product already exists"
            }
        }
        const result = await productRepository.createProduct(productDetails)
        if(!result){
            throw{
                statusCode: 400,
                customMessage: "Some error occurred"
            }
        }
        return{isError: false}

    }catch(error){
        return{ isError: true, error}
    }
}
export default {createProduct}