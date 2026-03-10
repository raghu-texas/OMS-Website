import teamCollaboration from "@/assets/team-collaboration.jpg";
import ImageWithFallback from "@/components/ImageWithFallback";
import practiceMgmtImage from "@/assets/feature-practice-mgmt1.png";
import serviceImg from "@/assets/service.png";
import financeImg from "@/assets/finance1.png";
import billingCollectionsImg from "@/assets/billing_collections.png";
import accountsPayableImage from "@/assets/feature-accounts-payable.png";
import itReviewImg from "@/assets/it_review.png";
import cloudSecurity from "@/assets/cloud-security.jpg";
import { useState } from "react";

// Partner logo imports
import criticareLogo from "@/assets/criticare.png";
import drfirstLogo from "@/assets/drfirst.png";
import dxcLogo from "@/assets/DXC.png";
import mindrayLogo from "@/assets/mindray.png";
import omsPartnerLogo from "@/assets/oms-partnerllc.png";
import pbhsLogo from "@/assets/pbhs.png";
import rectangleHealthLogo from "@/assets/Rectangle-Health.png";
import revenuewellLogo from "@/assets/RevenueWell.png";
import texasaiLogo from "@/assets/Texasai-Logo.png";
import twilioLogo from "@/assets/twilio.png";
import waystarLogo from "@/assets/waystar.png";

const partnerLogos = [
  { name: "Criticare", src: criticareLogo },
  { name: "DrFirst", src: drfirstLogo },
  { name: "DXC", src: dxcLogo },
  { name: "Mindray", src: mindrayLogo },
  { name: "OMS Partners", src: omsPartnerLogo },
  { name: "PBHS", src: pbhsLogo },
  { name: "Rectangle Health", src: rectangleHealthLogo },
  { name: "RevenueWell", src: revenuewellLogo },
  { name: "Texas AI", src: texasaiLogo },
  { name: "Twilio", src: twilioLogo },
  { name: "Waystar", src: waystarLogo },
];

const AboutUs = () => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div>
      <main>
        {/* Page Title Section with Horizontal Gradient */}
        <section className="pt-24 pb-2">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative mb-2">
              {/* Centered fit-content container */}
              <div className="flex justify-center">
                <div
                  className="relative inline-block"
                  style={{ width: 'min(100%, 56rem)', height: 'fit-content' }}
                >
                  {/* Horizontal gradient background */}
                  <div
                    className="absolute inset-0 rounded-3xl overflow-hidden"
                    style={{
                      background: "#E8F1F9"
                    }}
                  />
                  {/* Radial soft highlights */}
                  <div className="absolute top-3 left-8 w-24 h-24 bg-[#E3EEF7] rounded-full blur-3xl opacity-70" />
                  <div className="absolute bottom-3 right-8 w-32 h-32 bg-[#E3EEF7] rounded-full blur-3xl opacity-60" />
                  {/* Content */}
                  <div className="relative text-center py-2 px-6 w-full">
                    <div className="flex items-center justify-center gap-4 mb-2">
                      <div className="h-1 w-12 bg-gradient-to-r from-transparent to-[#2589CB] rounded-full" />
                      <div className="h-1 w-1 bg-[#2589CB] rounded-full" />
                      <div className="h-1 w-12 bg-gradient-to-l from-transparent to-[#2589CB] rounded-full" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight text-[#0D47A1]">
                      About <span className="text-[#2589CB]">Us</span>
                    </h1>
                    <div className="flex items-center justify-center gap-4 mt-0">
                      <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-[#617CB5]" />
                      <div className="h-2 w-2 border-2 border-[#2589CB] rounded-full" />
                      <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-[#617CB5]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-4 pb-8 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content - Left Side */}
              <div className="space-y-6">
                {/* Modern Title Container */}
                <div className="relative">
                  <div 
                    className="inline-block px-8 py-4 rounded-lg shadow-lg transform -skew-x-2"
                    style={{ backgroundColor: '#980826' }}
                  >
                    <h2 className="text-2xl sm:text-3xl font-bold text-white transform skew-x-2">
                      WELCOME TO ONLINEMEDSYS.COM
                    </h2>
                  </div>
                  <div 
                    className="absolute -bottom-2 -right-2 w-full h-full rounded-lg -z-10 opacity-30"
                    style={{ backgroundColor: '#980826' }}
                  />
                </div>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p className="font-semibold text-foreground">
                    OnlineMedSys.com is your complete Practice Management Solution.
                  </p>
                  <p>
                    For over 25 years, the OnlineMedSys.com system has provided features that translate
                    into increased productivity and enhanced patient care. Designed for oral surgery by
                    a network of oral surgeons, the application modules are tightly integrated to minimize
                    the need for duplicate data entry, to streamline the workflow process, and to give
                    comprehensive reports about patients and practice activity.​
                  </p>
                </div>
              </div>

              {/* Image - Right Side */}
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={teamCollaboration}
                  alt="OnlineMedSys Team"
                  className="w-full h-[360px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Additional Services Cards */}
        <section className="pt-0 pb-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {[
              {
                title: "Additional Business Service Options",
                description:
                  "By combining the talents of our professionals and partners, we can provide you with additional tools and the insight for complete and efficient Practice Management. We have built a suite of services and products that gives providers and staff the ability to solve the practical challenges of running a practice more efficiently and profitably.",
                image: serviceImg,
              },
              {
                title: "Full Financial Services",
                description:
                  <>OnlineMedSys.com offers a complete suite of practice management services by providing comprehensive financial and operational services to medical and dental practices through OMS Partners at <a href="https://www.omsp.com" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>www.omsp.com</a></>,
                image: financeImg,
              },
              {
                title: "Billing & Collections",
                description:
                  "Streamline your operational workflow of the traditional billing and collection processes with help from OMS Partners. Patient scheduling, patient alerts, patient office flow, proper billing, and timely collections are the lifeblood of any medical and dental practice.",
                image: billingCollectionsImg,
              },
              {
                title: "IT Review",
                description:
                  "OnlineMedSys.com can work with your local technology vendor to review the design, purchase and installation of your customized practice's computer resources to ensure compatibility with our applications.",
                image: itReviewImg,
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className={`grid lg:grid-cols-2 gap-8 items-center p-8 rounded-2xl ${card.title === "Additional Business Service Options" || card.title === "Billing & Collections" ? 'bg-[#FAFCFD]' : 'bg-white'} shadow-sm border border-[#D2DEF9]`}
              >
                {/* Image */}
                <div className={`${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className={`rounded-2xl overflow-hidden shadow-lg ${idx < 3 ? 'w-[90%] mx-auto' : ''}`}>
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-[360px] object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                {/* Content */}
                <div className={`${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
                    {card.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Trusted Partners Section */}
        <section className="py-5 border-t border-[#D2DEF9]" style={{ backgroundColor: '#282936' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Ribbon Title */}
            <div className="flex justify-center mb-6">
              <div className="relative inline-block">
                <div 
                  className="px-10 py-3 rounded-lg shadow-lg transform"
                  style={{ 
                    background: 'linear-gradient(135deg, #2589CB 0%, #0D47A1 100%)',
                    boxShadow: '0 20px 40px rgba(37, 137, 203, 0.2)'
                  }}
                >
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                    OUR TRUSTED PARTNERS
                  </h2>
                </div>
                <div 
                  className="absolute -inset-1 rounded-lg -z-10 opacity-20 blur"
                  style={{ background: 'linear-gradient(135deg, #2589CB 0%, #0D47A1 100%)' }}
                />
              </div>
            </div>

            {/* Auto-scrolling Carousel */}
            <div 
              className="relative overflow-hidden rounded-2xl bg-white shadow-md"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Gradient Overlays for Seamless Effect */}
              <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

              {/* Carousel Track */}
              <style>{`
                @keyframes scroll-left {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(-50%);
                  }
                }
                
                .carousel-track {
                  animation: scroll-left 40s linear infinite;
                }
                
                .carousel-track.paused {
                  animation-play-state: paused;
                }
              `}</style>

              <div className="flex">
                <div 
                  className={`carousel-track flex gap-8 py-4 px-5 ${isHovering ? 'paused' : ''}`}
                  style={{
                    width: '200%',
                    willChange: 'transform',
                  }}
                >
                  {/* Original Set */}
                  {partnerLogos.map((partner, idx) => (
                    <div 
                      key={`original-${idx}`}
                      className="flex items-center justify-center flex-shrink-0"
                      style={{ width: '160px', height: '88px' }}
                    >
                      <img 
                        src={partner.src} 
                        alt={partner.name}
                        className="object-contain"
                        style={{ height: '65px' }}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  ))}

                  {/* Duplicate Set for Seamless Loop */}
                  {partnerLogos.map((partner, idx) => (
                    <div 
                      key={`duplicate-${idx}`}
                      className="flex items-center justify-center flex-shrink-0"
                      style={{ width: '160px', height: '88px' }}
                    >
                      <img 
                        src={partner.src} 
                        alt={partner.name}
                        className="object-contain"
                        style={{ height: '65px' }}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>


          </div>
        </section>

      </main>
    </div>
  );
};

export default AboutUs;
