import mongoose, { Schema } from "mongoose"
import { v4 as uuidv4 } from 'uuid'

export interface IProductUnit extends Document {
    _id: string
    serial_number: string
    product_id: string
    manufacture_date: Date
    status: 'in_stock' | 'sold' | 'defective' | 'returned'
    created_at: Date
    updated_at: Date
}

const ProductUnitSchema = new Schema<IProductUnit>(
    {
        _id: {
            type: String,
            default: () => uuidv4(),
        },
        serial_number: { type: String, required: true, unique: true },
        product_id: { type: String, required: true, ref: 'Product' },
        manufacture_date: { type: Date, required: true },
        status: { type: String, enum: ['in_stock', 'sold', 'defective', 'returned'], default: 'in_stock' },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
)

export default mongoose.models.ProductUnit || mongoose.model<IProductUnit>('ProductUnit', ProductUnitSchema)
