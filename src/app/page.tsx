import Header from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import Projects from "@/components/projects"
import Blog from "@/components/blog"
import Testimonials from "@/components/testimonials"
import About from "@/components/about"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      <Header />
      <Hero />
      <Services />
      <Projects />
      <Blog />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
