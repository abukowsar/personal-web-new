/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BookOpen, Download, ExternalLink, Star } from "lucide-react";
import book1 from "@/assets/images/blog/book/book1.png";
import book2 from "@/assets/images/blog/book/book2.png";
import book3 from "@/assets/images/blog/book/book3.png";
import book4 from "@/assets/images/blog/book/book4.png";

type Book = {
  id: string | number;
  title: string;
  subtitle: string;
  author: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  pages: number;
  language: string;
  publishYear: string;
  price: string;
  image?: typeof book1;
  imageUrl?: string;
  color: string;
  icon: string;
  downloadUrl: string;
  previewUrl: string;
};

const fallbackBooks: Book[] = [
  {
    id: 1,
    title: "Project Management Excellence",
    subtitle: "A Comprehensive Guide to Modern PM Practices",
    author: "Abu Kowsar",
    description:
      "Master the art of project management with proven methodologies, real-world case studies, and practical frameworks for success.",
    category: "Project Management",
    rating: 4.8,
    reviews: 156,
    pages: 320,
    language: "English",
    publishYear: "2024",
    price: "$0.99",
    image: book1,
    color: "bg-blue-500",
    icon: "Book",
    downloadUrl: "#",
    previewUrl: "#",
  },
  {
    id: 2,
    title: "AI Integration in Business",
    subtitle: "Transforming Organizations with Artificial Intelligence",
    author: "Abu Kowsar",
    description:
      "Explore practical strategies for implementing AI solutions in business processes, from automation to decision-making systems.",
    category: "Technology",
    rating: 4.9,
    reviews: 203,
    pages: 280,
    language: "English",
    publishYear: "2024",
    price: "$34.99",
    image: book2,
    color: "bg-purple-500",
    icon: "AI",
    downloadUrl: "#",
    previewUrl: "#",
  },
  {
    id: 3,
    title: "Agile Leadership Handbook",
    subtitle: "Leading Teams in the Digital Age",
    author: "Abu Kowsar",
    description:
      "Develop agile leadership skills to navigate complex projects and inspire high-performing teams in dynamic environments.",
    category: "Leadership",
    rating: 4.7,
    reviews: 128,
    pages: 250,
    language: "English",
    publishYear: "2023",
    price: "$27.99",
    image: book3,
    color: "bg-green-500",
    icon: "Lead",
    downloadUrl: "#",
    previewUrl: "#",
  },
  {
    id: 4,
    title: "Digital Transformation Guide",
    subtitle: "Strategies for Modern Organizations",
    author: "Abu Kowsar",
    description:
      "Navigate the digital transformation journey with proven frameworks, case studies, and implementation strategies.",
    category: "Digital Strategy",
    rating: 4.6,
    reviews: 94,
    pages: 300,
    language: "English",
    publishYear: "2023",
    price: "$31.99",
    image: book4,
    color: "bg-orange-500",
    icon: "Tech",
    downloadUrl: "#",
    previewUrl: "#",
  },
];

export default function Books() {
  const [books, setBooks] = useState<Book[]>(fallbackBooks);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await fetch("/api/content/books");
        const data = await response.json();

        if (Array.isArray(data.items) && data.items.length > 0) {
          setBooks(data.items);
        }
      } catch (error) {
        console.error("Unable to load books:", error);
      }
    };

    loadBooks();
  }, []);

  return (
    <section
      id="books"
      className="py-24 px-4 bg-muted/30 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Publications
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4">
            Featured Books
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive guides and handbooks covering project management,
            technology integration, and leadership in the digital age.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              className="group relative bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-48 h-64 md:h-auto bg-gradient-to-br from-secondary to-muted overflow-hidden">
                  {book.imageUrl ? (
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    book.image && (
                      <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )
                  )}

                  <div
                    className={`absolute -bottom-4 -right-4 w-16 h-16 ${book.color} rounded-xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-300`}
                  >
                    <span className="text-xs font-bold text-white transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                      {book.icon}
                    </span>
                  </div>

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-background/90 backdrop-blur-sm text-foreground rounded-lg text-xs font-semibold">
                      {book.category}
                    </span>
                  </div>
                </div>

                <div className="flex-1 p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                      {book.title}
                    </h3>
                    <p className="text-sm text-accent font-medium mb-2">
                      {book.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground">by {book.author}</p>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(Number(book.rating))
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {book.rating}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({book.reviews} reviews)
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {book.description}
                  </p>

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
                    <div className="text-lg font-bold text-primary">{book.price}</div>
                  </div>

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
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/books"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:scale-105"
          >
            View All Books
          </a>
        </div>
      </div>
    </section>
  );
}
