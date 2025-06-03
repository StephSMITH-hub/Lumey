import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author_id: mongoose.Types.ObjectId;
  category_id: mongoose.Types.ObjectId;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  read_time: number;
  published_at: Date;
  image: string;
  tags?: mongoose.Types.ObjectId[];
  author?: {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
  };
  category?: {
    _id: mongoose.Types.ObjectId;
    name: string;
    slug: string;
  };
  tags?: Array<{
    _id: mongoose.Types.ObjectId;
    name: string;
    slug: string;
  }>;
  related_posts?: mongoose.Types.ObjectId[];
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: 'BlogCategory',
      required: true,
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
      required: true,
      min: 1,
    },
    published_at: {
      type: Date,
      default: Date.now,
    },
    image: {
      type: String,
      required: true,
    },
    tags: [{
      type: Schema.Types.ObjectId,
      ref: 'BlogTag',
    }],
    related_posts: [{
      type: Schema.Types.ObjectId,
      ref: 'BlogPost',
    }],
  },
  {
    timestamps: true,
  }
);

// Create indexes
BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ status: 1 });
BlogPostSchema.index({ published_at: -1 });
BlogPostSchema.index({ is_featured: 1 });

// Create the model if it doesn't exist
const BlogPost = mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPost;
