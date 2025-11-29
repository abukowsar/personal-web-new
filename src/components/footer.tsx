export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { label: "Twitter", url: "#" },
    { label: "GitHub", url: "#" },
    { label: "LinkedIn", url: "#" },
    { label: "Email", url: "#" },
  ]

  return (
    <footer className="bg-background border-t border-border transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-accent mb-3">Portfolio</h3>
            <p className="text-muted-foreground">Creating beautiful digital experiences.</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Services", "Projects", "About", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Connect</h4>
            <div className="space-y-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  className="block text-muted-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground">© {currentYear} Portfolio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
