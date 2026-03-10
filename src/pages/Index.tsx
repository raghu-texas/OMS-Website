import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import HealthcareFeatures from "@/components/HealthcareFeatures";
import Solutions from "@/components/Solutions";
import Testimonials from "@/components/Testimonials";
import WhyChoose from "@/components/WhyChoose";
import CloudSection from "@/components/CloudSection";

const Index = () => {
  return (
    <div>
      <Hero />
      <Stats />
      <HealthcareFeatures />
      <Solutions />
      <CloudSection />
      <WhyChoose />
      <Testimonials />
    </div>
  );
};

export default Index;
