
import { Product } from "./product.model";
import { TProduct } from "./product.interface";


const createProductIntoDB = async(payLoad:TProduct)=>{
  const result = await Product.create(payLoad);
  return result;
}


export const ProductServices={
  createProductIntoDB
}
