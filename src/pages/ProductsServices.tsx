import { useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, FileText, Scan, UserCircle, CreditCard, Workflow, Share2, Server, ShieldCheck, Smartphone } from "lucide-react";
import flowChart from "@/assets/flow-chart.png";
import featuresChart from "@/assets/features-chart.avif";

const ProductsServices = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const goTo = useCallback((path: string) => navigate(path), [navigate]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
    }
  }, [location.hash]);
  const services = [
    {
      icon: Briefcase,
      title: "Practice Management",
      id: "practice-management",
      description: "Streamline your oral surgery practice operations with comprehensive management tools for scheduling, billing, and administrative tasks."
    },
    {
      icon: Server,
      title: "EMR Systems",
      id: "emr-systems",
      description: "Robust electronic medical records platform enabling efficient clinical documentation, interoperability, and decision support."
    },
    {
      icon: CreditCard,
      title: "Revenue Cycle Management",
      id: "revenue-cycle-management",
      description: "Integrated RCM tools for claims, denials, reimbursements, and financial reporting.",
    },
    {
      icon: FileText,
      title: "Consent Forms",
      id: "consent-forms",
      description: "Digital consent management system ensuring secure, compliant documentation for all Oral surgery procedures and treatments."
    },
    {
      icon: Share2,
      title: "Referral Portal",
      id: "referral-portal",
      description: "Streamline provider-to-provider referrals with secure data exchange and real-time tracking of patient handoffs."
    },
    {
      icon: UserCircle,
      title: "Patient Portal",
      id: "patient-portal",
      description: "Secure online portal for patients to access health records, test results, appointments, and communicate with providers."
    },
    {
      icon: Scan,
      title: "Scan Application",
      id: "scan-application",
      description: "Advanced Document management solutions with integrated AI analysis for Preserving EOB and Payment records."
    },
    {
      icon: ShieldCheck,
      title: "Provider Credentialing",
      id: "provider-credentialing",
      description: "Automated credentialing management to accelerate onboarding, maintain compliance, and reduce administrative overhead."
    },
    {
      icon: Users,
      title: "Human Resources",
      id: "human-resources",
      description: "Efficient HR solutions for healthcare facilities including staff management, time and attendance tracking."
    },
    {
      icon: CreditCard,
      title: "Accounts Payable",
      id: "accounts-payable",
      description: "Simple solution for uploading payable invoices and tracking their payment details."
    },
    {
      icon: Smartphone,
      title: "Provider Mobile Apps (iOS & Android)",
      id: "mobile-apps",
      description: "Secure mobile access to daily schedules and e-prescription details for healthcare providers on-the-go."
    }
  ];

  return (
    <div>
      <section className="pt-24 pb-10 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with Horizontal Gradient */}
          <div className="relative mb-12">
            {/* Gradient background (horizontal) - fit content width */}
            <div className="flex justify-center">
              <div className="relative inline-block" style={{ width: 'min(100%, 56rem)', height: 'fit-content' }}>
                <div
                  className="absolute inset-0 rounded-3xl overflow-hidden"
                  style={{
                    background: "#E8F1F9"
                  }}
                />
                {/* Soft radial highlights */}
                <div className="absolute top-3 left-8 w-24 h-24 bg-[#E3EEF7] rounded-full blur-3xl opacity-70" />
                <div className="absolute bottom-3 right-8 w-32 h-32 bg-[#E3EEF7] rounded-full blur-3xl opacity-60" />

                {/* Content */}
                <div className="relative text-center py-2 px-6 w-full">
                  {/* Decorative top marker */}
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="h-1 w-12 bg-gradient-to-r from-transparent to-[#2589CB] rounded-full" />
                    <div className="h-1 w-1 bg-[#2589CB] rounded-full" />
                    <div className="h-1 w-12 bg-gradient-to-l from-transparent to-[#2589CB] rounded-full" />
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight text-[#0D47A1] whitespace-nowrap">
                    Apps & <span className="text-[#2589CB]">Services</span>
                  </h1>
                  {/* Decorative bottom marker */}
                  <div className="flex items-center justify-center gap-4 mt-0">
                    <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-[#617CB5]" />
                    <div className="h-2 w-2 border-2 border-[#2589CB] rounded-full" />
                    <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-[#617CB5]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Introduction Text */}
          <div className="max-w-4xl mx-auto mb-16 text-lg text-black leading-relaxed space-y-4">
            <p>
              The OnlineMedSys.com system provides many features that translate into increased productivity 
              and enhanced patient care. The application modules are tightly integrated to minimize the need 
              for duplicate data entry, to streamline and speed the workflow process, and to give 
              comprehensive reports about patients and practice activity.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We link directly to the internet-providing you with fast, secure information anytime, anywhere</li>
              <li>We provide robust security and world-wide accessibility</li>
              <li>You manage your practice – we manage the technology</li>
            </ul>
          </div>

          {/* Process Chart Image */}
          <div className="mb-12 max-w-4xl mx-auto">
            <img
              src={flowChart}
              alt="Process Workflow Chart"
              className="w-full h-auto rounded-lg shadow"
              loading="lazy"
              decoding="async"
            />
          </div>

          

          {/* Applications Header */}
          <h2 className="text-2xl font-bold mb-4 text-[#2589CB] text-center">Applications</h2>
          {/* Service Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isPractice = service.title === "Practice Management";
              const isRCM = service.title === "Revenue Cycle Management";
              const isHR = service.title === "Human Resources";
              const isConsent = service.title === "Consent Forms";
              const isScan = service.title === "Scan Application";
              const isEMR = service.title === "EMR Systems";
              const isCredential = service.title === "Provider Credentialing";
              const isAP = service.title === "Accounts Payable";
              const isPatientPortal = service.title === "Patient Portal";
              const isReferralPortal = service.title === "Referral Portal";
              const isMobileApps = service.title === "Provider Mobile Apps (iOS & Android)";
              return (
                <Card
                  key={index}
                  id={service.id}
                  className="group transition-all duration-300 hover:-translate-y-1 border-border/50 cursor-pointer"
                  style={{
                    backgroundColor: '#0066b1'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#A9A9A9';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = '#0066b1';
                  }}
                  onClick={() => {
                    if (isPractice) return goTo("/practice-management");
                    if (isRCM) return goTo("/services/rcm");
                    if (isHR) return goTo("/services/hr");
                    if (isConsent) return goTo("/services/consent");
                    if (isScan) return goTo("/services/scan");
                    if (isEMR) return goTo("/services/emr");
                    if (isCredential) return goTo("/services/credentialing");
                    if (isAP) return goTo("/services/ap");
                    if (isPatientPortal) return goTo("/services/patient-portal");
                    if (isReferralPortal) return goTo("/services/referral-portal");
                    if (isMobileApps) return goTo("/services/mobile-apps");
                  }}
                >
                  <CardHeader>
                    <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="text-white" size={28} />
                    </div>
                    <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed text-white/90">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProductsServices;
