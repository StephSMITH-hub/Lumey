"use client";

import React from "react";
import { Clock, ArrowRight, User, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { blogdata } from "@/data/blogData";

export const FeaturedBlogs = () => {
  const isMobile = useIsMobile();

  // Define the motion properties based on mobile status
  const MotionDiv = isMobile ? "div" : motion.div;
  const motionProps = isMobile
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
      };

  const renderBlogCard = (
    post: {
      id: any;
      title: any;
      excerpt: any;
      author: any;
      date?: string;
      readTime: any;
      image: any;
      category: any;
      hasContent: any;
    },
    index: number
  ) => {
    const cardContent = (
      <div className="h-48 overflow-hidden relative">
        <img
          src={post.image}
          alt={post.title}
          className={`w-full h-full object-cover ${
            post.hasContent
              ? "group-hover:scale-105 transition-transform duration-500"
              : ""
          }`}
        />
        <div className="absolute top-2 right-2 bg-lumey-yellow/90 px-2 py-1 rounded-full text-xs font-medium">
          {post.category}
        </div>
        {!post.hasContent && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white/90 px-3 py-2 rounded-md flex items-center gap-2">
              <AlertCircle size={16} className="text-lumey-orange" />
              <span className="text-sm font-medium">Coming Soon</span>
            </div>
          </div>
        )}
      </div>
    );

    const blogContent = (
      <div className="p-5">
        <h3
          className={`text-lg font-bold mb-2 line-clamp-2 ${
            post.hasContent
              ? "group-hover:text-lumey-orange transition-colors"
              : ""
          }`}
        >
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{post.readTime}</span>
          </div>
        </div>
        {post.hasContent ? (
          <Link
            href={`/blog/${post.id}`}
            className="text-lumey-orange hover:text-lumey-yellow inline-flex items-center text-sm font-medium"
          >
            Read More <ArrowRight size={14} className="ml-1" />
          </Link>
        ) : (
          <span className="text-gray-400 inline-flex items-center text-sm font-medium cursor-not-allowed">
            Coming Soon
          </span>
        )}
      </div>
    );

    return (
      <MotionDiv
        key={post.id}
        {...(isMobile
          ? {}
          : {
              ...motionProps,
              transition: { delay: index * 0.1, duration: 0.5 },
            })}
        className={`bg-white rounded-lg overflow-hidden shadow-md group h-full border border-gray-100 ${
          post.hasContent ? "hover:border-lumey-yellow" : "opacity-85"
        }`}
      >
        {post.hasContent ? (
          <Link href={`/blog/${post.id}`}>{cardContent}</Link>
        ) : (
          cardContent
        )}
        {blogContent}
      </MotionDiv>
    );
  };

  return (
    <section
      id="blog"
      className="bg-gradient-to-br from-lumey-yellow/5 to-lumey-orange/5"
    >
      <div className="section-container">
        <MotionDiv
          {...motionProps}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="heading-md mb-4 font-poppins">Latest from Our Blog</h2>
          <p className="text-lg text-gray-700">
            Insights, guides, and stories about solar energy, power solutions,
            and sustainable living in Nigeria.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogdata.map((post, index) =>
            renderBlogCard({ ...post, hasContent: true }, index)
          )}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="button-primary inline-flex items-center"
          >
            Visit Our Blog
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};
