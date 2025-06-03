import React from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

interface BlogCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  author,
  date,
  readTime,
  image,
  category,
  slug,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
    >
      <Link href={`/blog/${slug}`}>
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6">
          <div className="text-sm text-lumey-orange font-medium mb-2">
            {category}
          </div>
          <h3 className="text-lg font-bold mb-2 group-hover:text-lumey-orange transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{excerpt}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{author}</span>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard; 