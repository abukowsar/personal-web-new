import Image from "next/image";
import { Award, Calendar, Lightbulb, Rocket, TrendingUp } from "lucide-react";
import ictDivisionLogo from "@/assets/images/orgs/ict-division.png";
import pdbfLogo from "@/assets/images/orgs/pdbf.png";
import bcfTechLogo from "@/assets/images/orgs/bcf-tech.png";
import confidenceGroupLogo from "@/assets/images/orgs/confidence-group.png";
import bangkokHospitalLogo from "@/assets/images/orgs/bangkok-hospital.png";

const stats = [
  { icon: Calendar, value: "12+", label: "Years Experience" },
  { icon: Rocket, value: "1000+", label: "Successful Projects" },
  { icon: Lightbulb, value: "100+", label: "Innovations Delivered" },
  { icon: Award, value: "7+", label: "Professional Certifications" },
  { icon: TrendingUp, value: "90%", label: "Client Satisfaction" },
];

const organizations = [
  {
    name: "ICT Division, Ministry of Posts, Telecommunications & IT",
    logo: ictDivisionLogo,
  },
  {
    name: "PDBF · RDCD · LGED",
    logo: pdbfLogo,
  },
  {
    name: "BCF Tech",
    logo: bcfTechLogo,
  },
  {
    name: "Confidence Group of Industries",
    logo: confidenceGroupLogo,
  },
  {
    name: "Bangkok Hospital Dhaka",
    logo: bangkokHospitalLogo,
  },
];

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="py-20 px-4 bg-background transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Track Record
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Proven Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Over a decade of delivering measurable results across software,
            hardware, and manufacturing projects.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="relative p-6 rounded-2xl bg-card border border-border/50 text-center hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            Trusted by teams at
          </p>
          <div
            className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          >
            <div className="flex w-max items-center gap-3 marquee-track">
              {[...organizations, ...organizations].map((org, index) => (
                <div
                  key={`${org.name}-${index}`}
                  className="flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300 shrink-0"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white overflow-hidden ring-1 ring-border/50">
                    <Image
                      src={org.logo}
                      alt={org.name}
                      className="h-full w-full object-contain p-1"
                    />
                  </span>
                  <span className="text-sm font-medium text-foreground whitespace-nowrap">
                    {org.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
