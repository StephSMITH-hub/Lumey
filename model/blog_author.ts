import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IBlogAuthor extends Document {
  uuid: string;
  name: string;
  email: string;
  bio?: string | null;
  avatar_url?: string | null;
  created_at: Date;
  updated_at: Date;
}

const BlogAuthorSchema = new Schema<IBlogAuthor>(
  {
    uuid: {
      type: String,
      default: uuidv4,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String, default: null },
    avatar_url: { type: String, default: null },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);


export default mongoose.models.BlogAuthor || mongoose.model<IBlogAuthor>("BlogAuthor", BlogAuthorSchema);
