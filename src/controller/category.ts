import * as categoryRepository from "../repository/category";

const createCategory = async (categoryDetails: any) => {
  try {
    // call repo to fetch category by name
    const existingName = await categoryRepository.fetchCategoryName(
      categoryDetails.name
    );
    // if category name already exists, throw an error
    if (existingName) {
      throw {
        statusCode: 400,
        customMessage: "Category name already exists",
      };
    }
    // if category name does not exists, call repo to create a new category
    const result = await categoryRepository.createCategory(categoryDetails);
    // if result is not received, throw error
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
    // call repo to fetch category
    const result: any = await categoryRepository.fetchCategory();
    // if unable to fetch category, throw error
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
    // call repo to fetch category by id
    const result = await categoryRepository.fetchCategoryById(id);
    // if result is not received, throw an errror
    if (!result) {
      throw {
        statusCode: 400,
        customMessage: "Category not found",
      };
    }
    // if category exists, then call repo to delete the category
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

export const updateCategory = async (categoryDetails: any) => {
  try {
    // call repo to update category by id
    const result = await categoryRepository.updateCategory(categoryDetails);
    if (!result) {
      throw {
        statusCode: 400,
        customMessage: "category not found",
      };
    }
    return { isError: false, data: result };
  } catch (error) {
    return { isError: true, error };
  }
};

export default {
  createCategory,
  fetchCategory,
  deleteCategory,
  updateCategory,
};
