import { TProduct } from "./product.interface";
import { Product } from "./product.model";



const createProductIntoDB = async(payLoad:TProduct)=>{
  const result = await Product.create(payLoad);
  return result;
}


export const ProductServices={
  createProductIntoDB
}
