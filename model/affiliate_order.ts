import mongoose, { Document, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IAffiliateOrder extends Document {
    uuid: string
    order_number: string           // e.g. ORD-2026-0801
    customer_name: string
    customer_phone: string
    customer_city_state: string
    powerbox_model: string         // PowerBox 600, PowerBox 1500, etc.
    package_type: 'Box Only' | 'With Solar Panel'
    retail_price: number
    voucher_code_applied?: string  // e.g. LUMEY-CHUKS
    discount_amount: number        // ₦5,000 standard partner discount
    final_amount_paid: number
    affiliate_id?: string          // ref to Affiliate.uuid
    partner_code?: string
    commission_rate_applied: number // e.g. 0.05, 0.075, 0.10, 0.12
    commission_amount: number      // e.g. ₦37,500
    payment_status: 'Pending' | 'Confirmed' | 'Paid'
    order_status: 'Pending' | 'Confirmed' | 'Crated' | 'Dispatched' | 'Delivered' | 'Cancelled'
    payout_id?: string
    is_settled: boolean
    created_at: Date
    updated_at: Date
}

const affiliateOrderSchema = new Schema<IAffiliateOrder>(
    {
        uuid: {
            type: String,
            default: () => uuidv4(),
            unique: true,
        },
        order_number: {
            type: String,
            required: [true, 'Order number is required'],
            unique: true,
            trim: true,
        },
        customer_name: {
            type: String,
            required: [true, 'Customer name is required'],
            trim: true,
        },
        customer_phone: {
            type: String,
            required: [true, 'Customer phone is required'],
            trim: true,
        },
        customer_city_state: {
            type: String,
            required: true,
            trim: true,
        },
        powerbox_model: {
            type: String,
            required: [true, 'PowerBox model is required'],
            trim: true,
        },
        package_type: {
            type: String,
            enum: ['Box Only', 'With Solar Panel'],
            default: 'With Solar Panel',
        },
        retail_price: {
            type: Number,
            required: true,
            min: 0,
        },
        voucher_code_applied: {
            type: String,
            trim: true,
            uppercase: true,
            default: null,
        },
        discount_amount: {
            type: Number,
            default: 5000,
            min: 0,
        },
        final_amount_paid: {
            type: Number,
            required: true,
            min: 0,
        },
        affiliate_id: {
            type: String,
            default: null,
        },
        partner_code: {
            type: String,
            uppercase: true,
            default: null,
        },
        commission_rate_applied: {
            type: Number,
            default: 0.05,
            min: 0,
        },
        commission_amount: {
            type: Number,
            default: 0,
            min: 0,
        },
        payment_status: {
            type: String,
            enum: ['Pending', 'Confirmed', 'Paid'],
            default: 'Confirmed',
        },
        order_status: {
            type: String,
            enum: ['Pending', 'Confirmed', 'Crated', 'Dispatched', 'Delivered', 'Cancelled'],
            default: 'Confirmed',
        },
        payout_id: {
            type: String,
            default: null,
        },
        is_settled: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
)

affiliateOrderSchema.index({ partner_code: 1 })
affiliateOrderSchema.index({ affiliate_id: 1 })
affiliateOrderSchema.index({ order_number: 1 })
affiliateOrderSchema.index({ is_settled: 1 })

export default mongoose.models.AffiliateOrder || mongoose.model<IAffiliateOrder>('AffiliateOrder', affiliateOrderSchema)
