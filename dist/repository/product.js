"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchProductByCategoryId = exports.fetchCategoryById = exports.fetchProductById = exports.fetchProductDetails = exports.createProduct = exports.fetchProduct = void 0;
const product_1 = require("../db-init/model/product");
const categories_1 = require("../db-init/model/categories");
exports.fetchProduct = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_1.Product.findOne({ name: name });
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
exports.createProduct = (productDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product_1.Product.create(productDetails);
        return true;
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchProductDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_1.Product.find({});
        return { data: result };
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield categories_1.Category.findOne({ id: id })
            .select("_id_type");
        return { data: result };
    }
    catch (error) {
        console.log(error);
    }
});
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
exports.fetchCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield categories_1.Category.findById(id)
            .select("_id_type");
        return {
            success: true,
            data: result
        };
    }
    catch (error) {
        return { success: false };
    }
});
exports.fetchProductByCategoryId = (category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_1.Product.find({ category: category });
        return {
            success: true,
            data: result
        };
    }
    catch (error) {
        return { success: false };
    }
});
//# sourceMappingURL=product.js.map