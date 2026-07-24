import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, FileText, Scan, UserCircle, CreditCard, Workflow } from "lucide-react";
const Services = () => {
  const navigate = useNavigate();
  const goTo = useCallback((path: string) => navigate(path), [navigate]);
  const services = [
    // 1st row
    {
      icon: Briefcase,
      title: "Practice Management",
      description: "Streamline your oral surgery practice operations with comprehensive management tools for scheduling, billing, and administrative tasks."
    },
    {
      icon: Workflow,
      title: "EMR System",
      description: "Robust electronic medical records platform enabling efficient clinical documentation, interoperability, and decision support."
    },
    {
      icon: CreditCard,
      title: "Revenue Cycle Management",
      description: "Integrated RCM tools for claims, denials, reimbursements, and financial reporting."
    },
    // 2nd row
    {
      icon: FileText,
      title: "Consent Forms",
      description: "Digital consent management system ensuring secure, compliant documentation for all Oral surgery procedures and treatments."
    },
    {
      icon: Workflow,
      title: "Referral Portal",
      description: "Streamline provider-to-provider referrals with secure data exchange and real-time tracking of patient handoffs."
    },
    {
      icon: UserCircle,
      title: "Patient Portal",
      description: "Secure online portal for patients to access health records, test results, appointments, and communicate with providers."
    },
    // 3rd row
    {
      icon: Scan,
      title: "Scan Application",
      description: "Advanced Document management solutions with integrated AI analysis for Preserving EOB and Payment records."
    },
    {
      icon: Workflow,
      title: "Provider Credentialing",
      description: "Automated credentialing management to accelerate onboarding, maintain compliance, and reduce administrative overhead."
    },
    {
      icon: Users,
      title: "Human Resources",
      description: "Efficient HR solutions for healthcare facilities including staff management, time and attendance tracking."
    },
    // 4th row
    {
      icon: CreditCard,
      title: "Accounts Payable",
      description: "Simple solution for uploading payable invoices and tracking their payment details."
    }
  ];
  return <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Our Healthcare{" "}
            <span style={{ color: '#2589CB' }}>
              Services
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive healthcare solutions tailored to your needs, powered by advanced technology and compassionate care.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
          const Icon = service.icon;
          const isPractice = service.title === "Practice Management";
          const isRCM = service.title === "Revenue Cycle Management";
          const isHR = service.title === "Human Resources";
          const isConsent = service.title === "Consent Forms";
          const isScan = service.title === "Scan Application";
          const isEMR = service.title === "EMR System";
          const isCredential = service.title === "Provider Credentialing";
          const isAP = service.title === "Accounts Payable";
          const isSMS = service.title === "SMS Dashboard";
          const isPatientPortal = service.title === "Patient Portal";
          const isReferralPortal = service.title === "Referral Portal";
          return <Card key={index} className="group transition-all duration-300 hover:-translate-y-1 border-border/50 cursor-pointer" style={{
            backgroundColor: '#0066b1'
          }} onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#A9A9A9';
          }} onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = '#0066b1';
          }} onClick={() => {
            if (isPractice) return goTo("/practice-management");
            if (isRCM) return goTo("/services/rcm");
            if (isHR) return goTo("/services/hr");
            if (isConsent) return goTo("/services/consent");
            if (isScan) return goTo("/services/scan");
            if (isEMR) return goTo("/services/emr");
            if (isCredential) return goTo("/services/credentialing");
            if (isAP) return goTo("/services/ap");
            if (isSMS) return goTo("/services/sms");
            if (isPatientPortal) return goTo("/services/patient-portal");
            if (isReferralPortal) return goTo("/services/referral-portal");
          }}>
                <CardHeader>
                  <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center mb-4 transform-gpu transition-transform duration-300 ease-out group-hover:scale-110">
                    <Icon className="text-white" size={28} />
                  </div>
                  {isPractice ? (
                    <div className="inline-block px-3 py-1 rounded-md border" style={{ borderColor: '#D2DEF9', backgroundColor: 'rgba(255,255,255,0.12)' }}>
                      <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                    </div>
                  ) : (
                    <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                  )}
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-white/90">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>;
        })}
        </div>
      </div>
    </section>;
};
export default Services;