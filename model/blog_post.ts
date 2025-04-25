import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IBlogPost extends Document {
    uuid: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    featured_image_url?: string;
    author_id: string;
    category_id: string;
    status: 'draft' | 'published' | 'archived';
    is_featured: boolean;
    read_time?: number;
    published_at?: Date;
    created_at: Date;
    updated_at: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
    {
        uuid: {
            type: String,
            default: uuidv4,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        title: {
            type: String,
            required: true
        },
        excerpt: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        featured_image_url: String,
        author_id: {
            type: String,
            required: true,
            ref: 'BlogAuthor',
        },
        category_id: {
            type: String,
            required: true,
            ref: 'BlogCategory',
        },
        status: {
            type: String,
            enum: ['draft', 'published', 'archived'],
            default: 'draft',
        },
        is_featured: {
            type: Boolean,
            default: false,
        },
        read_time: {
            type: Number,
            default: 0
        },
        published_at: Date,
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

BlogPostSchema.index({ slug: 1 }, { unique: true });
BlogPostSchema.index({ author_id: 1 });
BlogPostSchema.index({ category_id: 1 });
BlogPostSchema.index({ is_featured: 1 }, { partialFilterExpression: { is_featured: true } });

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
