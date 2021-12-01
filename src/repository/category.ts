import { Category } from "../db-init/model/categories";

/**
 * @description mongoose method for creating a category
 * @param categoryDetails
 * @returns
 */
export const createCategory = async (categoryDetails: any) => {
  try {
    await Category.create(categoryDetails);
    return true;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description mongoose method for fetching all the categories
 * @returns
 */
export const fetchCategory = async () => {
  try {
    const result = await Category.find({});
    return { data: result, success: true };
  } catch (error) {
    console.log(error);
  }
};
/**
 * @description mongoose method for fetching category by category name
 * @param name
 * @returns
 */
export const fetchCategoryName = async (name: string) => {
  try {
    const result = await Category.findOne({ name: name });
    return result;
  } catch (error) {
    console.log(error);
  }
};
/**
 * @description mongoose method for fetching category by category id
 * @returns
 */
export const fetchCategoryById = async (id: string) => {
  try {
    const result = await Category.findById({ id: id });
    return result;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description mongoose emthod for deleting category
 * @param id
 * @returns
 */
export const deleteCategory = async (id: string) => {
  try {
    await Category.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description mongoose method for updating category
 * @param categoryDetails
 * @returns
 */
export const updateCategory = async (categoryDetails: any) => {
  try {
    await Category.findByIdAndUpdate(categoryDetails.id, {
      name: categoryDetails.name,
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};
