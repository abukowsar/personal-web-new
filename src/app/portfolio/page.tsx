"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import ImageLightbox from "@/components/image-lightbox";
import Header from "@/components/header";
import Footer from "@/components/footer";

// Import project images
import img1 from "@/assets/images/projects/img-1.jpg";
import img2 from "@/assets/images/projects/img-13.png";
import img3 from "@/assets/images/projects/img-14.png";
import img4 from "@/assets/images/projects/img-15.png";
import img5 from "@/assets/images/projects/img-2.png";
import img6 from "@/assets/images/projects/img-3.png";
import img7 from "@/assets/images/projects/img-4.png";
import img8 from "@/assets/images/projects/img-5.png";

export default function Portfolio() {
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    imageSrc: string;
    imageAlt: string;
  }>({
    isOpen: false,
    imageSrc: "",
    imageAlt: "",
  });

  const allProjects = [
    {
      title: "AI Based Factchecking Platform (Khoj-BD)",
      description: "Artificial Intelligence Powered First Bangla Fact Checking Platform. This platform uses advanced NLP and machine learning algorithms to verify news and information in Bengali language.",
      longDescription: "A comprehensive fact-checking platform that leverages AI to combat misinformation in Bengali content. Features include automated content analysis, source verification, and real-time fact-checking capabilities.",
      tags: ["React", "Node.js", "MongoDB", "AI/ML", "NLP"],
      image: img1,
      category: "AI/ML",
      year: "2024",
      status: "Live",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "LLM Platform (Bangla AI)",
      description: "Modern AI solutions for all your Bengali language needs - anytime, anywhere. A comprehensive language model platform specifically designed for Bengali language processing.",
      longDescription: "An advanced Large Language Model platform optimized for Bengali language tasks including text generation, translation, summarization, and conversational AI capabilities.",
      tags: ["Next.js", "TypeScript", "TailwindCSS", "OpenAI", "Python"],
      image: img2,
      category: "AI/ML",
      year: "2024",
      status: "Live",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Complaint Management System",
      description: "A Digital Solution centralizes and automates the process of handling complaints. Streamlines workflow from complaint submission to resolution with real-time tracking.",
      longDescription: "Enterprise-grade complaint management system with automated routing, priority assignment, SLA tracking, and comprehensive reporting dashboard for efficient complaint resolution.",
      tags: ["React Native", "Firebase", "Redux", "Node.js"],
      image: img3,
      category: "Enterprise",
      year: "2023",
      status: "Live",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "ERP System",
      description: "Enterprise Resource Planning system is a type of business management software that integrates various business processes and functions into a unified system.",
      longDescription: "Comprehensive ERP solution covering inventory management, financial accounting, HR management, and supply chain optimization with real-time analytics and reporting.",
      tags: ["React", "Storybook", "CSS-in-JS", "PostgreSQL", "Docker"],
      image: img4,
      category: "Enterprise",
      year: "2023",
      status: "Live",
      liveUrl: "#",
      githubUrl: "#"
    },
    // Additional projects
    {
      title: "E-commerce Platform",
      description: "Modern e-commerce solution with advanced features including AI-powered recommendations, real-time inventory management, and seamless payment integration.",
      longDescription: "Full-stack e-commerce platform with microservices architecture, featuring AI-driven product recommendations, advanced search capabilities, and multi-vendor support.",
      tags: ["Next.js", "Stripe", "PostgreSQL", "Redis", "Docker"],
      image: img5,
      category: "E-commerce",
      year: "2023",
      status: "Live",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Healthcare Management System",
      description: "Comprehensive healthcare management platform for hospitals and clinics with patient management, appointment scheduling, and medical records.",
      longDescription: "Digital healthcare solution featuring patient portal, doctor dashboard, appointment management, electronic health records, and telemedicine capabilities.",
      tags: ["React", "Node.js", "MongoDB", "Socket.io", "AWS"],
      image: img6,
      category: "Healthcare",
      year: "2022",
      status: "Live",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Learning Management System",
      description: "Comprehensive LMS platform for educational institutions with course management, student tracking, and interactive learning tools.",
      longDescription: "Full-featured learning management system with video streaming, assignment management, grade tracking, and collaborative learning tools.",
      tags: ["React", "Express.js", "MySQL", "WebRTC", "AWS S3"],
      image: img7,
      category: "Education",
      year: "2023",
      status: "Live",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Real Estate Platform",
      description: "Modern real estate platform with property listings, virtual tours, mortgage calculator, and agent management system.",
      longDescription: "Comprehensive real estate solution featuring property search, virtual reality tours, mortgage calculations, and CRM for real estate agents.",
      tags: ["Vue.js", "Laravel", "PostgreSQL", "Stripe", "Google Maps API"],
      image: img8,
      category: "Real Estate",
      year: "2022",
      status: "Live",
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  const categories = ["All", "AI/ML", "Enterprise", "E-commerce", "Healthcare", "Education", "Real Estate"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All" 
    ? allProjects 
    : allProjects.filter(project => project.category === selectedCategory);

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
        <Header />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-muted/30 py-20">
          <div className="max-w-6xl mx-auto px-4">


            
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Projects
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore my complete collection of projects, from AI-powered solutions to enterprise applications. 
                Each project represents a unique challenge and innovative solution.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="py-8 bg-background border-b">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={index}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:border-accent transition-all hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-2"
                >
                  <div className="relative h-48 bg-gradient-to-br from-accent/10 to-accent/5 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                      onClick={() => handleImageClick(project.image.src, project.title)}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-background/90 text-foreground rounded-full text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Live' 
                          ? 'bg-green-500/90 text-white' 
                          : 'bg-yellow-500/90 text-white'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {project.year}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      <a
                        href={project.liveUrl}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Interested in Working Together?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              I'm always open to discussing new opportunities and exciting projects.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:scale-105"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>

      <ImageLightbox
        isOpen={lightboxState.isOpen}
        imageSrc={lightboxState.imageSrc}
        imageAlt={lightboxState.imageAlt}
        onClose={handleCloseLightbox}
      />
       <Footer />
    </>
  );
}