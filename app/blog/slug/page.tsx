"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Clock,
  User,
  Calendar,
  Tag,
  ArrowLeft,
  Share2,
  BookmarkPlus,
} from "lucide-react";
import Link from "next/link";
import { FloatingCTA, Footer, Header } from "@/components";
import { useBlogs } from "@/hooks/useBlogs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const BlogPost = () => {
  const { slug } = useParams();
  const { blogs, isLoading, error } = useBlogs();
  const isMobile = useIsMobile();

  // Find the current blog post
  const post = blogs.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

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
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
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

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Post Not Found</h2>
          <p className="text-gray-600 mb-4">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/blog">
            <Button variant="outline">Back to Blog</Button>
          </Link>
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
                <div className="max-w-4xl mx-auto">
                  <Link
                    href="/blog"
                    className="inline-flex items-center text-gray-600 hover:text-lumey-orange mb-6"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Blog
                  </Link>
                  <h1 className="text-3xl md:text-5xl font-bold mb-6">
                    {post.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8">
                    <div className="flex items-center">
                      <User size={16} className="mr-2" />
                      <span>{post.author?.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      <span>
                        {new Date(post.published_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2" />
                      <span>{post.read_time} min read</span>
                    </div>
                    {post.category && (
                      <div className="flex items-center">
                        <Tag size={16} className="mr-2" />
                        <span>{post.category.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm">
                      <Share2 size={16} className="mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <BookmarkPlus size={16} className="mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Content Section */}
            <section className="py-12">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <div className="aspect-video rounded-lg overflow-hidden mb-8">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="prose prose-lg max-w-none">
                    {post.content ? (
                      <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    ) : (
                      <div className="text-center py-12">
                        <h3 className="text-xl font-bold mb-4">Coming Soon</h3>
                        <p className="text-gray-600">
                          This article is currently being written. Check back soon!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Related Posts */}
            {post.related_posts && post.related_posts.length > 0 && (
              <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {post.related_posts.map((relatedPost) => (
                        <Link
                          key={relatedPost._id}
                          href={`/blog/${relatedPost.slug}`}
                          className="group"
                        >
                          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                            <div className="aspect-video">
                              <img
                                src={relatedPost.image}
                                alt={relatedPost.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="p-6">
                              <h3 className="text-lg font-bold mb-2 group-hover:text-lumey-orange transition-colors">
                                {relatedPost.title}
                              </h3>
                              <p className="text-gray-600 text-sm mb-4">
                                {relatedPost.excerpt}
                              </p>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock size={14} className="mr-1" />
                                <span>{relatedPost.read_time} min read</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </main>
          <Footer />
          <FloatingCTA />
        </ContainerComponent>
      </AnimatePresence>
    </div>
  );
};

export default BlogPost; 