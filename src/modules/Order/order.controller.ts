
import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { Order } from './order.model';
import { ProductServices } from '../Product/product.service';
import { TProduct } from '../Product/product.interface';


const createOrder = async (req: Request, res: Response) => {
  
  try {
    const orderData = req.body;

    // Check if the product exists
    const product = await ProductServices.getProductById(
      orderData.productId
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check if the ordered quantity exceeds the available quantity
    if (orderData.quantity > (product.inventory?.quantity || 0)) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }

    // Update the inventory quantity and inStock property
    if (product.inventory) {
      // Calculate updated quantity and inStock
      const updatedQuantity =
        (product.inventory.quantity || 0) - orderData.quantity;
      const updatedInStock = updatedQuantity > 0;

      // Prepare update data
      const updateData: Partial<TProduct> = {
        inventory: {
          quantity: updatedQuantity,
          inStock: updatedInStock,
        },
      };

      await ProductServices.updateProductById(
        product._id.toString(),
        updateData
      );
    }
    const result = await OrderServices.createOrder(orderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  }
  
  catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};
const getAllOrder = async (req: Request, res: Response) => {
  try {
     
    const email: string | undefined = req.query.email as string;

    if (email && typeof email === 'string') {
      const result = await OrderServices.getOrderByEmail(email);
      return res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      });
    } 
    else{
    const result = await OrderServices.getAllOrder();
    res.status(200).json({
      success: true,
      message:  "Orders fetched successfully!",
      data: result,
    });
  }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};
// const getOrderByEmail = async (req: Request, res: Response) => {
//   try {
//     const { orderEmail } = req.params;
//     const result = await OrderServices.getOrderByEmail(orderEmail);

//     res.status(200).json({
//       success: true,
//       message:"Orders fetched successfully for user email!",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Could Not Fetched Successfully",
//       error: error,
//     });
//   }
// };

export const OrderControllers = {
  createOrder,
  getAllOrder,
  // getOrderByEmail
};