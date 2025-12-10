"use client";
import img1 from "@/assets/images/projects/img-1.jpg";
import img2 from "@/assets/images/projects/img-13.png";
import img3 from "@/assets/images/projects/img-14.png";
import img4 from "@/assets/images/projects/img-15.png";
import Image from "next/image";
import ImageLightbox from "./image-lightbox";
import { useState } from "react";

export default function Projects() {
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    imageSrc: string;
    imageAlt: string;
  }>({
    isOpen: false,
    imageSrc: "",
    imageAlt: "",
  });
  const projects = [
    {
      title: "AI Based Factchecking Platform (Khoj-BD)",
      description: "Artificial Intelligence Powered First Bangla Fact Checking Platform",
      tags: ["React", "Node.js", "MongoDB"],
      image: img1,
    },
    {
      title: "LLM Platform (Bangla AI)",
      description: "Modern AI solutions for all your Bengali language needs - anytime, anywhere",
      tags: ["Next.js", "TypeScript", "TailwindCSS"],
      image: img2,
    },
    {
      title: "Complaint Management System",
      description: "A Digital Solution centralizes and automates the process of handling complaints",
      tags: ["React Native", "Firebase", "Redux"],
      image: img3,
    },
    {
      title: "ERP System",
      description: "Enterprise Resource Planning, system is a type of business management",
      tags: ["React", "Storybook", "CSS-in-JS"],
      image: img4,
    },
  ];

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
      <section id="projects" className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground">
              A selection of my recent work
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:border-accent transition-all hover:shadow-lg"
              >
                <div className="h-48 bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center group-hover:from-accent/20 transition-colors overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={300}
                    height={300}
                    className="w-full"
                    onClick={() =>
                      handleImageClick(project.image.src, project.title)
                    }
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* View All Button */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:scale-105">
              View All Articles
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
            </button>
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
  );
}
