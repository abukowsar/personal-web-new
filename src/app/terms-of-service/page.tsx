import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

const lastUpdated = "September 10, 2026";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    body: [
      "By accessing or using abukowsar.site (the \"Site\"), you agree to these Terms of Service. If you don't agree with any part of these terms, please don't use the Site.",
      "This Site is the personal portfolio and professional website of Engr Abu Kowsar (\"I\", \"me\"), showcasing projects, publications, and consulting services in project management, AI integration, and digital transformation.",
    ],
  },
  {
    id: "use-of-site",
    title: "2. Use of the Site",
    body: [
      "You may browse the Site, read its content, and use the contact and consultation-booking forms for legitimate professional inquiries.",
      "You agree not to misuse the Site — including attempting to gain unauthorized access to the admin panel, submitting false information, sending spam or automated bulk submissions through the forms, or interfering with the Site's normal operation.",
    ],
  },
  {
    id: "intellectual-property",
    title: "3. Intellectual Property",
    body: [
      "Unless otherwise noted, all content on this Site — including project descriptions, blog/news posts, book covers, published book content, and site design — is owned by Engr Abu Kowsar and protected by applicable copyright and intellectual property laws.",
      "You may view and share links to this content for personal, non-commercial purposes. You may not reproduce, redistribute, resell, or create derivative works from this content without prior written permission.",
      "Third-party trademarks, logos, and platform names referenced on this Site (GitHub, LinkedIn, Upwork, etc.) belong to their respective owners.",
    ],
  },
  {
    id: "downloadable-content",
    title: "4. Downloadable Content",
    body: [
      "Resources such as my resume and published books are made available for download for personal, informational use. Where a book listing shows a price, availability of an actual purchase flow may vary — check the listing for current download or purchase options.",
      "Downloaded materials remain subject to the intellectual property terms above: no redistribution, resale, or republishing without permission.",
    ],
  },
  {
    id: "consultations-inquiries",
    title: "5. Consultations & Inquiries",
    body: [
      "Submitting the \"Book a Consultation\" or \"Send Message\" form does not create a contract, retainer, or client relationship. It simply sends your request to me so I can follow up.",
      "I aim to respond within the timeframe stated on the Site (currently within 24 hours), but this is a goal, not a guaranteed service-level commitment.",
      "Any actual engagement, scope of work, pricing, or formal agreement for consulting, training, or project management services will be established separately, in writing, outside of this Site.",
    ],
  },
  {
    id: "third-party-links",
    title: "6. Third-Party Links",
    body: [
      "This Site links to external platforms (GitHub, LinkedIn, Upwork, social media, and others). These links are provided for convenience — I don't control and am not responsible for the content, policies, or practices of those third-party sites.",
    ],
  },
  {
    id: "no-warranty",
    title: "7. No Warranty & Limitation of Liability",
    body: [
      "This Site and its content are provided \"as is\" without warranties of any kind, express or implied. I make reasonable efforts to keep information accurate and the Site available, but I don't guarantee it will be error-free, uninterrupted, or fit for any particular purpose.",
      "To the fullest extent permitted by law, I am not liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, this Site.",
    ],
  },
  {
    id: "governing-law",
    title: "8. Governing Law",
    body: [
      "These Terms are governed by the laws of the People's Republic of Bangladesh, without regard to conflict-of-law principles. Any disputes arising from your use of this Site will be subject to the jurisdiction of the courts of Bangladesh.",
    ],
  },
  {
    id: "changes",
    title: "9. Changes to These Terms",
    body: [
      `These Terms may be updated occasionally as the Site evolves. The \"Last updated\" date at the top of this page reflects the most recent revision. Continued use of the Site after changes are posted means you accept the updated Terms.`,
    ],
  },
  {
    id: "contact",
    title: "10. Contact",
    body: [
      "Questions about these Terms of Service can be sent to eng.abukowsar@gmail.com.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-br from-background via-background to-accent/5 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Terms of Service
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
                  Want to know how your personal data is handled? See the{" "}
                  <Link href="/privacy-policy" className="text-accent hover:underline">
                    Privacy Policy
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
