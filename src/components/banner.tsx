"use client";

import { useState, useEffect } from "react";
import { X, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Banner() {
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 px-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Banner Content */}
        <div className="flex items-center gap-4 flex-1">
          <Calendar className="w-5 h-5 flex-shrink-0" />
          <div className="flex items-center gap-2 text-sm md:text-base">
            <span className="font-medium">🎯 Ready to accelerate your project?</span>
            <span className="hidden sm:inline">Schedule a free consultation today!</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="#contact"
            className="group flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20"
          >
            <span className="text-sm">Schedule Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}