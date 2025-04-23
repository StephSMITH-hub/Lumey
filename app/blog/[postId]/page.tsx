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

// Mock blog data - this would typically come from an API
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
    featured: true,
    content: `
      <p>Nigeria, often called the "Giant of Africa," receives an average of 6.5 hours of sunshine daily, making it an ideal location for solar energy adoption. Despite this natural advantage, the country still grapples with significant power challenges that affect both residential and commercial sectors.</p>
      
      <h2>The Current Landscape</h2>
      <p>As of 2025, Nigeria's power generation capacity stands at approximately 12,500 megawatts, but distribution rarely exceeds 5,000 megawatts due to infrastructure limitations. This significant gap has created a market where over 40% of the population lacks access to reliable electricity, and those connected to the grid face frequent outages.</p>
      
      <p>The reliance on diesel and petrol generators has become the norm for businesses and middle to upper-class homes, bringing with it high operational costs and environmental concerns. This is where solar energy presents a compelling alternative.</p>
      
      <h2>Growth of Solar Adoption</h2>
      <p>In recent years, we've witnessed a gradual shift toward solar solutions across various sectors:</p>
      
      <ul>
        <li><strong>Residential Adoption:</strong> More households are investing in small to medium-sized solar systems as prices have decreased by almost 40% since 2020.</li>
        <li><strong>Commercial Integration:</strong> Businesses, particularly in the telecommunications, banking, and retail sectors, have begun integrating solar into their energy mix to reduce operational costs.</li>
        <li><strong>Rural Electrification:</strong> Government initiatives and private investments have focused on providing solar solutions to rural communities, bypassing the need for traditional grid infrastructure.</li>
      </ul>
      
      <h2>Key Challenges</h2>
      <p>Despite the positive trajectory, several challenges still hinder widespread adoption:</p>
      
      <h3>1. Initial Investment Costs</h3>
      <p>While prices have decreased, the upfront cost of quality solar systems remains prohibitive for many Nigerians, especially when compared to the initial cost of conventional generators.</p>
      
      <h3>2. Technical Expertise Gap</h3>
      <p>There's a shortage of qualified technicians for installation and maintenance, leading to poor system performance and reduced confidence in the technology.</p>
      
      <h3>3. Quality Control Issues</h3>
      <p>The market is flooded with substandard products, particularly batteries and inverters, which negatively impact the performance and lifespan of solar installations.</p>
      
      <h3>4. Policy and Regulatory Framework</h3>
      <p>While progress has been made, Nigeria still lacks a comprehensive policy framework that actively encourages solar adoption through incentives like tax breaks or subsidies.</p>
      
      <h2>Opportunities on the Horizon</h2>
      <p>Despite these challenges, several promising developments suggest a bright future for solar energy in Nigeria:</p>
      
      <h3>Pay-As-You-Go Models</h3>
      <p>Innovative financing schemes that allow users to pay for solar systems in installments have begun to address the initial cost barrier, making solar more accessible to a broader demographic.</p>
      
      <h3>Local Manufacturing</h3>
      <p>The emergence of local assembly plants for solar components is gradually reducing import costs and creating jobs while building technical expertise within the country.</p>
      
      <h3>Government Commitment</h3>
      <p>Recent government initiatives, including the Solar Power Naija program, aim to provide solar access to 25 million Nigerians and create up to 250,000 jobs in the energy sector.</p>
      
      <h3>International Investment</h3>
      <p>Foreign direct investment in Nigeria's renewable energy sector has seen a significant uptick, with several international companies establishing partnerships with local firms.</p>
      
      <h2>The Road Ahead</h2>
      <p>For Nigeria to fully capitalize on its solar potential, a multi-faceted approach is necessary:</p>
      
      <ol>
        <li>Strengthened regulatory frameworks that protect consumers while encouraging investment</li>
        <li>Expanded access to financing for both consumers and businesses interested in solar adoption</li>
        <li>Investment in technical training programs to build local expertise</li>
        <li>Public awareness campaigns to educate Nigerians about the long-term benefits of solar energy</li>
      </ol>
      
      <p>At Lumey Energy, we're committed to being part of this transformation, providing high-quality solar solutions that address the unique energy challenges faced by Nigerians. Our range of solar generators and power stations are designed with the Nigerian context in mind, offering reliable performance even in challenging conditions.</p>
      
      <h2>Conclusion</h2>
      <p>The future of solar energy in Nigeria stands at a critical juncture. With the right policies, investments, and market approaches, solar has the potential to revolutionize Nigeria's energy landscape, providing clean, reliable power to millions while creating economic opportunities and reducing environmental impact.</p>
      
      <p>The question isn't whether solar will play a significant role in Nigeria's energy future, but rather how quickly and effectively we can overcome the existing barriers to widespread adoption.</p>
    `,
  },
  // Add more blog posts with content as needed
];

// Create related posts from the existing blog posts
const relatedPosts = blogPosts
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
        featured: boolean;
        content: string;
      }
    | undefined
  >();
  const isMobile = useIsMobile();

  useEffect(() => {
    console.log(postId);
    // In a real app, you would fetch the blog post from an API
    // For now, we'll use our mock data
    const foundPost = blogPosts.find((p) => p.id === postId);
    setPost(foundPost);

    // Scroll to the top when the page loads
    window.scrollTo(0, 0);
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

                    <div
                      className="blog-content prose prose-lg max-w-none mb-8"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />

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
                      {/* Table of Contents */}
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

                      {/* Related Articles */}
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

                      {/* Newsletter Subscription */}
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
