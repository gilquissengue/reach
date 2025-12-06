import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import ClientLogos from "@/components/landing/ClientLogos";
import Mission from "@/components/landing/Mission";
import Services from "@/components/landing/Services";
import ServicesCTA from "@/components/landing/ServicesCTA";
import CaseStudies from "@/components/landing/CaseStudies";
import Blog from "@/components/landing/Blog";
import FAQ from "@/components/landing/FAQ";
import Newsletter from "@/components/landing/Newsletter";
import Footer from "@/components/landing/Footer";
import CookieBanner from "@/components/landing/CookieBanner";
import FloatingWidgets from "@/components/landing/FloatingWidgets";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <main>
        <Hero />
        <ClientLogos />
        <Mission />
        <Services />
        <ServicesCTA />
        <CaseStudies />
        <Blog />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
      <CookieBanner />
      <FloatingWidgets />
    </div>
  );
}
