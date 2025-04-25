import mongoose, { Schema } from "mongoose"
import { v4 as uuidv4 } from 'uuid'

export interface IProduct extends Document {
    uuid: string
    model_id: string
    name: string
    description?: string
    specifications?: object
    base_price: number
    with_panel_price?: number
    complete_package_price?: number
    capacity: string
    power: string
    image_url?: string
    created_at: Date
    updated_at: Date
}

const ProductSchema = new Schema<IProduct>(
    {
        uuid: {
            type: String,
            default: () => uuidv4(),
        },
        model_id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        description: { type: String, default: null },
        specifications: { type: Object, default: null },
        base_price: { type: Number, required: true },
        with_panel_price: { type: Number, default: null },
        complete_package_price: { type: Number, default: null },
        capacity: { type: String, required: true },
        power: { type: String, required: true },
        image_url: { type: String, default: null },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
)

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)
