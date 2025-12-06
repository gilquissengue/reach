import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Process from "@/components/landing/Process";
import Stats from "@/components/landing/Stats";
import Services from "@/components/landing/Services";
import Benefits from "@/components/landing/Benefits"; // Keeping original benefits as placeholder if needed, but styling might clash. Let's omit or refactor if user asks. For now, omitting to keep the 'minimal/pro' vibe cleaner.
import MultiStepForm from "@/components/landing/MultiStepForm";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-blue-500/30 selection:text-blue-200">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Process />
        <Services />
        <MultiStepForm />
      </main>
      <Footer />
    </div>
  );
}
