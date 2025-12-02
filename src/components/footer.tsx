"use client";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Calendar,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "@/assets/images/logo1.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isAvailable] = useState(true); // You can manage this state dynamically

  const socialLinks = [
    {
      label: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/engabukowsar",
    },
    {
      label: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/engabukowsar/",
    },
    { label: "Twitter", icon: Twitter, url: "https://x.com/abukowsar" },
    {
      label: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/abu-kowsar-pmp",
    },
    {
      label: "YouTube",
      icon: Youtube,
      url: "https://www.youtube.com/channel/UCKNcf0Bz0ZhaLS-qGLSEpUw",
    },
  ];

  const menuLinks = [
    { label: "Home", url: "#home" },
    { label: "Services", url: "#services" },
    { label: "Contact", url: "#contact" },
    { label: "About", url: "#about" },
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "abu.kowsar@doict.gov.bd",
      link: "mailto:abu.kowsar@doict.gov.bd",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+880 1234-567890",
      link: "tel:+8801234567890",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Dhaka, Bangladesh",
      link: "#",
    },
  ];

  return (
    <>
      {/* Main Footer */}
      <footer className="bg-muted/50 dark:bg-background border-t border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <Link href="/" className="text-2xl font-bold text-accent">
                  <Image
                    width={200}
                    height={120}
                    className="object-cover"
                    alt="abu-kawsar"
                    src={logo}
                  />
                </Link>
              </div>
              <p className="text-muted-foreground text-sm mb-6">
                Available for consulting, freelance project management, and
                training
              </p>

              {/* Social Icons */}
              <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 group"
                      aria-label={link.label}
                    >
                      <Icon className="w-4 h-4 text-primary group-hover:text-primary-foreground" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Menu Links */}
            <div className="lg:col-span-1">
              <h5 className="font-semibold text-foreground mb-4">Menu</h5>
              <ul className="space-y-3">
                {menuLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.url}
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* LinkedIn Section */}
            <div className="lg:col-span-1">
              <h5 className="font-semibold text-foreground mb-4">LinkedIn</h5>
              <div className="bg-card border border-border rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Linkedin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <a
                      href="https://www.linkedin.com/in/abu-kowsar-pmp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Follow on LinkedIn
                    </a>
                    <p className="text-xs text-muted-foreground">
                      Connect with me
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <a
                  href="https://www.linkedin.com/company/74686984"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077b5] text-white rounded hover:bg-[#006399] transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  Follow Company
                </a>
              </div>
            </div>

            {/* Quick Contact & Availability Section */}
            <div className="lg:col-span-1">
              <h5 className="font-semibold text-foreground mb-4">
                Get in Touch
              </h5>

              {/* Availability Status */}
              <div className="mb-4">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                    isAvailable
                      ? "bg-green-500/10 text-green-600 dark:text-green-400"
                      : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full animate-pulse ${
                      isAvailable ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  />
                  {isAvailable ? "Available for Projects" : "Currently Busy"}
                </div>
              </div>

              {/* Quick Contact Info */}
              <div className="space-y-3">
                <a
                  href="mailto:abu.kowsar@doict.gov.bd"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Mail className="w-4 h-4 text-primary/60 group-hover:text-primary" />
                  <span className="truncate">abu.kowsar@doict.gov.bd</span>
                </a>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary/60" />
                  <span>Dhaka, Bangladesh</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary/60" />
                  <span>Response within 24 hours</span>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="#contact"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
              >
                <Calendar className="w-4 h-4" />
                Schedule a Meeting
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Footer */}
      <div className="bg-background border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              © {currentYear}{" "}
              <a
                href="https://abukowsar.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                www.abukowsar.site
              </a>{" "}
              All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
