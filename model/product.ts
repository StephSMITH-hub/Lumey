import mongoose from 'mongoose'
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

const productSchema = new mongoose.Schema<IProduct>(
    {
        uuid: {
            type: String,
            default: () => uuidv4(),
        },
        model_id: {
            type: String,
            required: [true, 'Model ID is required'],
            unique: true,
            trim: true
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true
        },
        specifications: {
            type: Map,
            of: String,
            default: {}
        },
        base_price: {
            type: Number,
            required: [true, 'Base price is required'],
            min: [0, 'Base price cannot be negative']
        },
        with_panel_price: {
            type: Number,
            required: [true, 'Price with panel is required'],
            min: [0, 'Price with panel cannot be negative']
        },
        complete_package_price: { type: Number, default: null },
        capacity: {
            type: String,
            required: [true, 'Capacity is required'],
            trim: true
        },
        power: {
            type: String,
            required: [true, 'Power rating is required'],
            trim: true
        },
        image_url: {
            type: String,
            required: [true, 'Image URL is required'],
            trim: true
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            trim: true
        },
        status: {
            type: String,
            required: [true, 'Status is required'],
            enum: ['In Stock', 'Low Stock', 'Out of Stock'],
            default: 'In Stock'
        },
    },
    {
        timestamps: true
    }
)

// Create and export the Product model
const Product = mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product
