/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ImageLightbox from "./image-lightbox";
import blog1 from "@/assets/images/blog/blog/blog1.jpg";
import blog2 from "@/assets/images/blog/blog/blog2.png";
import blog3 from "@/assets/images/blog/blog/blog3.png";

type BlogPost = {
  id: string | number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image?: typeof blog1;
  imageUrl?: string;
  icon: string;
  color: string;
};

const fallbackBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Khoj is an AI-based fact-checking website.",
    excerpt:
      "When you ask Khoj to verify something, it first collects information from the internet, social media, news archives, and multimedia sources.",
    category: "Technology",
    date: "30 Nov, 2025",
    readTime: "5 min read",
    image: blog1,
    icon: "News",
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
    icon: "ICT",
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
    icon: "Tech",
    color: "bg-green-500",
  },
];

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(fallbackBlogPosts);
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    imageSrc: "",
    imageAlt: "",
  });

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const response = await fetch("/api/content/blog");
        const data = await response.json();

        if (Array.isArray(data.items) && data.items.length > 0) {
          setBlogPosts(data.items);
        }
      } catch (error) {
        console.error("Unable to load blog posts:", error);
      }
    };

    loadBlogPosts();
  }, []);

  const openLightbox = (post: BlogPost) => {
    const imageSrc = post.imageUrl || post.image?.src || "";

    if (imageSrc) {
      setLightboxState({ isOpen: true, imageSrc, imageAlt: post.title });
    }
  };

  return (
    <>
      <section
        id="blog"
        className="py-24 px-4 bg-background transition-colors duration-300 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative z-10">
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

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group relative bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
              >
                <div
                  className="relative overflow-hidden h-56 bg-gradient-to-br from-secondary to-muted cursor-pointer"
                  onClick={() => openLightbox(post)}
                >
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    post.image && (
                      <Image
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        width={300}
                        height={300}
                      />
                    )
                  )}

                  <div
                    className={`absolute -bottom-6 -right-6 w-20 h-20 ${post.color} rounded-2xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-300`}
                  >
                    <span className="text-sm font-bold text-white transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                      {post.icon}
                    </span>
                  </div>

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-background/90 backdrop-blur-sm text-foreground rounded-lg text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    <a href="#" className="hover:underline">
                      {post.title}
                    </a>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50 text-xs text-muted-foreground">
                    <time>{post.date}</time>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/news"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:scale-105"
            >
              View All Articles
            </a>
          </div>
        </div>
      </section>

      <ImageLightbox
        isOpen={lightboxState.isOpen}
        imageSrc={lightboxState.imageSrc}
        imageAlt={lightboxState.imageAlt}
        onClose={() => setLightboxState({ ...lightboxState, isOpen: false })}
      />
    </>
  );
}
