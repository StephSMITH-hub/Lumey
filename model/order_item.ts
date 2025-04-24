import mongoose, { Schema } from "mongoose"
import { v4 as uuidv4 } from 'uuid'

export interface IOrderItem extends Document {
    _id: string
    order_id: string
    product_unit_id: string
    price: number
    warranty_start_date?: Date
    warranty_end_date?: Date
    created_at: Date
    updated_at: Date
}

const OrderItemSchema = new Schema<IOrderItem>(
    {
        _id: {
            type: String,
            default: () => uuidv4(),
        },
        order_id: { type: String, required: true, ref: 'Order' },
        product_unit_id: { type: String, required: true, ref: 'ProductUnit' },
        price: { type: Number, required: true },
        warranty_start_date: { type: Date, default: null },
        warranty_end_date: { type: Date, default: null },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
)

export default mongoose.models.OrderItem || mongoose.model<IOrderItem>('OrderItem', OrderItemSchema)
