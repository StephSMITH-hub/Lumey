import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IBlogPost extends Document {
    uuid: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author_id: mongoose.Schema.Types.ObjectId; 
    category_id: mongoose.Schema.Types.ObjectId; 
    status: string;
    is_featured: boolean;
    read_time: number;
    published_at: string;
}

const BlogPostSchema = new Schema<IBlogPost>(
    {
        uuid: {
            type: String,
            default: uuidv4,
            unique: true,
        },
        slug: { type: String, required: true },
        title: { type: String, required: true },
        excerpt: { type: String, required: true },
        content: { type: String, required: true },
        author_id: { type: String, required: true },
        category_id: { type: String, required: true },
        status: { type: String, default: 'draft' },
        is_featured: { type: Boolean, default: false },
        read_time: { type: Number },
        published_at: { type: String },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
