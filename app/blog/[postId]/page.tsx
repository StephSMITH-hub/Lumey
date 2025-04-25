"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Clock,
  Calendar,
  User,
  ArrowLeft,
  Share2,
  BookmarkPlus,
  Tag,
  MessageSquare,
} from "lucide-react";
import { useParams } from "next/navigation";
import { blogdata } from "@/data/blogData";
import MDEditor from "@uiw/react-md-editor";

// Mock blog data - this would typically come from an API

// Create related posts from the existing blog posts
const relatedPosts = blogdata
  .filter((post) => post.id !== "solar-energy-nigeria")
  .slice(0, 3);

const BlogDetail = () => {
  const { postId } = useParams();
  console.log(useParams());
  const [post, setPost] = useState<
    | {
        id: string;
        title: string;
        excerpt: string;
        author: string;
        date: string;
        readTime: string;
        image: string;
        category: string;
        content: string;
      }
    | undefined
  >();
  const isMobile = useIsMobile();

  useEffect(() => {
    const foundPost = blogdata.find((p) => p.id === postId);
    setPost(foundPost);
  }, [postId]);

  // Define the container component based on mobile status
  const ContainerComponent = isMobile ? "div" : motion.div;
  const containerProps = isMobile
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.5 },
      };

  if (!post) {
    return (
      <div className="w-full overflow-x-hidden">
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="bg-white p-10 rounded-lg shadow-md text-center">
              <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
              <p className="mb-6">
                The blog post you're looking for doesn't exist or has been
                removed.
              </p>
              <Link href="/blog" className="button-primary">
                <ArrowLeft size={16} className="mr-2" />
                Back to Blog
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden">
      <AnimatePresence mode="wait">
        <ContainerComponent {...containerProps}>
          <main className="pt-28 md:pt-32 lg:pt-36">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-lumey-yellow/10 to-lumey-orange/10 py-8">
              <div className="container mx-auto px-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center text-lumey-dark/70 hover:text-lumey-orange mb-6"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back to All Articles
                </Link>
                <div className="max-w-4xl">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-lumey-yellow/20 text-lumey-dark px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center">
                      <Clock size={14} className="mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                    {post.title}
                  </h1>
                  <div className="flex items-center mb-8">
                    <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      <User className="text-gray-500" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">{post.author}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {post.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Content */}
            <section className="py-12">
              <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Article Content */}
                  <div className="lg:w-2/3">
                    <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="blog-content prose prose-lg max-w-none mb-8">
                      <MDEditor.Markdown source={post.content} />
                    </div>

                    <div className="border-t border-b border-gray-200 py-6 my-8">
                      <div className="flex flex-wrap items-center justify-between">
                        <div className="mb-4 md:mb-0">
                          <p className="text-gray-500 mb-2">
                            Share this article:
                          </p>
                          <div className="flex space-x-3">
                            <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-lumey-yellow/20 flex items-center justify-center transition-colors">
                              <Share2 size={18} />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-lumey-yellow/20 flex items-center justify-center transition-colors">
                              <MessageSquare size={18} />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-lumey-yellow/20 flex items-center justify-center transition-colors">
                              <BookmarkPlus size={18} />
                            </button>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-2">Tags:</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                              Solar Energy
                            </span>
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                              Nigeria
                            </span>
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                              Renewable
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Author Bio */}
                    <div className="bg-gray-50 p-6 rounded-lg mb-10">
                      <div className="flex items-start gap-4">
                        <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="text-gray-500" size={32} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">
                            About {post.author}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {post.author} is a renewable energy specialist with
                            over 10 years of experience in the Nigerian energy
                            sector. Their expertise includes solar system
                            design, energy policy, and sustainable development.
                          </p>
                          <button className="text-lumey-orange hover:text-lumey-yellow transition-colors font-medium">
                            View all articles by this author
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="lg:w-1/3">
                    <div className="sticky top-32">
                      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <h3 className="text-lg font-bold mb-4">
                          Table of Contents
                        </h3>
                        <ul className="space-y-2">
                          <li>
                            <a
                              href="#"
                              className="text-lumey-dark hover:text-lumey-orange transition-colors"
                            >
                              The Current Landscape
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-lumey-dark hover:text-lumey-orange transition-colors"
                            >
                              Growth of Solar Adoption
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-lumey-dark hover:text-lumey-orange transition-colors"
                            >
                              Key Challenges
                            </a>
                            <ul className="ml-4 mt-2 space-y-1">
                              <li>
                                <a
                                  href="#"
                                  className="text-gray-600 hover:text-lumey-orange transition-colors text-sm"
                                >
                                  Initial Investment Costs
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="text-gray-600 hover:text-lumey-orange transition-colors text-sm"
                                >
                                  Technical Expertise Gap
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="text-gray-600 hover:text-lumey-orange transition-colors text-sm"
                                >
                                  Quality Control Issues
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="text-gray-600 hover:text-lumey-orange transition-colors text-sm"
                                >
                                  Policy and Regulatory Framework
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-lumey-dark hover:text-lumey-orange transition-colors"
                            >
                              Opportunities on the Horizon
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-lumey-dark hover:text-lumey-orange transition-colors"
                            >
                              The Road Ahead
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-lumey-dark hover:text-lumey-orange transition-colors"
                            >
                              Conclusion
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <h3 className="text-lg font-bold mb-4">
                          Related Articles
                        </h3>
                        <div className="space-y-4">
                          {relatedPosts.map((relatedPost) => (
                            <div key={relatedPost.id} className="flex gap-3">
                              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                  src={relatedPost.image}
                                  alt={relatedPost.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium text-sm mb-1 line-clamp-2">
                                  <Link
                                    href={`/blog/${relatedPost.id}`}
                                    className="hover:text-lumey-orange transition-colors"
                                  >
                                    {relatedPost.title}
                                  </Link>
                                </h4>
                                <p className="text-xs text-gray-500">
                                  {relatedPost.date}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-lumey-yellow/20 to-lumey-orange/20 p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-bold mb-3">
                          Subscribe to Our Newsletter
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Get the latest articles and news delivered to your
                          inbox.
                        </p>
                        <input
                          type="email"
                          placeholder="Your email address"
                          className="w-full px-4 py-2 rounded mb-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lumey-yellow"
                        />
                        <button className="button-primary w-full">
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* More Articles Section */}
            <section className="py-12 bg-gray-50">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-8">
                  More Articles You May Like
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white rounded-lg overflow-hidden shadow-md group border border-gray-100 hover:border-lumey-yellow"
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <span className="bg-lumey-yellow/20 text-lumey-dark px-2 py-1 rounded-full mr-2">
                            {post.category}
                          </span>
                          <Clock size={14} className="mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2 group-hover:text-lumey-orange transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center text-xs text-gray-500">
                            <User size={14} className="mr-1" />
                            <span>{post.author}</span>
                          </div>
                          <Link
                            href={`/blog/${post.id}`}
                            className="text-lumey-orange hover:text-lumey-yellow inline-flex items-center text-sm font-medium"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </ContainerComponent>
      </AnimatePresence>
    </div>
  );
};

export default BlogDetail;
