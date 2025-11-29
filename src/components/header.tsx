"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Blog", href: "#blog" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border transition-colors duration-300">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-accent">
          Abu Kawsar
        </Link>

        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-foreground mb-1"></span>
          <span className="block w-5 h-0.5 bg-foreground mb-1"></span>
          <span className="block w-5 h-0.5 bg-foreground"></span>
        </button>

        <ul
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-8 absolute md:static top-full left-0 right-0 bg-background md:bg-transparent p-4 md:p-0 border-b md:border-0 border-border`}
        >
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-foreground hover:text-accent transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
