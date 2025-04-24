import mongoose, { Schema } from "mongoose"
import { v4 as uuidv4 } from 'uuid'

export interface IOrder extends Document {
    _id: string
    customer_id: string
    order_number: string
    order_date: Date
    total_amount: number
    payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
    delivery_status: 'processing' | 'shipped' | 'delivered' | 'cancelled'
    created_at: Date
    updated_at: Date
}

const OrderSchema = new Schema<IOrder>(
    {
        _id: {
            type: String,
            default: () => uuidv4(),
        },
        customer_id: { type: String, required: true, ref: 'Customer' },
        order_number: { type: String, required: true, unique: true },
        order_date: { type: Date, required: true },
        total_amount: { type: Number, required: true },
        payment_status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
        delivery_status: { type: String, enum: ['processing', 'shipped', 'delivered', 'cancelled'], default: 'processing' },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
)

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)