"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { Metadata } from "next";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Search,
  Clock,
  ArrowRight,
  BookOpen,
  User,
  Calendar,
  Tag,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { FloatingCTA, Footer, Header } from "@/components";
import { useBlogs } from "@/hooks/useBlogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BlogCard from "@/components/BlogCard";

const categories = [
  "All Categories",
  "Industry Insights",
  "Product Reviews",
  "Guides",
  "Business",
  "Education",
  "Maintenance",
  "Case Studies",
  "Technology",
];

// export const metadata: Metadata = {
//   title: "Blog | Lumey Energy",
//   description: "Stay updated with the latest news and insights from Lumey Energy",
// };

const Blog = () => {
  const { blogs, isLoading, error } = useBlogs();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const isMobile = useIsMobile();

  // Filter blog posts based on search and category
  const filteredPosts = blogs.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      post.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Get featured posts
  const featuredPosts = blogs.filter((post) => post.is_featured).slice(0, 4);

  // Format date helper
  const formatDate = (date: string | Date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden">
      <AnimatePresence mode="wait">
        <ContainerComponent {...containerProps}>
          <Header />
          <main className="pt-28 md:pt-32 lg:pt-36">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-lumey-yellow/20 to-lumey-orange/20 py-10 md:py-16">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                  <h1 className="text-3xl md:text-5xl font-bold mb-6">
                    Lumey Energy Blog
                  </h1>
                  <p className="text-lg text-gray-700 mb-8">
                    Insights, guides, and stories about solar energy, power
                    solutions, and sustainable living in Nigeria.
                  </p>
                  <div className="relative max-w-2xl mx-auto">
                    <div className="flex gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          type="text"
                          placeholder="Search articles..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Button variant="outline">Filter</Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Posts */}
            {featuredPosts.length > 0 &&
              !searchTerm &&
              selectedCategory === "All Categories" && (
                <section className="py-12 bg-white">
                  <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-8">
                      Featured Articles
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {featuredPosts.slice(0, 2).map((post) => (
                        <motion.div
                          key={post._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="rounded-lg overflow-hidden shadow-lg group h-full"
                        >
                          <div className="h-60 overflow-hidden relative">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-0 right-0 bg-lumey-yellow px-3 py-1 m-4 rounded-full text-xs font-medium">
                              {post.category?.name}
                            </div>
                            {!post.content && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <div className="bg-white/90 px-3 py-2 rounded-md flex items-center gap-2">
                                  <AlertCircle
                                    size={16}
                                    className="text-lumey-orange"
                                  />
                                  <span className="text-sm font-medium">
                                    Coming Soon
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <h3
                              className={`text-lg font-bold mb-2 line-clamp-2 ${
                                post.content
                                  ? "group-hover:text-lumey-orange transition-colors"
                                  : ""
                              }`}
                            >
                              {post.title}
                            </h3>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <div className="flex items-center text-sm text-gray-500 mb-4">
                              <User size={16} className="mr-1" />
                              <span className="mr-4">{post.author?.name}</span>
                              <Calendar size={16} className="mr-1" />
                              <span className="mr-4">
                                {formatDate(post.published_at)}
                              </span>
                              <Clock size={16} className="mr-1" />
                              <span>{post.read_time} min read</span>
                            </div>
                            {post.content ? (
                              <Link
                                href={`/blog/${post.slug}`}
                                className="text-lumey-orange hover:text-lumey-yellow inline-flex items-center text-sm font-medium"
                              >
                                Read More{" "}
                                <ArrowRight size={14} className="ml-1" />
                              </Link>
                            ) : (
                              <span className="text-gray-400 inline-flex items-center text-sm font-medium cursor-not-allowed">
                                Coming Soon
                              </span>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

            {/* Main Content */}
            <section className="py-12 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Sidebar */}
                  <div className="md:w-1/4">
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                      <h3 className="text-lg font-bold mb-4">Categories</h3>
                      <ul className="space-y-2">
                        {categories.map((category) => (
                          <li key={category}>
                            <button
                              onClick={() => setSelectedCategory(category)}
                              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                                selectedCategory === category
                                  ? "bg-lumey-yellow/20 text-lumey-dark font-medium"
                                  : "hover:bg-gray-100"
                              }`}
                            >
                              {category}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Articles */}
                  <div className="md:w-3/4">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">
                        {searchTerm
                          ? "Search Results"
                          : selectedCategory !== "All Categories"
                          ? selectedCategory
                          : "Latest Articles"}
                      </h2>
                      <p className="text-gray-500">
                        {filteredPosts.length} articles
                      </p>
                    </div>

                    {filteredPosts.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredPosts.map((post) => (
                          <BlogCard
                            key={post._id}
                            title={post.title}
                            excerpt={post.excerpt}
                            author={post.author?.name || "Unknown Author"}
                            date={formatDate(post.published_at)}
                            readTime={`${post.read_time} min read`}
                            image={post.image}
                            category={post.category?.name || "Uncategorized"}
                            slug={post.slug}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white p-10 rounded-lg text-center">
                        <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold mb-2">
                          No articles found
                        </h3>
                        <p className="text-gray-600">
                          We couldn't find any articles matching your search
                          criteria. Try different keywords or browse all
                          categories.
                        </p>
                        <button
                          onClick={() => {
                            setSearchTerm("");
                            setSelectedCategory("All Categories");
                          }}
                          className="button-secondary mt-4"
                        >
                          View All Articles
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Subscribe Banner */}
            <section className="py-12 bg-gradient-to-r from-lumey-yellow to-lumey-orange">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Stay Updated with the Latest in Solar Energy
                </h2>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  Join our community to receive expert tips, exclusive content,
                  and updates on the newest solar technologies and products.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="px-4 py-3 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="bg-lumey-dark text-white hover:bg-black px-6 py-3 rounded-lg font-medium transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </section>
          </main>
          <Footer />
          <FloatingCTA />
        </ContainerComponent>
      </AnimatePresence>
    </div>
  );
};

export default Blog;
