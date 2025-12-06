import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Process from "@/components/landing/Process";
import Stats from "@/components/landing/Stats";
import Services from "@/components/landing/Services";
import Benefits from "@/components/landing/Benefits";
import MultiStepForm from "@/components/landing/MultiStepForm";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <main>
        <Hero />
        <Process />
        <Stats />
        <Services />
        <Benefits />
        <MultiStepForm />
      </main>
      <Footer />
    </div>
  );
}
