import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      image: testimonial1,
      name: "Dr. Jennifer Collins",
      role: "Oral & Maxillofacial Surgeon",
      feedback: "OnlineMedSys has streamlined every aspect of our practice. From referrals and scheduling to clinical documentation and billing, everything works together seamlessly, allowing our team to focus more on patient care.",
      rating: 5,
    },
    {
      image: testimonial2,
      name: "Dr. Robert Chen",
      role: "Orthodontist",
      feedback: "OnlineMedSys combines practice management, EMR, referrals, and revenue management into one intuitive platform. It has made our practice more efficient while supporting the high standard of care we strive to provide.",
      rating: 5,
    },
    {
      image: testimonial3,
      name: "Michael Torres",
      role: "Oral Surgeon",
      feedback: "The seamless integration between referrals, clinical documentation, and patient management has enhanced collaboration with referring providers and improved the overall efficiency of our practice.",
      rating: 5,
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Practices Say
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Real experiences from people who trust us with their healthcare needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {testimonial.feedback}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
