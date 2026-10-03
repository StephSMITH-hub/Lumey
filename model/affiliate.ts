import mongoose, { Document, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IAffiliateBankDetails {
    bank_name: string
    nuban_account_number: string
    account_name_resolved: string
    is_verified: boolean
    created_at?: Date
}

export interface IAffiliate extends Document {
    uuid: string
    partner_id: string          // e.g. LUM-7842
    full_name: string
    whatsapp_phone: string
    city_state: string
    promotion_channel: string   // WhatsApp Status, Instagram, Tech Group, etc.
    custom_handle: string       // e.g. CHUKS
    partner_code: string        // e.g. LUMEY-CHUKS
    referral_link: string
    tier: 'Starter (5.0%)' | 'Active (7.5%)' | 'Pro (10.0%)' | 'Ambassador (12.0%)'
    commission_rate: number     // 0.05, 0.075, 0.10, 0.12
    total_sales_count: number
    total_revenue_generated: number
    total_commission_earned: number
    bank_details?: IAffiliateBankDetails
    is_active: boolean
    created_at: Date
    updated_at: Date
}

const affiliateBankSchema = new Schema<IAffiliateBankDetails>(
    {
        bank_name: { type: String, required: true, trim: true },
        nuban_account_number: { type: String, required: true, trim: true },
        account_name_resolved: { type: String, required: true, trim: true },
        is_verified: { type: Boolean, default: true },
        created_at: { type: Date, default: Date.now }
    },
    { _id: false }
)

const affiliateSchema = new Schema<IAffiliate>(
    {
        uuid: {
            type: String,
            default: () => uuidv4(),
            unique: true,
        },
        partner_id: {
            type: String,
            required: [true, 'Partner ID is required'],
            unique: true,
            trim: true,
        },
        full_name: {
            type: String,
            required: [true, 'Full name is required'],
            trim: true,
        },
        whatsapp_phone: {
            type: String,
            required: [true, 'WhatsApp phone is required'],
            unique: true,
            trim: true,
        },
        city_state: {
            type: String,
            required: [true, 'City and state are required'],
            trim: true,
        },
        promotion_channel: {
            type: String,
            required: [true, 'Promotion channel is required'],
            trim: true,
        },
        custom_handle: {
            type: String,
            required: [true, 'Custom handle is required'],
            trim: true,
        },
        partner_code: {
            type: String,
            required: [true, 'Partner code is required'],
            unique: true,
            trim: true,
            uppercase: true,
        },
        referral_link: {
            type: String,
            required: [true, 'Referral link is required'],
            trim: true,
        },
        tier: {
            type: String,
            enum: ['Starter (5.0%)', 'Active (7.5%)', 'Pro (10.0%)', 'Ambassador (12.0%)'],
            default: 'Starter (5.0%)',
        },
        commission_rate: {
            type: Number,
            default: 0.05,
            min: 0.05,
            max: 0.12,
        },
        total_sales_count: {
            type: Number,
            default: 0,
            min: 0,
        },
        total_revenue_generated: {
            type: Number,
            default: 0,
            min: 0,
        },
        total_commission_earned: {
            type: Number,
            default: 0,
            min: 0,
        },
        bank_details: {
            type: affiliateBankSchema,
            default: null,
        },
        is_active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
)

affiliateSchema.index({ partner_code: 1 })
affiliateSchema.index({ whatsapp_phone: 1 })
affiliateSchema.index({ partner_id: 1 })

export default mongoose.models.Affiliate || mongoose.model<IAffiliate>('Affiliate', affiliateSchema)
