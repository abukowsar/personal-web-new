"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import ownImage from "@/assets/images/about.png";
import Image from "next/image";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 px-4 py-20"
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-14 md:gap-12 items-center">
        <div className=" order-2 md:order-1 space-y-6">
          <div className="space-y-4">
            <h3 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              I will help the teams deliver complex technical products — on time & under budget. <span className="text-accent"></span>
            </h3>
            <p className="text-lg text-muted-foreground">
              I am delivering high-impact projects across software, hardware, and manufacturing. Expert in Agile, cross-functional team leadership, cost control, and stakeholder alignment. Proven track record: 30% reduction in project delays and 20% increase in customer satisfaction.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <Link
              href="#contact"
              className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
             Book a consultation
            </Link>
            <Link
              href="#projects"
              className="px-6 py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              View Projects
            </Link>
          </div>

          <div className="flex gap-8 pt-8">
            <div className="space-y-1">
              <p className="text-3xl font-bold text-accent">100+</p>
              <p className="text-muted-foreground">Projects Completed</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-accent">12+</p>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-accent">100%</p>
              <p className="text-muted-foreground">Client Satisfaction</p>
            </div>
          </div>
        </div>

        <div className=" order-1 md:order-2 md:flex flex-col items-center justify-center relative h-96">
          {/* Main avatar circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-60 h-60 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center border-2 border-accent/20">
              <div
                className={`text-8xl transition-transform duration-1000 ${
                  mounted ? "scale-100" : "scale-75"
                }`}
              >
                <Image
                  src={ownImage}
                  alt="Avatar"
                  className="rounded-full object-cover"
                  width={220}
                  height={220}
                />
              </div>
            </div>
          </div>

          {/* Floating card - React */}
          <div
            className={`absolute  top-4 left-0 bg-card border border-border rounded-xl p-4 shadow-lg backdrop-blur-sm transition-all duration-1000 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{
              animation: mounted ? "float 6s ease-in-out infinite" : "none",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚛️</span>
              <div>
                <p className="font-semibold text-sm text-foreground">Project</p>
                <p className="text-xs text-muted-foreground">Management</p>
              </div>
            </div>
          </div>

          {/* Floating card - Next.js */}
          <div
            className={`absolute bottom-8 right-0 bg-card border border-border rounded-xl p-4 shadow-lg backdrop-blur-sm transition-all duration-1000 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{
              animation: mounted ? "float 8s ease-in-out infinite 1s" : "none",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">▲</span>
              <div>
                <p className="font-semibold text-sm text-foreground">AI</p>
                <p className="text-xs text-muted-foreground">Integration</p>
              </div>
            </div>
          </div>

          {/* Floating card - TypeScript */}
          <div
            className={`absolute top-1/7 md:top-1/3 right-0 bg-card border border-border rounded-xl p-4 shadow-lg backdrop-blur-sm transition-all duration-1000 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{
              animation: mounted
                ? "float 7s ease-in-out infinite 0.5s"
                : "none",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔷</span>
              <div>
                <p className="font-semibold text-sm text-foreground">
                  
                </p>
                <p className="text-xs text-muted-foreground">Proficient</p>
              </div>
            </div>
          </div>

          {/* Floating card - Tailwind */}
          <div
            className={`absolute bottom-12 left-0 bg-card border border-border rounded-xl p-4 shadow-lg backdrop-blur-sm transition-all duration-1000 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{
              animation: mounted
                ? "float 8s ease-in-out infinite 1.5s"
                : "none",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎨</span>
              <div>
                <p className="font-semibold text-sm text-foreground">
                  Tailwind CSS
                </p>
                <p className="text-xs text-muted-foreground">Master</p>
              </div>
            </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 right-1/4 w-32 h-32 bg-accent/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>

          <div
            className={`absolute -bottom-5 md:bottom-0 left-1/2 transform -translate-x-1/2 flex gap-3 transition-all duration-1000 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >

            
            <button
              onClick={handleDownloadResume}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg text-sm cursor-pointer w-[200px] md:w-auto"
            >
              <Download size={16} />
              Download Resume (PDF)
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
}
