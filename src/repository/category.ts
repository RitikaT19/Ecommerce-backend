import { Category } from "../db-init/model/categories";

export const createCategory = async (categoryDetails: any) => {
  try {
    await Category.create(categoryDetails);
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategory = async () => {
  try {
    const result = await Category.find({});
    return { data: result, success: true };
  } catch (error) {
    console.log(error);
  }
};

export const fetchSlug = async(slug:string) =>{
    try{
        const result = await Category.findOne({slug: slug})
        return result;
    }catch(error){
        console.log(error)
    }

}