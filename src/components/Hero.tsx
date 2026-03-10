import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import dentalHero1 from "@/assets/dental-hero-1.jpg";
import dentalHero2 from "@/assets/dental-hero-2.jpg";
import dentalHero3 from "@/assets/dental-hero-3.jpg";
import dentalAI from "@/assets/dental-ai.jpg";
import clinicalExcellence from "@/assets/Clinical_Excellence.png";

const Hero = () => {
  const slides = [
    {
      image: dentalHero2,
      title: "Your Oral Surgery Practice Management Solution",
      subtitle: "Future of Digital Dentistry",
      description: "Our cloud-based technology delivers powerful solutions – providing the practice management tools necessary for your success."
    },
    {
      image: dentalAI,
      title: "AI-Powered EMR System",
      subtitle: "Revolutionizing Dental Care",
      description: "Transforming healthcare with AI-driven EMR for faster, accurate, and intelligent care"
    },
    {
      image: dentalHero3,
      title: "Collaborative Dental Teams",
      subtitle: "Excellence Through Teamwork",
      description: "Expert dental professionals working together with integrated digital workflows to provide comprehensive, coordinated care."
    },
    {
      image: clinicalExcellence,
      title: "Advanced Oral Surgery with Clinical Excellence",
      subtitle: "Clinical Excellence",
      description: "Delivering safe, accurate, and technology-driven oral surgical care with real-time imaging and expert clinical coordination."
    }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      <Carousel
        opts={{
          align: "start",
          loop: true
        }}
        plugins={[
          Autoplay({
            delay: 5000
          })
        ]}
        className="w-full h-screen"
      >
        <CarouselContent className="h-screen -ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="relative w-full h-screen flex items-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" loading="eager" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="max-w-4xl">
                    <h1
                      className={
                        "font-bold mb-6 animate-fade-in text-foreground break-words" +
                          (slide.title === "Advanced Oral Surgery with Clinical Excellence" ? " mt-0 sm:mt-0" : "")
                      }
                      style={{ fontSize: '50px', lineHeight: '1.3' }}
                    >
                      {index === 0 ? (
                        <>
                          <span className="block">Your Oral Surgery</span>
                          <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                            Practice Management Solution
                          </span>
                        </>
                      ) : (
                        slide.title.split(" ").map((word, i) => (
                          <span key={i}>
                            {i > 0 && " "}
                            {i === slide.title.split(" ").length - 1 ? (
                              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                {word}
                              </span>
                            ) : (
                              word
                            )}
                          </span>
                        ))
                      )}
                    </h1>

                    <p
                      className={
                        `text-xl text-foreground mb-8 leading-relaxed animate-fade-in` +
                          (slide.title === "Advanced Oral Surgery with Clinical Excellence" ? " mt-16 sm:mt-24 mb-0 sm:mb-0 -mt-4" : "")
                      }
                    >
                      {index === 0 ? (
                        <>
                          <span className="block">Our cloud-based technology delivers powerful solutions –</span>
                          <span className="block">providing the practice management tools necessary for your success.</span>
                        </>
                      ) : (
                        slide.description
                      )}
                    </p>

                    {/* Explore Services button removed as requested */}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-background/80 backdrop-blur-sm hover:bg-background" />
        <CarouselNext className="right-4 bg-background/80 backdrop-blur-sm hover:bg-background" />
      </Carousel>
    </section>
  );
};

export default Hero;
