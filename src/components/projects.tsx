"use client";
import img1 from "@/assets/images/projects/img-1.jpg";
import img2 from "@/assets/images/projects/img-13.png";
import img3 from "@/assets/images/projects/img-3.png";
import img4 from "@/assets/images/projects/img-4.png";
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
      description: "Modern AI solutions for Bengali LLM.",
      tags: ["React", "Node.js", "MongoDB"],
      image: img1,
    },
    {
      title: "AI Based Platform (Bangla AI)",
      description: "Modern AI solutions for Bengali LLM.",
      tags: ["Next.js", "TypeScript", "TailwindCSS"],
      image: img2,
    },
    {
      title: "Mobile App",
      description: "Cross-platform mobile application for productivity",
      tags: ["React Native", "Firebase", "Redux"],
      image: img3,
    },
    {
      title: "Design System",
      description: "Comprehensive component library and design tokens",
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
      <ImageLightbox
        isOpen={lightboxState.isOpen}
        imageSrc={lightboxState.imageSrc}
        imageAlt={lightboxState.imageAlt}
        onClose={handleCloseLightbox}
      />
    </>
  );
}
