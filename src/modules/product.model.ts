import { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";




const VariantSchema = new Schema<TVariant>({
  type: { 
    type: String,
     required: true 
    },
  value: { 
    type: String,
     required: true
     }
});

const InventorySchema = new Schema<TInventory>({
  quantity: {
     type: Number, 
     required: true },
  inStock: { 
    type: Boolean, 
    required: true }
});

const ProductSchema = new Schema<TProduct>({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'], 
  },
  price: { 
    type: Number, 
    required: [true, 'Price is required'], 
  },
  category: { 
    type: String, 
    required: [true, 'Category is required'],
  },
  tags: { 
    type: [String], 
    required: [true, 'tags is required'],
   },
  variants: { 
    type: [VariantSchema]
    },
  inventory: { 
    type: InventorySchema
   }
});

export const Product = model<TProduct>('Product', ProductSchema);