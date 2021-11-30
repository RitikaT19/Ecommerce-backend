import { Product } from "../db-init/model/product";
import {Category} from "../db-init/model/categories"
import{ Request, Response} from "express";
import category from "../controller/category";

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

export const fetchProductDetails = async() =>{
  try{
    const result = await Product.find({})
    return { data: result}
  }catch(error){
    console.log(error)
  }
}

export const fetchProductById = async(id: string) =>{
  try{
    const result = await Category.findOne({id:id})
    .select("_id_type")
    return {data: result} 
  }catch(error){
    console.log(error)
  }
}

// export const fetchProductByCategoryId = async(category: any) =>{
//   try{
//     const result = await Product.find({category: category._id})
//     return {data: result}
//   }catch(error){
//     console.log(error)
//   }
// }

// export const fetchProductById = async(id: string)=>{
//   try{
//        await Category.findOne({id: id})
//       .select("_id type")
//       .exec((error, category)=>{
//         if(error){
//           console.log(error)
//         }
//         if(category){
//           const result = Product.find({category: category._id})
//           console.log(result, "result")
//           return{ data:result}
//         }
//       })
//       // console.log(result)
//       // return {data:result}
      
//   }catch(error){
//     console.log(error)
//   }
// }

// export const getProductsById = (req: Request, res: Response) => {
//   const { slug } = req.params;
//   const result:any = Category.findOne({slug: slug })
//     .select("_id type")
//     .exec((error, category) =>{
//       console.log(result, "category result")
//       if (error) {
//         return res.status(400).json({ error });
//       }
//       if(category){
//         Product.find({category: slug})
//         .exec((error, products)=>{
//           res.status(200).json({data: products})
//         })
//       }
      
//       console.log(slug, "slug")
      
//     })}

      // if (category) {
      //   Product.find({ category: category._id }).exec((error, products) => {
      //     if (error) {
      //       return res.status(400).json({ error });
      //     }

      //     if (category.type) {
      //       if (products.length > 0) {
      //         res.status(200).json({
      //           products,
      //           priceRange: {
      //             under5k: 5000,
      //             under10k: 10000,
      //             under15k: 15000,
      //             under20k: 20000,
      //             under30k: 30000,
      //           },
      //           productsByPrice: {
      //             under5k: products.filter((product) => product.price <= 5000),
      //             under10k: products.filter(
      //               (product) => product.price > 5000 && product.price <= 10000
      //             ),
      //             under15k: products.filter(
      //               (product) => product.price > 10000 && product.price <= 15000
      //             ),
      //             under20k: products.filter(
      //               (product) => product.price > 15000 && product.price <= 20000
      //             ),
      //             under30k: products.filter(
      //               (product) => product.price > 20000 && product.price <= 30000
      //             ),
      //           },
      //         });
      //       }
      //     } else {
        //     res.status(200).json({ products });
        //   }
        // });
//       }
//     });
// };


export const fetchCategoryById = async(id:string) =>{
  try{
    const result = await Category.findById(id)
    .select("_id_type")
    return{
      success: true,
      data: result
    }
  }catch(error){
    return{ success: false}
  }
}

export const fetchProductByCategoryId = async(category: string) =>{
  try{
    const result = await Product.find({category: category})
    return{
      success: true,
      data: result
    }
  }catch(error){
    return{ success: false}
  }
}

