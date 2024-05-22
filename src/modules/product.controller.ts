import { Request, Response } from "express";
import { Product } from "./product.model";
import { ProductServices } from "./product.service";


const createProduct = async(res:Response,req:Request)=>{
 
  const productData = req.body;
  const result = await ProductServices.createProduct(productData)
    res.json({
      success:true,
      message:'Product is created successfully',
      data:result,
    })
  }

  export const ProductControllers ={
    createProduct
  }