import Hero from "@/components/landing/Hero";
import Steps from "@/components/landing/Steps";
import Venues from "@/components/landing/Venues";
import Services from "@/components/landing/Services";
import Testimonials from "@/components/landing/Testimonials";
import LeadForm from "@/components/landing/LeadForm";
import Footer from "@/components/landing/Footer";
import BottomTabBar from "@/components/landing/BottomTabBar";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-lp-bg text-lp-text selection:bg-lp-gold/25">
      <Hero />
      <Steps />
      <Venues />
      <Services />
      <Testimonials />
      <LeadForm />
      <Footer />
      <div className="h-20 lg:hidden" />
      <BottomTabBar />
    </div>
  );
}
