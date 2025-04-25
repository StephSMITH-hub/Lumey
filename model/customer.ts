import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface ICustomer extends Document {
    uuid: string
    first_name: string
    last_name: string
    email: string
    phone?: string
    address?: string
    city?: string
    state?: string
    country: string
    created_at: Date
    updated_at: Date
}

const CustomerSchema = new Schema<ICustomer>(
    {
        uuid: {
            type: String,
            default: () => uuidv4(),
            unique: true,  
        },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String },
        address: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String, default: 'Nigeria' }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
)

export default mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema)
