"use client";
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import Banner from "@/components/banner";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Projects from "@/components/projects";
import Blog from "@/components/blog";
import Testimonials from "@/components/testimonials";
import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Awards from "@/components/award";
import Books from "@/components/books";



export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      <Banner />
      <Header />
      <Hero />
      <Services />
      <Projects />
      <Awards />
      <Blog />
      <Books />
      <Testimonials />
      <About />
      <Contact />
      <Footer />

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-110"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </main>
  );
}
