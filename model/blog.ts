import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  readTime: {
    type: String,
    required: [true, 'Read time is required'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  }
}, {
  timestamps: true
});

// Create and export the Blog model
const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog; 