import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IBlogPostTag extends Document {
    uuid: string;
    blog_post_id: string;
    blog_tag_id: string;
    created_at: Date;
}

const BlogPostTagSchema = new Schema<IBlogPostTag>(
    {
        uuid: {
            type: String,
            default: uuidv4,
            unique: true,
        },
        blog_post_id: {
            type: String,
            required: true,
            ref: 'BlogPost',
        },
        blog_tag_id: {
            type: String,
            required: true,
            ref: 'BlogTag',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
        },
    }
);


BlogPostTagSchema.index({ blog_post_id: 1 });
BlogPostTagSchema.index({ blog_tag_id: 1 });

export default mongoose.models.BlogPostTag ||
    mongoose.model<IBlogPostTag>('BlogPostTag', BlogPostTagSchema);
