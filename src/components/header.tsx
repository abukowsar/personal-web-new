"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bot,
  Briefcase,
  GraduationCap,
  Globe,
  Home,
  MessageSquare,
  ShieldCheck,
  Stethoscope,
  Wrench,
} from "lucide-react";
import logo from "@/assets/images/logo1.png";
import Image from "next/image";
import NavDropdown, { type NavDropdownItem } from "@/components/nav-dropdown";

const servicesMenu: NavDropdownItem[] = [
  {
    icon: Briefcase,
    title: "Freelance Project Management",
    description:
      "Part-time remote PM for startups & SMBs. Agile coaching, sprint planning, and team coordination.",
  },
  {
    icon: GraduationCap,
    title: "Workshops & Training",
    description:
      "Onsite/remote workshops on Scrum, Jira, stakeholder communication, and PM best practices.",
  },
  {
    icon: Stethoscope,
    title: "Project Audits & Rescue",
    description:
      "Health checks, risk assessment, and recovery roadmaps to get troubled projects back on track.",
  },
  {
    icon: Wrench,
    title: "Prototyping & DFM",
    description:
      "Affordable prototyping with 3D printing, CNC, and scalable Design for Manufacturing guidance.",
  },
  {
    icon: Bot,
    title: "AI & GenAI Integration",
    description:
      "Applying AI tools to automate workflows, optimize reporting, and accelerate decision-making.",
  },
  {
    icon: Globe,
    title: "Digital Transformation",
    description:
      "Supporting startups, NGOs, and enterprises with IT projects, GovTech platforms, and scalable solutions.",
  },
];

const modelsMenu: NavDropdownItem[] = [
  {
    icon: ShieldCheck,
    title: "Bangla Fact-Verification Model",
    description:
      "NLP classifier scoring the veracity of Bengali news and social claims, powering Khoj-BD.",
  },
  {
    icon: MessageSquare,
    title: "Bangla LLM",
    description:
      "Generative language model for Bengali conversation, translation, and text generation.",
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/#home", icon: Home },
    { label: "Services", href: "/#services" },
    { label: "Projects", href: "/#projects" },
    { label: "News", href: "/#blog" },
    { label: "Books", href: "/#books" },
    { label: "Model", href: "/#models" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border transition-colors duration-300">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-accent">
          <Image
            width={200}
            height={120}
            className="object-cover"
            alt="abu-kawsar"
            src={logo}
          />
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
          {navItems.map((item) => {
            if (item.label === "Services") {
              return (
                <NavDropdown
                  key={item.href}
                  label="Services"
                  eyebrow="What I Offer"
                  heading="Our Core Services"
                  allLabel="All Services"
                  allHref="/#services"
                  items={servicesMenu}
                  columns={2}
                />
              );
            }

            if (item.label === "Model") {
              return (
                <NavDropdown
                  key={item.href}
                  label="Model"
                  eyebrow="AI / ML"
                  heading="Explore Our Models"
                  allLabel="All Models"
                  allHref="/#models"
                  items={modelsMenu}
                  columns={1}
                  align="right"
                  widthClassName="md:w-96"
                />
              );
            }

            return (
              <li key={item.href}>
                {item.icon ? (
                  <a
                    href={item.href}
                    aria-label={item.label}
                    title={item.label}
                    className="flex items-center text-foreground hover:text-accent transition-colors"
                  >
                    <item.icon className="h-5 w-5" />
                  </a>
                ) : (
                  <a
                    href={item.href}
                    className="font-bold text-foreground hover:text-accent transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
