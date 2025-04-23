"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

// Mock blog data
const blogPosts = [
  {
    id: "solar-energy-nigeria",
    title:
      "The Future of Solar Energy in Nigeria: Opportunities and Challenges",
    excerpt:
      "Nigeria's abundant sunshine provides a massive opportunity for solar energy adoption. Learn about the current landscape, challenges, and promising developments in Nigeria's solar sector.",
    author: "Abiola Johnson",
    date: "March 28, 2025",
    readTime: "8 min read",
    image: "/images/farm.jpg",
    category: "Industry Insights",
    hasContent: true,
    featured: true,
  },
  {
    id: "powerbox-review",
    title: "Lumey Powerbox 2100 Review: One Month Later",
    excerpt:
      "After using the Lumey Powerbox 2100 for a full month at my small business, here's my comprehensive review of its performance, reliability, and overall value.",
    author: "Emmanuel Okafor",
    date: "April 2, 2025",
    readTime: "6 min read",
    image: "/images/products/2100.jpg",
    category: "Product Reviews",
    hasContent: false,
    featured: true,
  },
  {
    id: "solar-vs-generator",
    title: "Solar Power vs. Generators: Which is Right for Your Home?",
    excerpt:
      "With Nigeria's power challenges, many homeowners are looking for alternatives. We compare the pros and cons of solar power systems and conventional generators.",
    author: "Chioma Eze",
    date: "March 15, 2025",
    readTime: "5 min read",
    image: "/images/hero/hero2.jpg",
    category: "Guides",
    hasContent: false,
    featured: true,
  },
  {
    id: "business-continuity",
    title: "Ensuring Business Continuity with Reliable Power Solutions",
    excerpt:
      "Power outages cost Nigerian businesses billions annually. Discover how the right backup power solution can protect your business operations and boost productivity.",
    author: "Michael Adeyemi",
    date: "April 5, 2025",
    readTime: "7 min read",
    image: "/images/testimonials/business.png",
    category: "Business",
    hasContent: false,
    featured: true,
  },
  {
    id: "solar-myths",
    title: "5 Common Myths About Solar Energy in Nigeria Debunked",
    excerpt:
      "Many misconceptions prevent Nigerians from adopting solar energy. We examine and debunk the five most common myths about solar power systems.",
    author: "Fatima Bello",
    date: "March 10, 2025",
    readTime: "4 min read",
    image: "/images/hero/hero1.jpg",
    category: "Education",
    hasContent: false,
    featured: false,
  },
  {
    id: "maintenance-tips",
    title: "Essential Maintenance Tips for Your Solar Generator",
    excerpt:
      "Maximize the lifespan and efficiency of your solar generator with these simple but effective maintenance practices every owner should know.",
    author: "Uche Okonkwo",
    date: "February 25, 2025",
    readTime: "6 min read",
    image: "/images/products/3300.jpg",
    category: "Maintenance",
    hasContent: false,
    featured: false,
  },
  {
    id: "solar-home",
    title: "How We Powered Our Entire Home with Lumey Solar Solutions",
    excerpt:
      "Follow one family's journey to energy independence as they share their experience transitioning their Lagos home to run entirely on Lumey solar power.",
    author: "The Adebayo Family",
    date: "March 22, 2025",
    readTime: "9 min read",
    image: "/images/hero/hero3.jpg",
    category: "Case Studies",
    hasContent: false,
    featured: false,
  },
  {
    id: "future-tech",
    title: "Future Technologies in Energy Storage: What's Coming Next",
    excerpt:
      "Energy storage technology is evolving rapidly. Explore upcoming innovations that could revolutionize how we store and use renewable energy.",
    author: "Dr. Amina Ibrahim",
    date: "April 8, 2025",
    readTime: "10 min read",
    image: "/images/consultant.jpg",
    category: "Technology",
    hasContent: false,
    featured: false,
  },
];

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

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const isMobile = useIsMobile();

  // Filter blog posts based on search and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Get featured posts
  const featuredPosts = blogPosts.filter((post) => post.featured);

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
                    <input
                      type="text"
                      placeholder="Search for articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-5 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lumey-yellow"
                    />
                    <Search
                      className="absolute right-4 top-3.5 text-gray-400"
                      size={20}
                    />
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
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="rounded-lg overflow-hidden shadow-lg group h-full"
                        >
                          <div className="  h-60 overflow-hidden relative">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-0 right-0 bg-lumey-yellow px-3 py-1 m-4 rounded-full text-xs font-medium">
                              {post.category}
                            </div>
                            {!post.hasContent && (
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
                                post.hasContent
                                  ? "group-hover:text-lumey-orange transition-colors"
                                  : ""
                              }`}
                            >
                              {post.title}
                            </h3>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <div className="flex items-center text-sm text-gray-500 mb-4">
                              <User size={16} className="mr-1" />
                              <span className="mr-4">{post.author}</span>
                              <Calendar size={16} className="mr-1" />
                              <span className="mr-4">{post.date}</span>
                              <Clock size={16} className="mr-1" />
                              <span>{post.readTime}</span>
                            </div>
                            {post.hasContent ? (
                              <Link
                                href={`/blog/${post.id}`}
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
                    {/* <div className="bg-gradient-to-br from-lumey-blue/20 to-lumey-lightblue/20 p-6 rounded-lg shadow-md">
                      <h3 className="text-lg font-bold mb-3">
                        Subscribe to Our Newsletter
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Get the latest articles, news, and updates delivered to
                        your inbox.
                      </p>
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-4 py-2 rounded mb-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lumey-yellow"
                      />
                      <button className="button-primary w-full">
                        Subscribe
                      </button>
                    </div> */}
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
                          <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-lg overflow-hidden shadow-md group h-full border border-gray-100 hover:border-lumey-yellow"
                          >
                            <div className="h-48 overflow-hidden relative">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              {!post.hasContent && (
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
                            <div className="p-5">
                              <div className="flex items-center text-xs text-gray-500 mb-2">
                                <span className="bg-lumey-yellow/20 text-lumey-dark px-2 py-1 rounded-full mr-2">
                                  {post.category}
                                </span>
                                <Clock size={14} className="mr-1" />
                                <span>{post.readTime}</span>
                              </div>
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
                              <div className="flex justify-between items-center">
                                <div className="flex items-center text-xs text-gray-500">
                                  <User size={14} className="mr-1" />
                                  <span>{post.author}</span>
                                </div>
                                {post.hasContent ? (
                                  <Link
                                    href={`/blog/${post.id}`}
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
                            </div>
                          </motion.div>
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
