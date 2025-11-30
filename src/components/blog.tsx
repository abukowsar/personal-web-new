/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import ImageLightbox from "./image-lightbox";
import blog1 from "@/assets/images/blog/blog/blog1.jpg";
import blog2 from "@/assets/images/blog/blog/blog2.png";
import blog3 from "@/assets/images/blog/blog/blog3.png";
import Image from "next/image";

export default function Blog() {
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    imageSrc: string;
    imageAlt: string;
  }>({
    isOpen: false,
    imageSrc: "",
    imageAlt: "",
  });

  const blogPosts = [
    {
      id: 1,
      title:
        "IEEE websites place cookies on your device to give you the best user experience",
      excerpt:
        "Understanding how IEEE enhances user experience through modern web technologies and cookie management systems for personalized content delivery.",
      category: "Technology",
      date: "10 Jan, 2025",
      readTime: "5 min read",
      image: blog1,
      icon: "🌐",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title:
        "ICT-Learning is an international forum for the presentation and discussion of recent advances",
      excerpt:
        "Exploring the latest innovations in Information and Communication Technology through collaborative learning platforms and knowledge sharing forums.",
      category: "Education",
      date: "28 Sep, 2024",
      readTime: "7 min read",
      image: blog2,
      icon: "📱",
      color: "bg-purple-500",
    },
    {
      id: 3,
      title: "'Smart Haat' for safe purchase and sale of sacrificial animals",
      excerpt:
        "Revolutionary digital platform transforming traditional livestock markets with technology-driven solutions for secure and transparent transactions.",
      category: "Innovation",
      date: "15 Jul, 2024",
      readTime: "6 min read",
      image: blog3,
      icon: "🚀",
      color: "bg-green-500",
    },
    {
      id: 4,
      title: "Digital Transformation in Government Services",
      excerpt:
        "How e-governance initiatives are reshaping public service delivery through innovative digital solutions and citizen-centric approaches.",
      category: "GovTech",
      date: "5 Jun, 2024",
      readTime: "8 min read",
      image: blog2,
      icon: "🏛️",
      color: "bg-orange-500",
    },
    {
      id: 5,
      title: "Cybersecurity Best Practices for Modern Organizations",
      excerpt:
        "Essential security measures and protocols to protect digital assets in an increasingly connected world.",
      category: "Security",
      date: "20 May, 2024",
      readTime: "10 min read",
      image: blog1,
      icon: "🔐",
      color: "bg-red-500",
    },
    {
      id: 6,
      title: "AI-Powered Project Management Tools",
      excerpt:
        "Leveraging artificial intelligence to streamline project workflows, enhance team collaboration, and improve delivery outcomes.",
      category: "AI/ML",
      date: "12 Apr, 2024",
      readTime: "6 min read",
      image: blog3,
      icon: "🤖",
      color: "bg-cyan-500",
    },
  ];

  const handleImageClick = (imageSrc: string, imageAlt: string) => {
    setLightboxState({
      isOpen: true,
      imageSrc,
      imageAlt,
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState({
      ...lightboxState,
      isOpen: false,
    });
  };

  return (
    <>
      <section
        id="blog"
        className="py-24 px-4 bg-background transition-colors duration-300 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Blog
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4">
              Regular News
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive up-to-date news coverage, aggregated from sources
              all over the world.
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group relative bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
              >
                {/* Image Container */}
                <div
                  className="relative overflow-hidden h-56 bg-gradient-to-br from-secondary to-muted cursor-pointer"
                  onClick={() => handleImageClick(post.image.src, post.title)}
                >
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    width={300}
                    height={300}
                    onClick={() => handleImageClick(post.image.src, post.title)}
                  />

                  {/* Icon Badge */}
                  <div
                    className={`absolute -bottom-6 -right-6 w-20 h-20 ${post.color} rounded-2xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-300`}
                  >
                    <span className="text-3xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                      {post.icon}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-background/90 backdrop-blur-sm text-foreground rounded-lg text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    <a href="#" className="hover:underline">
                      {post.title}
                    </a>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <time className="text-xs text-muted-foreground">
                        {post.date}
                      </time>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-xs text-muted-foreground">
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay Effect */}
                <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-2xl transition-all duration-300 pointer-events-none" />
              </article>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:scale-105">
              View All Articles
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <ImageLightbox
        isOpen={lightboxState.isOpen}
        imageSrc={lightboxState.imageSrc}
        imageAlt={lightboxState.imageAlt}
        onClose={handleCloseLightbox}
      />
    </>
  );
}
