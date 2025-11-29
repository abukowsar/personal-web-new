"use client"

import { useState } from "react"
import ImageLightbox from "./image-lightbox"

export default function Blog() {
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean
    imageSrc: string
    imageAlt: string
  }>({
    isOpen: false,
    imageSrc: "",
    imageAlt: "",
  })

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Web Design",
      excerpt: "Exploring emerging trends and technologies that will shape web design in the coming years.",
      category: "Design",
      date: "Nov 28, 2024",
      readTime: "5 min read",
      image: "/modern-web-design.png",
    },
    {
      id: 2,
      title: "React Performance Optimization",
      excerpt: "Best practices and techniques to optimize React applications for better performance.",
      category: "Development",
      date: "Nov 25, 2024",
      readTime: "7 min read",
      image: "/react-optimization.png",
    },
    {
      id: 3,
      title: "Building User-Centric Products",
      excerpt: "How to design products that truly resonate with your target audience.",
      category: "UX",
      date: "Nov 22, 2024",
      readTime: "6 min read",
      image: "/user-centered-design.png",
    },
    {
      id: 4,
      title: "CSS Grid Mastery",
      excerpt: "Advanced CSS Grid techniques to create complex responsive layouts effortlessly.",
      category: "CSS",
      date: "Nov 20, 2024",
      readTime: "8 min read",
      image: "/css-grid-layout.png",
    },
  ]

  const handleImageClick = (imageSrc: string, imageAlt: string) => {
    setLightboxState({
      isOpen: true,
      imageSrc,
      imageAlt,
    })
  }

  const handleCloseLightbox = () => {
    setLightboxState({
      ...lightboxState,
      isOpen: false,
    })
  }

  return (
    <>
      <section
        id="blog"
        className="py-20 px-4 bg-gradient-to-br from-accent/5 to-background transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Latest Blog Posts</h2>
            <p className="text-lg text-muted-foreground">Insights and knowledge shared with the community</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="border border-border rounded-xl overflow-hidden bg-card hover:border-accent transition-all duration-300 hover:shadow-lg group"
              >
                <div
                  className="overflow-hidden bg-muted h-48 cursor-pointer"
                  onClick={() => handleImageClick(post.image, post.title)}
                >
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <time className="text-sm text-muted-foreground">{post.date}</time>
                    <a
                      href="#"
                      className="text-accent font-semibold text-sm hover:gap-2 flex items-center gap-1 transition-all"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              </article>
            ))}
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
  )
}
