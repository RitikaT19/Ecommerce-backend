import * as categoryRepository from "../repository/category";

const createCategory = async (categoryDetails: any) => {
  try {
    const existingSlug = await categoryRepository.fetchCategoryName(
      categoryDetails.name
    );
    if (existingSlug) {
      throw {
        statusCode: 400,
        customMessage: "Category name already exists",
      };
    }
    const result = await categoryRepository.createCategory(categoryDetails);
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

const fetchCategory = async () => {
  try {
    const result: any = await categoryRepository.fetchCategory();
    if (!result.success) {
      throw {
        statusCode: 400,
        customMessage: "Unable to fetch categories",
      };
    }
    return {
      isError: false,
      data: result.data,
    };
  } catch (error) {
    return { isError: true, error };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const result = await categoryRepository.fetchCategoryById(id);
    if (result) {
      throw {
        statusCode: 400,
        customMessage: "Category not found",
      };
    }
    const categoryDeleted = await categoryRepository.deleteCategory(id);
    if (!categoryDeleted) {
      throw {
        statusCode: 400,
        customMessage: "Unable to delete category",
      };
    }
  } catch (error) {
    return { isError: true, error };
  }
};

export const updateCategory = async(categoryDetails: any)=>{
    try{
        const result = await categoryRepository.updateCategory(categoryDetails);
        if(!result){
            throw{
                statusCode: 400,
                customMessage: "category not found"
            }
        }

        console.log(result, "update categoryyyy")

        // const updatedCategory: any = await categoryRepository.fetchCategoryById(categoryDetails.id)
        // const categoryUpdate  = ({
        //     _id: updatedCategory._id,
        //     name: updatedCategory.name
        // })
        return{isError: false, data: result}
    }catch(error){
        return{isError: true, error}
    }
}


export default {
  createCategory,
  fetchCategory,
  deleteCategory,
  updateCategory,
  
};
