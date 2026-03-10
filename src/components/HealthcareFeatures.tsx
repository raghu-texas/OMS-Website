import { useRef, useState } from "react";
import practiceMgmtImage from "@/assets/feature-practice-mgmt1.png";
import patientPortalImage from "@/assets/feature-patient-portal.png";
import revenueCycleImage from "@/assets/feature-revenue-cycle.png";
import emrImage from "@/assets/feature-emr.png";
import referralImage from "@/assets/referral.jpeg";
import hrImage from "@/assets/feature-hr.png";
import accountsPayableImage from "@/assets/feature-accounts-payable.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ImageWithFallback from "@/components/ImageWithFallback";
const HealthcareFeatures = () => {
  const ZoomableImage = ({ src, alt }: { src: string; alt: string }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [lens, setLens] = useState({ visible: false, rect: null as DOMRect | null });

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setLens({ visible: true, rect });
    };

    const handleLeave = () => setLens({ visible: false, rect: null });

    // Calculate animation origin from image position
    const rect = lens.rect;
    const originX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const originY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight / 2;
    
    // Distance from image center to screen center
    const translateX = screenCenterX - originX;
    const translateY = screenCenterY - originY + 36; // 0.25in ≈ 36px

    return (
      <div className="relative w-full mx-auto">
        <div
          ref={containerRef}
          className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border w-[90%] mx-auto"
          style={{ borderColor: '#D2DEF9' }}
          onMouseMove={handleMove}
          onMouseEnter={handleMove}
          onMouseLeave={handleLeave}
        >
          <ImageWithFallback
            src={src}
            alt={alt}
            className="w-full h-[360px] object-cover rounded-2xl"
          />
        </div>
        <div
          className="pointer-events-none fixed w-[877px] h-[582px] rounded-2xl border shadow bg-white overflow-hidden"
          style={{
            borderColor: '#D2DEF9',
            zIndex: 50,
            left: originX,
            top: originY,
            transform: lens.visible 
              ? `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(1)` 
              : 'translate(-50%, -50%) scale(0.2)',
            opacity: lens.visible ? 1 : 0,
            transition: 'all 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            visibility: lens.visible ? 'visible' : 'hidden',
          }}
        >
          <ImageWithFallback
            src={src}
            alt={`${alt} preview`}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    );
  };

  const features = [{
    image: practiceMgmtImage,
    title: "Practice Management Solutions",
    description: "Comprehensive practice management software that streamlines scheduling, billing, and workflow optimization. Our integrated platform helps you manage every aspect of your healthcare practice efficiently, from appointment booking to revenue cycle management. Reduce administrative burden and focus more on patient care with our intelligent automation features."
  }, {
    image: patientPortalImage,
    title: "Patient Portal & Engagement",
    description: "Empower your patients with 24/7 access to their health records and appointment scheduling. Our secure patient portal enhances communication between providers and patients, improving satisfaction and outcomes. Features include online bill pay, prescription refills, secure messaging, and telehealth integration for modern healthcare delivery."
  }, {
    image: emrImage,
    title: "Electronic Medical Records",
    description: "Advanced EMR system designed for seamless clinical documentation and data management. Our intuitive interface reduces charting time while ensuring accurate, comprehensive patient records. Built-in clinical decision support, customizable templates, and interoperability standards help you deliver evidence-based care efficiently and effectively."
  }, {
    image: revenueCycleImage,
    title: "Revenue Cycle Management",
    description: "Maximize your practice's financial performance with our intelligent billing and revenue cycle management solution. Automated claim submission, denial management, and real-time eligibility verification streamline your billing processes. Our analytics dashboard provides insights into financial performance, helping you identify opportunities for revenue optimization."
  }, {
    image: hrImage,
    title: "Human Resources",
    description: "Maintain individual employee profiles with hiring, payroll and benefits details.  Manage and approve your staff's time punches, time off records for payroll processing with ADP. Track PTO, vacation, sick leave, jury and travel hours.  Additionally, the system supports automated generation of weekly, overtime, pay-period, and monthly timesheets."
  }, {
    image: accountsPayableImage,
    title: "Accounts Payable",
    description: "Scan and upload new invoices to track and manage payables.  Easily review and authorize vendor invoices for later payment by management or outside accountants.  Review paid invoice data or generate custom reports."
  }, {
    image: referralImage,
    title: "Referral Portal",
    description: "Streamline patient referrals with our secure and efficient referral portal, ensuring seamless communication between providers."
  }];
  const lightBgTitles = [
    "Practice Management Solutions",
    "Electronic Medical Records",
    "Human Resources",
    "Referral Portal",
    "Revenue Cycle Management",
    "Patient Portal & Engagement",
    "Accounts Payable",
  ];
  const borderTitles = [
    "Electronic Medical Records",
    "Revenue Cycle Management",
    "Human Resources",
    "Accounts Payable",
    "Practice Management Solutions",
    "Patient Portal & Engagement",
    "Referral Portal",
  ];
  const exploreRouteByTitle: Record<string, string> = {
    "Practice Management Solutions": "/practice-management",
    "Electronic Medical Records": "/services/emr",
    "Revenue Cycle Management": "/services/rcm",
    "Human Resources": "/services/hr",
    "Accounts Payable": "/services/ap",
    // Fallbacks for items without dedicated service pages yet
    "Patient Portal & Engagement": "/services/patient-portal",
    "Referral Portal": "/services/referral-portal",
  };
  return <section className="pt-4 pb-4 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="font-bold mb-4 text-center uppercase tracking-wide text-[30px] leading-tight" style={{
          color: '#2589CB'
        }}>
            <span className="block">YOUR ORAL SURGERY</span>
            <span className="block">PRACTICE MANAGEMENT SOLUTION</span>
          </h2>
            <p className="text-xl text-muted-foreground text-center">
              <span className="block">Our cloud-based technology delivers powerful solutions – providing</span>
              <span className="block">the practice management tools necessary for your success.</span>
            </p>
        </div>

        <div className="space-y-8">
          {features.map((feature, index) => {
            const isLightBg = lightBgTitles.includes(feature.title);
            const whiteBgTitles = ["Revenue Cycle Management", "Patient Portal & Engagement", "Accounts Payable"];
            const bgColor = whiteBgTitles.includes(feature.title) ? "#FFFFFF" : (isLightBg ? "#FAFCFD" : undefined);
          const hasBorder = borderTitles.includes(feature.title);
          return <div
              key={index}
              className={`grid lg:grid-cols-2 gap-8 items-center p-8 rounded-2xl ${isLightBg ? 'text-black' : ''} ${hasBorder ? 'border' : ''}`}
              style={{ ...(hasBorder ? { borderColor: '#D2DEF9' } : {}), ...(bgColor ? { backgroundColor: bgColor } : {}) }}
            >
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <ZoomableImage src={feature.image} alt={feature.title} />
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h3 className={`text-3xl font-bold mb-4 ${isLightBg ? 'text-black' : 'text-foreground'}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-lg leading-relaxed ${isLightBg || feature.title === 'Referral Portal' ? 'text-black/90' : 'text-muted-foreground'}`}>
                    {feature.description}
                  </p>
                  <div className="mt-6">
                    <Link to={exploreRouteByTitle[feature.title] || "/products-services"}>
                      <Button size="lg" className="bg-[#980826] hover:bg-[#7d0620] text-white shadow-sm">
                        Explore more
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>;
        })}
        </div>
      </div>
    </section>;
};
export default HealthcareFeatures;