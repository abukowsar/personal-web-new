import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

const lastUpdated = "September 10, 2026";

const sections = [
  {
    id: "overview",
    title: "1. Overview",
    body: [
      "This Privacy Policy explains how Engr Abu Kowsar (\"I\", \"me\", or \"this site\") collects, uses, and protects information when you visit abukowsar.site (the \"Site\"), including when you send a message, book a consultation, or download resources such as my resume or published books.",
      "This is a personal portfolio and professional consulting site. I don't sell products or run e-commerce checkout on this Site, and I don't share your personal information with advertisers.",
    ],
  },
  {
    id: "information-we-collect",
    title: "2. Information I Collect",
    body: [
      "Contact form (\"Send Message\"): your name, email address, subject, and message content.",
      "Consultation booking form (\"Book a Consultation\"): your name, email address, phone number, company name, the service you're interested in, and your message.",
      "Automatically collected data: basic, privacy-friendly page-view analytics via Vercel Analytics, which does not use tracking cookies and does not collect personally identifiable information.",
      "I do not collect payment information, government ID numbers, or sensitive personal data through this Site.",
    ],
  },
  {
    id: "how-we-use-it",
    title: "3. How I Use Your Information",
    body: [
      "Information submitted through the contact or consultation forms is used solely to respond to your inquiry, discuss potential work, and follow up by email or phone if you've provided one.",
      "Submissions are stored in a secured MongoDB database and are also forwarded to my personal email inbox as a notification, so I can reply promptly.",
      "Aggregated, anonymous analytics data is used only to understand overall site traffic and improve the Site's content and performance — it is never tied back to an individual visitor.",
      "I do not use your information for marketing emails, newsletters, or any purpose beyond responding to what you submitted, unless you separately opt in to something in the future.",
    ],
  },
  {
    id: "storage-security",
    title: "4. Data Storage & Security",
    body: [
      "Form submissions are stored in a MongoDB Atlas database, transmitted over encrypted (TLS) connections, and are only accessible through an authenticated admin panel that I personally control.",
      "While I take reasonable measures to protect your information, no method of electronic storage or transmission is 100% secure, and I cannot guarantee absolute security.",
    ],
  },
  {
    id: "cookies-analytics",
    title: "5. Cookies & Analytics",
    body: [
      "This Site uses Vercel Analytics for anonymous, aggregate traffic insights (e.g. which pages are visited). This tool is designed to be privacy-friendly and does not set tracking cookies or build individual visitor profiles.",
      "The admin panel (used only by me to manage site content) sets a single secure, essential session cookie required for login — this is not used to track visitors and has no effect on the public-facing pages you browse.",
    ],
  },
  {
    id: "third-party-links",
    title: "6. Third-Party Links",
    body: [
      "The Site links out to third-party platforms such as GitHub, LinkedIn, Upwork, Facebook, Instagram, X (Twitter), and YouTube. Once you leave this Site through one of these links, that platform's own privacy policy applies — I have no control over, and am not responsible for, how those third parties handle your data.",
    ],
  },
  {
    id: "data-retention",
    title: "7. Data Retention",
    body: [
      "Messages and consultation requests are kept for as long as reasonably necessary to respond to you and maintain a record of professional inquiries. You can request earlier deletion at any time (see \"Your Rights\" below).",
    ],
  },
  {
    id: "your-rights",
    title: "8. Your Rights",
    body: [
      "You can ask me to access, correct, or delete any personal information you've submitted through this Site by emailing me at the address below. I will respond to reasonable requests within a reasonable timeframe.",
      "Since this Site doesn't require you to create an account, there's no self-service dashboard for managing your data — every request is handled directly and personally.",
    ],
  },
  {
    id: "childrens-privacy",
    title: "9. Children's Privacy",
    body: [
      "This Site is intended for a professional, adult audience and is not directed at children under 13. I do not knowingly collect personal information from children.",
    ],
  },
  {
    id: "changes",
    title: "10. Changes to This Policy",
    body: [
      `This Privacy Policy may be updated occasionally to reflect changes to the Site or applicable law. The \"Last updated\" date at the top of this page will always reflect the most recent revision.`,
    ],
  },
  {
    id: "contact",
    title: "11. Contact",
    body: [
      "If you have any questions about this Privacy Policy or how your information is handled, contact me directly at eng.abukowsar@gmail.com.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-br from-background via-background to-accent/5 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <nav className="hidden lg:block">
              <div className="sticky top-24 space-y-1 border-l border-border pl-4">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block py-1 text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </nav>

            <div className="space-y-10">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {section.title}
                  </h2>
                  <div className="space-y-3">
                    {section.body.map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <div className="rounded-xl border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">
                  Looking for how I handle your use of this Site more broadly? See the{" "}
                  <Link href="/terms-of-service" className="text-accent hover:underline">
                    Terms of Service
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
