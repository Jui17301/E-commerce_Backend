import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (payload: TOrder) => {
  const result = await Order.create(payload);
  return result;
};

const getAllOrder = async () => {
  const result = await Order.find();
  return result;
};
const getOrderByEmail = async (email: string) => {
  const result = await Order.findOne({ email:email });
  return result;
};

export const OrderServices = {
  createOrder,
  getAllOrder,
  getOrderByEmail
};