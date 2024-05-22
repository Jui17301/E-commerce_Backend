
import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { Order } from './order.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const {orderData,quantity} = req.body;
    const product = await Order.findById(orderData);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    if (orderData.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }
  
    const result = await OrderServices.createOrder({orderData,quantity});

    await result.save();
    orderData.inventory.quantity -= quantity;
    orderData.inventory.inStock =orderData.inventory.quantity > 0;
    await product.save();


    res.status(200).json({
      success: true,
      message: 'Order created successfully!',

      data: result,
    });
  } catch (error) {
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