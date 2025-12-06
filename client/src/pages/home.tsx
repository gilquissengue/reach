import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Process from "@/components/landing/Process";
import Stats from "@/components/landing/Stats";
import Services from "@/components/landing/Services";
import Partners from "@/components/landing/Partners";
import MultiStepForm from "@/components/landing/MultiStepForm";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] font-sans selection:bg-blue-500/30 selection:text-blue-200">
      <Header />
      <main>
        <Hero />
        <Partners />
        <Stats />
        <Process />
        <Services />
        <MultiStepForm />
      </main>
      <Footer />
    </div>
  );
}
