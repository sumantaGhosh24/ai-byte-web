import Achievements from "@/components/landing/achievements";
import Analytics from "@/components/landing/analytics";
import Categories from "@/components/landing/categories";
import CTA from "@/components/landing/cta";
import FAQ from "@/components/landing/faq";
import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/navbar";
import Testimonials from "@/components/landing/testimonials";

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Analytics />
      <Achievements />
      <Categories />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
};

export default LandingPage;
