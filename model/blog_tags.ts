import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IBlogTag extends Document {
    uuid: string;
    name: string;
    slug: string;
    created_at: Date;
    updated_at: Date;
}

const BlogTagSchema = new Schema<IBlogTag>(
    {
        uuid: {
            type: String,
            default: () => uuidv4(),
            unique: true,
        },
        name: { 
            type: String, 
            required: true, 
            unique: true 
        },
        slug: { 
            type: String, 
            required: true, 
            unique: true 
        },
    },
    {
        timestamps: {
            createdAt: 'created_at', 
            updatedAt: 'updated_at', 
        },
    }
);


export default mongoose.models.BlogTag || mongoose.model<IBlogTag>('BlogTag', BlogTagSchema);
