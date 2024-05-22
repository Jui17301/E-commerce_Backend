import { Product } from "./product.model";
import { TProduct } from "./product.interface";

const createProductIntoDB = async (payLoad: TProduct) => {
  const result = await Product.create(payLoad);
  return result;
};
const getAllProducts = async () => {
  const result = await Product.find();
  return result;
};
const getProductById = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};
const updateProductById = async (id: string, updateData: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate({ _id: id }, updateData, {
    new: true,
  });
  return result;
};

const deleteProductById = async (id: string) => {
  const result = await Product.findByIdAndDelete({ _id: id });
  return result;
};
const searchProductByItem = async (searchTerm: string) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: searchTerm, $options: "i" } },
      { category: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
    ],
  });

  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  searchProductByItem,
};
