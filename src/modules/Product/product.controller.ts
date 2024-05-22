import { Request, Response } from "express";

import { ProductServices } from "./product.service";
import productValidationSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const zodParsedData = productValidationSchema.parse(productData);
    const result = await ProductServices.createProductIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: "Product is created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;

    if (searchTerm) {
      const result = await ProductServices.searchProductByItem(searchTerm);
      return res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: result,
      });
    }

    else{
    const result = await ProductServices.getAllProducts();

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  }
  } 
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Could Not Fetched Successfully",
      error: error,
    });
  }
};
const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getProductById(productId);

    res.status(200).json({
      success: true,
      message: "Product fetched by ID successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Could Not Fetched Successfully",
      error: error,
    });
  }
};
const updateProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    const result = await ProductServices.updateProductById(
      productId,
      updateData
    );

    res.status(200).json({
      success: true,
      message: "Product is updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductById(productId);
    res.status(200).json({
      success: true,
      message: "Product is deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};
// const searchProductByItem = async (req: Request, res: Response) => {
//   try {
//     const searchTerm = req.query.searchTerm;

//     if (typeof searchTerm !== "string") {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid search term",
//       });
//     }

//     const result = await ProductServices.searchProductByItem(searchTerm);
//     res.status(200).json({
//       success: true,
//       message: `Products matching search term '${searchTerm}' fetched successfully!`,
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//       error: error,
//     });
//   }
// };
export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  // searchProductByItem,
};
