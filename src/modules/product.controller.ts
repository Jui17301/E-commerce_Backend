import { Request, Response } from "express";

import { ProductServices } from "./product.service";
import productValidationSchema from "./product.validation";

const createProduct = async(req:Request,res:Response)=>{
 try {

  const productData = req.body;
  const zodParsedData = productValidationSchema.parse(productData);
  const result = await ProductServices.createProductIntoDB(zodParsedData);
  res.status(200).json({
    success: true,
    message: 'Product is created successfully',
    data: result,
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: 'Something went wrong',
    error: error
  });
}
 }
  export const ProductControllers ={
    createProduct
  }