import whyChooseImage from "@/assets/why_choose.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const WhyChoose = () => {
  return (
    <section className="pt-4 pb-4 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="w-full lg:w-[90%] lg:mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={whyChooseImage}
              alt="Why Choose OnlineMedSys"
              className="w-full h-[378px] object-cover object-top"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6 text-foreground">Why Choose OnlineMedSys?</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground">Experience and Expertise</h3>
                <p className="text-muted-foreground">
                  With over 25 years of experience, we understand the intricacies of oral surgery
                  practice management software.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Efficiency and Accessibility</h3>
                <p className="text-muted-foreground">
                  Access your practice data anytime, anywhere with our cloud-based solution.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Dedicated Support Team</h3>
                <p className="text-muted-foreground">
                  Our team is committed to providing exceptional support and guidance at every step.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Advanced and Secure</h3>
                <p className="text-muted-foreground">
                  OnlineMedSys utilizes advanced security measures to safeguard your practice data.
                </p>
              </div>
            </div>

            {/* CTA removed as requested */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;