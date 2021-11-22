import * as categoryRepository from "../repository/category"

const createCategory =async(categoryDetails: any) =>{
    try{
       const existingSlug = await categoryRepository.fetchSlug(categoryDetails.slug)
        if(existingSlug){
            throw{
                statusCode: 400,
                customMessage: "Category name already exists"
            }
        }
        const result = await categoryRepository.createCategory(categoryDetails)
        if(!result){
            throw{
                statusCode: 400,
                customMessage: "Some error occurred"
            }
        }
        return{ isError: false}
    }catch(error){
        return{ isError: true, error}
    }
}

const fetchCategory = async() =>{
    try{
        const result: any = await categoryRepository.fetchCategory();
        if(!result.success){
            throw{
                statusCode:400,
                customMessage: "Unable to fetch categories"
            }
        }
        return{
            isError: false,
            data: result.data
        }
    }catch(error){
        return {isError: true, error}
    }
}
export default {createCategory, fetchCategory}