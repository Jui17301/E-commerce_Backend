
import { Product } from "./product.model";
import { TProduct } from "./product.interface";


const createProductIntoDB = async(payLoad:TProduct)=>{
  const result = await Product.create(payLoad);
  return result;
}
const getAllProducts = async()=>{
  const result = await Product.find();
  return result;
}


export const ProductServices={
  createProductIntoDB,
  getAllProducts
}
