"use client";
import { useState } from "react";
import Image from "next/image";
import { Star, BookOpen, Download, ExternalLink } from "lucide-react";

// Import book cover images (using project images as placeholders)
import book1 from "@/assets/images/projects/img-1.jpg";
import book2 from "@/assets/images/projects/img-2.png";
import book3 from "@/assets/images/projects/img-3.png";
import book4 from "@/assets/images/projects/img-4.png";

export default function Books() {
  const books = [
    {
      id: 1,
      title: "Project Management Excellence",
      subtitle: "A Comprehensive Guide to Modern PM Practices",
      author: "Abu Kowsar",
      description: "Master the art of project management with proven methodologies, real-world case studies, and practical frameworks for success.",
      category: "Project Management",
      rating: 4.8,
      reviews: 156,
      pages: 320,
      language: "English",
      publishYear: "2024",
      price: "$29.99",
      image: book1,
      color: "bg-blue-500",
      icon: "📊",
      downloadUrl: "#",
      previewUrl: "#"
    },
    {
      id: 2,
      title: "AI Integration in Business",
      subtitle: "Transforming Organizations with Artificial Intelligence",
      author: "Abu Kowsar",
      description: "Explore practical strategies for implementing AI solutions in business processes, from automation to decision-making systems.",
      category: "Technology",
      rating: 4.9,
      reviews: 203,
      pages: 280,
      language: "English",
      publishYear: "2024",
      price: "$34.99",
      image: book2,
      color: "bg-purple-500",
      icon: "🤖",
      downloadUrl: "#",
      previewUrl: "#"
    },
    {
      id: 3,
      title: "Agile Leadership Handbook",
      subtitle: "Leading Teams in the Digital Age",
      author: "Abu Kowsar",
      description: "Develop agile leadership skills to navigate complex projects and inspire high-performing teams in dynamic environments.",
      category: "Leadership",
      rating: 4.7,
      reviews: 128,
      pages: 250,
      language: "English",
      publishYear: "2023",
      price: "$27.99",
      image: book3,
      color: "bg-green-500",
      icon: "🎯",
      downloadUrl: "#",
      previewUrl: "#"
    },
    {
      id: 4,
      title: "Digital Transformation Guide",
      subtitle: "Strategies for Modern Organizations",
      author: "Abu Kowsar",
      description: "Navigate the digital transformation journey with proven frameworks, case studies, and implementation strategies.",
      category: "Digital Strategy",
      rating: 4.6,
      reviews: 94,
      pages: 300,
      language: "English",
      publishYear: "2023",
      price: "$31.99",
      image: book4,
      color: "bg-orange-500",
      icon: "🚀",
      downloadUrl: "#",
      previewUrl: "#"
    }
  ];

  return (
    <section
      id="books"
      className="py-24 px-4 bg-muted/30 transition-colors duration-300 relative overflow-hidden"
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
            Publications
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4">
            Featured Books
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive guides and handbooks covering project management, technology integration, 
            and leadership in the digital age.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              className="group relative bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="flex flex-col md:flex-row">
                {/* Book Cover */}
                <div className="relative md:w-48 h-64 md:h-auto bg-gradient-to-br from-secondary to-muted overflow-hidden">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Icon Badge */}
                  <div
                    className={`absolute -bottom-4 -right-4 w-16 h-16 ${book.color} rounded-xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-300`}
                  >
                    <span className="text-2xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                      {book.icon}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-background/90 backdrop-blur-sm text-foreground rounded-lg text-xs font-semibold">
                      {book.category}
                    </span>
                  </div>
                </div>

                {/* Book Details */}
                <div className="flex-1 p-6">
                  {/* Title and Author */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                      {book.title}
                    </h3>
                    <p className="text-sm text-accent font-medium mb-2">{book.subtitle}</p>
                    <p className="text-sm text-muted-foreground">by {book.author}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(book.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-foreground">{book.rating}</span>
                    <span className="text-sm text-muted-foreground">({book.reviews} reviews)</span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {book.description}
                  </p>

                  {/* Book Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary/60" />
                      <span className="text-muted-foreground">{book.pages} pages</span>
                    </div>
                    <div className="text-muted-foreground">
                      Published: {book.publishYear}
                    </div>
                    <div className="text-muted-foreground">
                      Language: {book.language}
                    </div>
                    <div className="text-lg font-bold text-primary">
                      {book.price}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={book.downloadUrl}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                    <a
                      href={book.previewUrl}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Preview
                    </a>
                  </div>
                </div>
              </div>

              {/* Hover Overlay Effect */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-2xl transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a 
            href="/books"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:scale-105"
          >
            View All Books
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
          </a>
        </div>
      </div>
    </section>
  );
}