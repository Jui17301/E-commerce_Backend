import { Request, Response } from "express";
import { Product } from "./product.model";
import { ProductServices } from "./product.service";


const createProduct = async(res:Response,req:Request)=>{
 try {

  const productData = req.body;
  const result = await ProductServices.createProduct(productData)
    res.json({
      success:true,
      message:'Product created successfully!',
      data:result,
    })
  
 } catch (error) {
  console.log(error)
 }
 
  }

  export const ProductControllers ={
    createProduct
  }