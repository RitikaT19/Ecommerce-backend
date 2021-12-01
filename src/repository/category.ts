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

export const fetchCategoryName = async(name:string) =>{
    try{
        const result = await Category.findOne({name: name})
        return result;
    }catch(error){
        console.log(error)
    }

}

export const fetchCategoryById = async(id: string) =>{
  try{
    const result = await Category.findById({id:id});
    return result;
  }catch(error){
    console.log(error)
  }
}

export const deleteCategory = async(id: string)=>{
  try{
    await Category.findByIdAndDelete(id)
    return true;
  }catch(error){
    console.log(error)
  }
}

export const updateCategory = async(categoryDetails: any) =>{
  try{
    await Category.findByIdAndUpdate(categoryDetails.id,{
      name: categoryDetails.name
    })
    return true;
  }catch(error){
    console.log(error)
  }
}
