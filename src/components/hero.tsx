"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Download, Award, Users, Calendar, CheckCircle, Star, Briefcase} from "lucide-react";
import ownImage from "@/assets/images/about.png";
import Image from "next/image";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const titles = [
    "Technical Project Manager",
    "AI Integration Specialist",
    "Digital Transformation Leader"
  ];

  useEffect(() => {
    setMounted(true);
  setIsVisible(true);

    const titleInterval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(titleInterval);
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
      {/* Animated Background Elements */}
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-14 md:gap-12 items-center">
        <div className=" order-2 md:order-1 space-y-6">
          <div className="space-y-4">
            {/* Professional Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Certified Project Management Professional</span>
          </div>

          {/* Main Header */}

            <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              Hello, I'm Abu Kowsar, Engr<span className="text-accent"> </span>
            </h1>

          {/* Animated Title */}
            <div
              className={`transition-all duration-1000 delay-400 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <div className="h-16 flex items-center">
                <h3 className="text-3xl md:text-4xl font-bold text-accent leading-tight">
                  {titles[currentTitle]}
                </h3>
              </div>

 {/* Description */}
            <p className="text-lg text-muted-foreground">
              Delivering high-impact projects across software, hardware, and manufacturing. Expert in Agile methodologies, cross-functional team leadership, and digital transformation.
            </p>
          </div>
</div>

            <div
              className={`transition-all duration-1000 delay-400 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >


</div>
          {/* Key Highlights */}
          <div
            className={`transition-all duration-1000 delay-800 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm border border-border rounded-xl hover:border-primary/30 transition-all">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-foreground">30% Faster Delivery</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm border border-border rounded-xl hover:border-primary/30 transition-all">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-foreground">20% Higher Satisfaction</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm border border-border rounded-xl hover:border-primary/30 transition-all">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-foreground">100+ Team Members Led</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm border border-border rounded-xl hover:border-primary/30 transition-all">
                <Briefcase className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium text-foreground">12+ Years Experience</span>
              </div>
            </div>
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

          {/* Beautiful Floating Skill Cards */}

            {/* Top Left - Project Management */}
          <div className={`absolute  top-4 left-0 bg-card border border-border rounded-xl p-4 shadow-lg backdrop-blur-sm transition-all duration-1000 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{
              animation: mounted ? "float 6s ease-in-out infinite" : "none",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl"></span>
              <div>
                <p className="font-semibold text-sm text-foreground">Project Management</p>
                <p className="text-xs text-muted-foreground">PMP Certified</p>
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
              <span className="text-2xl"></span>
              <div>
                <p className="font-semibold text-sm text-foreground">AI Integration</p>
                <p className="text-xs text-muted-foreground">Specialist</p>
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
              <span className="text-2xl"></span>
              <div>
                <p className="font-semibold text-sm text-foreground">
                  Agile Specialist
                </p>
                <p className="text-xs text-muted-foreground">PMI-ACP</p>
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
              <span className="text-2xl"></span>
              <div>
                <p className="font-semibold text-sm text-foreground">
                  Industrial Designer
                </p>
                <p className="text-xs text-muted-foreground">Specialist</p>
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


            {/* Availability Badge */}
             <div className="text-center mb-6">
               <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Engr Abu Kowsar
                </h3>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-semibold">PMP</span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-semibold">PMI-ACP</span>
              </div>
              <p className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-4">
                Technical Project Manager
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Available</span>
                <span className="text-sm text-green-600 dark:text-green-400">Part-time / Consulting</span>
              </div>

{/* Download Resume Button */}
<div className="mb-8">
        <button
              onClick={handleDownloadResume}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg text-sm cursor-pointer w-[200px] md:w-auto"
            >
              <Download size={18} />
              Download Resume (PDF)
            </button>
           </div>
                {/* Social Links - Single Row */}
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800/70 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg font-medium transition-all hover:scale-105 border border-gray-200/50 dark:border-gray-700/50"
              >
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-3 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 rounded-lg font-medium transition-all hover:scale-105 border border-blue-200/50 dark:border-blue-800/50"
              >
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="https://upwork.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-3 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 rounded-lg font-medium transition-all hover:scale-105 border border-green-200/50 dark:border-green-800/50"
              >
                <span className="text-sm">Upwork</span>
              </a>
            </div>
          </div>
        </div>
      </div></div>
      <style>{`
         @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(1deg);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float.delay-300 {
          animation-delay: 0.3s;
        }
        
        .animate-float.delay-600 {
          animation-delay: 0.6s;
        }
        
        .animate-float.delay-900 {
          animation-delay: 0.9s;
        }
        
        @keyframes animate-spin-slow {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: animate-spin-slow 25s linear infinite;
        }
        
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  );
}
