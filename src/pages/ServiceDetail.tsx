import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useMemo, useState } from "react";
import ImageWithFallback from "@/components/ImageWithFallback";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import hrImage from "@/assets/hr-application.png";
import consentImage from "@/assets/consent-form.png";
import consentImage1 from "@/assets/consent-form1.png";
import scanImage from "@/assets/scan-application.png";
import scanImage1 from "@/assets/scan-application1.png";
import emrImage from "@/assets/emr-system.png";
import patientPortalImage from "@/assets/feature-patient-portal.png";
import patientPortalImage1 from "@/assets/feature-patient-portal1.png";
import referralImage from "@/assets/referral.png";
import credentialImage from "@/assets/provider-credentialing.png";
import apImage from "@/assets/ap-application.png";
import practiceImage from "@/assets/Practice_management.png";
import featuresChart from "@/assets/features-chart.avif";
import smsImage from "@/assets/sms-dashboard.png";
import implantImage from "@/assets/implant-tracking.png";
import schedulerImage from "@/assets/scheduler-management.png";
import rcmImage from "@/assets/rcm-revenue-cycle-management.png";
import iosImage from "@/assets/ios.png";
import androidImage from "@/assets/android.png";
import { useParams } from "react-router-dom";

// Define the order of services to display vertically in a single page
const serviceOrder = [
  "practice",
  "emr",
  "rcm",
  "consent",
  "referral-portal",
  "patient-portal",
  "scan",
  "credentialing",
  "hr",
  "ap",
  "mobile-apps"
];

const serviceSummaryMap: Record<string, string> = {
  practice: "Comprehensive scheduling, billing, and workflow tools that help practices run efficiently.",
  emr: "Purpose-built EMR workflows for accurate clinical documentation and oral surgery patient care.",
  rcm: "End-to-end revenue cycle management for cleaner claims, faster collections, and stronger cash flow.",
  consent: "Digital consent collection with secure storage, e-signatures, and compliance-friendly workflows.",
  "referral-portal": "Real-time provider referral coordination, secure messaging, and patient handoff visibility.",
  "patient-portal": "Patient-centered portal access for appointments, payments, forms, and secure communication.",
  scan: "AI-assisted document scanning and extraction for EOBs, checks, and financial records.",
  credentialing: "Automated provider credentialing, payer enrollment, and compliance tracking in one system.",
  hr: "Human resources and time-off tracking with payroll-ready workflows for staff operations.",
  ap: "Online invoice and purchase-order management designed to simplify approvals and payments.",
  "mobile-apps": "Secure provider mobile access to schedules, patient details, and e-prescription information.",
};

const imageMap: Record<string, { title: string; src: string }> = {
  hr: { title: "Human Resources", src: hrImage },
  consent: { title: "Consent Forms", src: consentImage },
  scan: { title: "Scan Application", src: scanImage },
  emr: { title: "EMR System", src: emrImage },
  "patient-portal": { title: "Patient Portal", src: patientPortalImage },
  "referral-portal": { title: "Referral Portal", src: referralImage },
  credentialing: { title: "Provider Credentialing", src: credentialImage },
  ap: { title: "Accounts Payable", src: apImage },
  practice: { title: "Practice Management", src: practiceImage },
  sms: { title: "SMS Dashboard", src: smsImage },
  rcm: { title: "Revenue Cycle Management", src: rcmImage },
  "mobile-apps": { title: "Provider Mobile Apps (iOS & Android)", src: iosImage },
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const [activeSlug, setActiveSlug] = useState(slug || serviceOrder[0]);
  const activeItem = imageMap[activeSlug];
  const currentIndex = useMemo(() => serviceOrder.indexOf(activeSlug), [activeSlug]);

  useEffect(() => {
    setActiveSlug(slug || serviceOrder[0]);
  }, [slug]);

  useEffect(() => {
    if (!slug) return;

    const target = document.getElementById(`service-${slug}`);
    if (!target) return;

    const headerOffset = 96;
    const scrollToTarget = () => {
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    };

    window.requestAnimationFrame(scrollToTarget);
    const timeoutId = window.setTimeout(scrollToTarget, 120);

    return () => window.clearTimeout(timeoutId);
  }, [slug]);

  useEffect(() => {
    const updateActiveServiceFromViewport = () => {
      const sections = serviceOrder
        .map((serviceSlug) => document.getElementById(`service-${serviceSlug}`))
        .filter((section): section is HTMLElement => Boolean(section));

      if (sections.length === 0) return;

      const viewportTop = window.innerHeight * 0.18;
      const viewportBottom = window.innerHeight * 0.9;
      let activeIndex = 0;
      let activeSectionDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < viewportBottom && rect.bottom > viewportTop;

        if (isVisible) {
          const distance = Math.abs(rect.top - viewportTop);
          if (distance < activeSectionDistance) {
            activeSectionDistance = distance;
            activeIndex = index;
          }
        }
      });

      setActiveSlug((prevSlug) => {
        const nextSlug = serviceOrder[activeIndex];
        return prevSlug === nextSlug ? prevSlug : nextSlug;
      });
    };

    updateActiveServiceFromViewport();

    let animationFrameId = 0;
    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(updateActiveServiceFromViewport);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToService = (targetSlug: string) => {
    const target = document.getElementById(`service-${targetSlug}`);
    if (!target) return;

    const headerOffset = 96;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveSlug(targetSlug);

    window.requestAnimationFrame(() => {
      const adjustedTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: adjustedTop, behavior: "smooth" });
    });
  };

  const goToPrevious = () => {
    if (currentIndex <= 0) return;
    scrollToService(serviceOrder[currentIndex - 1]);
  };

  const goToNext = () => {
    if (currentIndex >= serviceOrder.length - 1) return;
    scrollToService(serviceOrder[currentIndex + 1]);
  };

  const ZoomableImage = ({ src, alt, height = "auto", borderWidth = 6, borderColor = '#010101', fit = "cover" }: { src: string; alt: string; height?: string; borderWidth?: number; borderColor?: string; fit?: "cover" | "contain" | "fill" }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div className="relative w-full mx-auto">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-full text-left cursor-zoom-in"
            aria-label={`Open ${alt}`}
          >
            <div
              className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border w-full bg-white"
              style={{ borderColor, borderWidth: `${borderWidth}px`, height }}
            >
              <ImageWithFallback
                src={src}
                alt={alt}
                className={`w-full h-full ${fit === "contain" ? "object-contain" : fit === "fill" ? "object-fill" : "object-cover"}`}
              />
            </div>
          </button>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="fixed inset-0 z-50 flex items-center justify-center border-0 bg-black/80 p-2 sm:p-4 left-0 top-0 translate-x-0 translate-y-0 w-auto max-w-none">
            <DialogTitle className="sr-only">{alt}</DialogTitle>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-red-600 p-2 text-white shadow-lg hover:bg-red-700"
              aria-label="Close image"
            >
              <X size={20} />
            </button>
            <div className="flex items-center justify-center max-h-[92vh] max-w-[95vw] overflow-hidden rounded-xl bg-white">
              <ImageWithFallback
                src={src}
                alt={alt}
                className="max-h-[92vh] max-w-[95vw] w-auto h-auto object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const renderServiceContent = (serviceSlug: string) => {
    const item = imageMap[serviceSlug];
    if (!item) return null;

    const isActive = serviceSlug === activeSlug;

    return (
      <div
        key={serviceSlug}
        id={`service-${serviceSlug}`}
        className={`rounded-2xl border p-6 md:p-8 mb-6 scroll-mt-[120px] ${isActive ? "border-[#2589CB] bg-[#F5FAFF] shadow-md" : "border-[#D2DEF9] bg-white"}`}
      >
        <div className="relative mb-8">
          <div className="flex justify-center">
            <div className="relative inline-block" style={{ width: 'min(100%, 56rem)', height: 'fit-content' }}>
              <div className="absolute inset-0 rounded-3xl overflow-hidden" style={{ background: "#E8F1F9" }} />
              <div className="absolute top-3 left-8 w-24 h-24 bg-[#E3EEF7] rounded-full blur-3xl opacity-70" />
              <div className="absolute bottom-3 right-8 w-32 h-32 bg-[#E3EEF7] rounded-full blur-3xl opacity-60" />
              <div className="relative text-center py-2 px-6 w-full">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="h-1 w-12 bg-gradient-to-r from-transparent to-[#2589CB] rounded-full" />
                  <div className="h-1 w-1 bg-[#2589CB] rounded-full" />
                  <div className="h-1 w-12 bg-gradient-to-l from-transparent to-[#2589CB] rounded-full" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight text-[#0D47A1]">
                  {item.title}
                </h2>
                <div className="flex items-center justify-center gap-4 mt-0">
                  <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-[#617CB5]" />
                  <div className="h-2 w-2 border-2 border-[#2589CB] rounded-full" />
                  <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-[#617CB5]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {serviceSlug === "practice" ? (
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 grid lg:grid-cols-2 gap-6 items-start">
              <div className="space-y-4 text-black">
                <p>
                  OnlineMedSys.com Practice Manager features integrated tools for key patient and revenue
                  management functions. Together, they will help you manage your practice more easily and
                  efficiently.
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Scheduling</li>
                  <li>Billing &amp; Claims</li>
                  <li>Patient Records</li>
                  <li>Reporting</li>
                  <li>Correspondence Tools</li>
                  <li>Scanning</li>
                  <li>Cross Coding</li>
                </ul>
                <p>
                  All patient and financial data is centrally stored in highly secure off-site data centers and
                  accessed via the Internet through a Web browser. Users can access and process data on demand
                  from within any section of Practice Manager, as long as they are authorized and have an Internet
                  connection. This eliminates duplicate data entry and increases staff productivity. In addition,
                  Practice Manager gives you and your management team powerful new reporting capabilities for
                  aggregating and analyzing diverse data.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow">
                <ImageWithFallback src={featuresChart} alt="Features Chart" className="w-full h-auto object-contain" />
              </div>
            </div>

            <div className="mb-8 rounded-2xl p-6 border" style={{ backgroundColor: '#FAFCFD', borderColor: '#D2DEF9' }}>
              <div className="grid lg:grid-cols-2 gap-6 items-stretch">
                <ZoomableImage src={schedulerImage} alt="Scheduler Management" borderWidth={15} borderColor="#000" fit="fill" />
                <div className="h-full flex flex-col justify-center">
                  <div className="mb-2">
                    <h3 className="text-2xl font-semibold text-foreground">Scheduler Management</h3>
                    <p className="text-black">
                      Centralize appointments, provider availability, and rooms with clear visibility.
                    </p>
                  </div>
                  <ul className="list-disc pl-5 text-black space-y-1">
                    <li>Drag-and-drop calendar with day/week/month views</li>
                    <li>Conflicts, reminders, and waitlist handling</li>
                    <li>Multi-location and resource scheduling</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-8 rounded-2xl p-6 border" style={{ backgroundColor: '#FAFCFD', borderColor: '#D2DEF9' }}>
              <div className="grid lg:grid-cols-2 gap-6 items-stretch">
                <div className="h-full flex flex-col justify-center">
                  <div className="mb-2">
                    <h3 className="text-2xl font-semibold text-foreground">SMS Dashboard</h3>
                    <p className="text-black">
                      Monitor outbound messages, delivery status, reply trends, and opt-outs.
                    </p>
                  </div>
                  <ul className="list-disc pl-5 text-black space-y-1">
                    <li>Real-time delivery and failure statuses</li>
                    <li>Two-way messaging overview</li>
                    <li>Campaign and template performance</li>
                  </ul>
                </div>
                <ZoomableImage src={smsImage} alt="SMS Dashboard" borderWidth={15} borderColor="#000" fit="fill" />
              </div>
            </div>

            <div className="mb-10 rounded-2xl p-6 border" style={{ backgroundColor: '#FAFCFD', borderColor: '#D2DEF9' }}>
              <div className="grid lg:grid-cols-2 gap-6 items-stretch">
                <ZoomableImage src={implantImage} alt="Implant Tracking" borderWidth={15} borderColor="#000" fit="fill" />
                <div className="h-full flex flex-col justify-center">
                  <div className="mb-2">
                    <h3 className="text-2xl font-semibold text-foreground">Implant Tracking</h3>
                    <p className="text-black">
                      Track implants by lot and expiration, and map them to patient records.
                    </p>
                  </div>
                  <ul className="list-disc pl-5 text-black space-y-1">
                    <li>Inventory with lot and expiration</li>
                    <li>Patient and procedure association</li>
                    <li>Alerts for recalls and expirations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : serviceSlug === "hr" ? (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
              <ZoomableImage src={item.src} alt={item.title} height="fit-content" borderWidth={15} borderColor="#000" />
              <div className="space-y-6 md:border-l md:pl-6 border-[#D2DEF9]">
                <p className="text-sm sm:text-base text-black">
                  The HR application enables users to manage and approve staff time punches and time-off records for payroll processing with ADP. It also includes an online onboarding system and comprehensive time-off management within the HR Information System.
                </p>
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-[#0D47A1]">Employee Management</h2>
                  <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
                    <li>Grant role-based access rights to employees based on their job responsibilities</li>
                    <li>Protect confidential employee information from unauthorized access</li>
                    <li>Maintain individual employee profiles with hiring, payroll and benefits details</li>
                    <li>Track vacation, sick leave, and other time-off types</li>
                    <li>Provide online HR forms, including leave requests, flexible spending registrations, and direct deposit setup</li>
                    <li>PTO (Paid Time Off) Accrual System calculates how employees earn, carry over, and use their leave based on company policy and US labor standards</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-[#0D47A1]">Time Off Management</h2>
                  <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
                    <li>Track PTO, vacation, sick leave, jury and travel hours</li>
                    <li>Streamline approval workflows</li>
                    <li>Maintain accurate leave balances</li>
                    <li>Integrate time-off data with payroll</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-[#0D47A1]">Online Time Clock & Timesheet Management</h2>
                  <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
                    <li>Hourly time clock for employees to “punch” in and out</li>
                    <li>Synchronized with the U.S. atomic clock and auto-adjusts to time zones</li>
                    <li>Punch history accessible to employees and authorized administrators</li>
                    <li>Supervisors can review, process, and approve hours, including time off, sick leave, and bonuses</li>
                    <li>The system supports automated generation of weekly, overtime, pay-period, and monthly timesheets</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : serviceSlug === "patient-portal" ? (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch" style={{ alignItems: 'stretch' }}>
              <div className="flex flex-col gap-4 w-full">
                <ZoomableImage src={patientPortalImage} alt="Patient Portal" height="360px" borderWidth={15} borderColor="#000" fit="fill" />
                <ZoomableImage src={patientPortalImage1} alt="Patient Portal Features" height="360px" borderWidth={15} borderColor="#000" fit="fill" />
              </div>
              <div className="space-y-6 flex flex-col h-full lg:border-l lg:pl-8 border-[#D2DEF9]" style={{ minHeight: '360px' }}>
                <p className="text-sm sm:text-base text-[#010101]">
                  Our secure Patient Portal gives patients easy, 24/7 access to their care and account information—improving engagement while reducing front-desk workload.
                </p>
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-[#0D47A1]">Key Capabilities</h2>
                  <ul className="list-disc pl-5 space-y-4 text-sm sm:text-base">
                    <li><p className="font-semibold text-[#0D47A1]">Upcoming Appointments</p><p className="text-[#010101]">View scheduled appointments with date, time, provider, and location details.</p></li>
                    <li><p className="font-semibold text-[#0D47A1]">Appointment Requests</p><p className="text-[#010101]">Request new or follow-up appointments online without calling the office.</p></li>
                    <li><p className="font-semibold text-[#0D47A1]">Online Patient Registration</p><p className="text-[#010101]">Complete demographic, insurance, and medical history forms before the visit.</p></li>
                    <li><p className="font-semibold text-[#0D47A1]">Billing & Online Payments</p><p className="text-[#010101]">Check outstanding balances, view statements, and make secure online payments.</p></li>
                    <li><p className="font-semibold text-[#0D47A1]">Document Uploads</p><p className="text-[#010101]">Upload medical records, referrals, images, and consent forms directly to the practice.</p></li>
                    <li><p className="font-semibold text-[#0D47A1]">Live Chat & Secure Messaging</p><p className="text-[#010101]">Communicate with the practice in real time through secure chat and messaging.</p></li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-[#0D47A1]">Benefits for Your Practice</h2>
                  <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-[#010101]">
                    <li>Reduce phone calls and front-desk paperwork.</li>
                    <li>Improve patient satisfaction and engagement.</li>
                    <li>Accelerate check-in and payment collection.</li>
                    <li>Keep patient information accurate and up to date.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : serviceSlug === "emr" ? (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              <ZoomableImage src={item.src} alt={item.title} height="fit-content" borderWidth={15} borderColor="#000" />
              <div className="space-y-6 lg:border-l lg:pl-8 border-[#D2DEF9]">
                <p className="text-sm sm:text-base text-[#010101]">Our EMR is purpose-built to support the clinical needs of oral surgery practices, delivering precise, efficient documentation and seamless integration with your clinical workflows—from patient history to vitals during surgery.</p>
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">Comprehensive Medical History</h2><p className="text-sm sm:text-base text-[#010101]">Capture complete patient histories with structured, customizable forms designed for oral surgery workflows.</p><ul className="list-disc pl-5 space-y-2 text-sm sm:text-base"><li>Medical, surgical, and medication history with allergy alerts.</li><li>Health risk indicators such as ASA classification.</li><li>Auto-population and smart defaults to reduce typing and improve accuracy.</li></ul></div>
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">Detailed Clinical Evaluation</h2><p className="text-sm sm:text-base text-[#010101]">Document thorough evaluations with intuitive templates tailored for oral surgery assessments.</p><ul className="list-disc pl-5 space-y-2 text-sm sm:text-base"><li>Extraoral and intraoral examinations with descriptive fields.</li><li>TMJ, airway, soft tissue, and neurological assessments.</li><li>Visual annotations and image attachments directly in the record.</li></ul></div>
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">SOAP Notes for Every Visit</h2><p className="text-sm sm:text-base text-[#010101]">Maintain clear, standardized clinical notes using fully integrated SOAP (Subjective, Objective, Assessment, Plan) templates.</p><ul className="list-disc pl-5 space-y-2 text-sm sm:text-base"><li>Subjective: patient complaints, pain levels, symptoms.</li><li>Objective: exam findings, measurements, diagnostic data.</li><li>Assessment: clinical impressions and diagnosis.</li><li>Plan: surgical treatment plan, medications, follow-up.</li></ul><p className="text-sm sm:text-base text-[#010101]">SOAP templates are flexible and customizable to mirror how your practice documents patient care.</p></div>
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">Operative Documentation Made Easy</h2><p className="text-sm sm:text-base text-[#010101]">Create surgical records that are structured, compliant, and efficient.</p><ul className="list-disc pl-5 space-y-2 text-sm sm:text-base"><li>Procedure details, start/stop times, anesthesia type, and techniques.</li><li>Intra-operative findings, materials used, and complication notes.</li><li>Post-op instructions and prescriptions built into the workflow.</li><li>Auto-linking of charges and codes for procedural billing.</li></ul></div>
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">Vital Sign Monitor Integration</h2><p className="text-sm sm:text-base text-[#010101]">Enhance clinical accuracy with real-time vital sign integration during consults and procedures.</p><ul className="list-disc pl-5 space-y-2 text-sm sm:text-base"><li>Connect to vital sign monitors to automatically record blood pressure, pulse, oxygen saturation, and more.</li><li>Eliminate manual entry errors and ensure precise timestamped data.</li><li>Display trends in the patient chart for pre-op, intra-op, and post-op comparisons.</li></ul></div>
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">Why Oral Surgery Practices Love Our EMR</h2><ul className="list-disc pl-5 space-y-2 text-sm sm:text-base"><li>Faster documentation with templates built for your specialty.</li><li>Better clinical clarity across evaluations, operative records, and follow-up care.</li><li>Greater accuracy through vital sign integration and structured data capture.</li><li>Seamless care coordination across your clinical and administrative teams.</li></ul></div>
              </div>
            </div>
          </div>
        ) : serviceSlug === "referral-portal" ? (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              <ZoomableImage src={item.src} alt={item.title} height="fit-content" borderWidth={15} borderColor="#000" />
              <div className="space-y-6 lg:border-l lg:pl-8 border-[#D2DEF9]">
                <p className="text-sm sm:text-base text-[#010101]">Our Referral Portal streamlines collaboration between your oral surgery practice and referring providers, making it easier to manage patient care efficiently.</p>
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">Key Features</h2><ul className="list-disc pl-5 space-y-4 text-sm sm:text-base"><li><p className="font-semibold text-[#0D47A1]">Manage Patients</p><p className="text-[#010101]">Track referred patients, view their status, treatment plans, and outcomes in one place.</p></li><li><p className="font-semibold text-[#0D47A1]">Treatment Tracking</p><p className="text-[#010101]">Share updates on procedures, post-op progress, and follow-up care with referring providers.</p></li><li><p className="font-semibold text-[#0D47A1]">Secure Messaging</p><p className="text-[#010101]">Communicate directly with referring offices via secure, HIPAA-compliant messaging.</p></li><li><p className="font-semibold text-[#0D47A1]">Document Sharing</p><p className="text-[#010101]">Send and receive medical records, imaging, and reports seamlessly within the portal.</p></li></ul></div>
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">Benefits for Your Practice</h2><ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-[#010101]"><li>Strengthen relationships with referring providers.</li><li>Improve coordination and continuity of patient care.</li><li>Reduce phone calls, emails, and paperwork.</li><li>Ensure timely and secure information exchange.</li></ul></div>
              </div>
            </div>
          </div>
        ) : serviceSlug === "credentialing" ? (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              <ZoomableImage src={item.src} alt={item.title} height="360px" borderWidth={15} borderColor="#000" fit="fill" />
              <div className="space-y-6 lg:border-l lg:pl-8 border-[#D2DEF9]">
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">Provider Credentialing Management</h2><p className="text-sm sm:text-base font-medium text-[#010101]">Streamlined, Compliant, and Hassle-Free Provider Credentialing</p><p className="text-sm sm:text-base text-[#010101]">Our Provider Credentialing Management module simplifies the entire credentialing and enrollment process—helping healthcare organizations onboard providers faster, stay compliant, and avoid reimbursement delays.</p></div>
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">What Is Provider Credentialing?</h2><p className="text-sm sm:text-base text-[#010101]">Provider credentialing is the process of verifying a healthcare provider's qualifications, licenses, certifications, and professional history to ensure they meet regulatory, payer, and organizational standards. Credentialing is required for providers to deliver care, participate in insurance networks, and receive timely reimbursement.</p></div>
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">Key Features</h2><ul className="list-disc pl-5 space-y-4 text-sm sm:text-base"><li><p className="font-semibold text-[#0D47A1]">Centralized Provider Profiles</p><p className="text-[#010101]">Maintain a single, secure profile for each provider. Store licenses, certifications, education, work history, and documents.</p></li><li><p className="font-semibold text-[#0D47A1]">Automated Primary Source Verification</p><p className="text-[#010101]">Verify licenses, board certifications, DEA, and malpractice coverage. Maintain audit-ready documentation.</p></li><li><p className="font-semibold text-[#0D47A1]">Payer Enrollment & Insurance Credentialing</p><p className="text-[#010101]">Support enrollment with Medicare, Medicaid, and commercial payers. Reduce claim denials caused by incomplete or expired credentials.</p></li><li><p className="font-semibold text-[#0D47A1]">Re-Credentialing & Expiration Tracking</p><p className="text-[#010101]">Automated alerts for expiring licenses and certifications. Ensure continuous compliance with payer and regulatory requirements.</p></li></ul></div>
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">How It Helps Your Practice</h2><ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-[#010101]"><li>Faster provider onboarding</li><li>Reduced administrative workload</li><li>Improved payer approval timelines</li><li>Fewer claim rejections and payment delays</li><li>Continuous regulatory compliance</li><li>Improved patient trust and care quality</li></ul></div>
              </div>
            </div>
          </div>
        ) : serviceSlug === "rcm" ? (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              <ZoomableImage src={item.src} alt={item.title} height="420px" borderWidth={15} borderColor="#000" fit="contain" />
              <div className="space-y-6 lg:border-l lg:pl-8 border-[#D2DEF9]">
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">Revenue Cycle Management (RCM)</h2><p className="text-sm sm:text-base font-medium text-[#010101]">Simplify Billing. Maximize Revenue. Get Paid Faster.</p><p className="text-sm sm:text-base text-[#010101]">Our Revenue Cycle Management (RCM) solution helps healthcare organizations manage the complete financial lifecycle—from patient registration to final payment—while reducing denials, accelerating reimbursements, and improving cash flow.</p></div>
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">End-to-End RCM Capabilities</h2><ul className="list-disc pl-5 space-y-4 text-sm sm:text-base"><li><p className="font-semibold text-[#0D47A1]">Patient Registration & Eligibility Verification</p><p className="text-[#010101]">Capture accurate patient and insurance details and verify coverage before services are rendered.</p></li><li><p className="font-semibold text-[#0D47A1]">Charge Capture & Coding</p><p className="text-[#010101]">Ensure accurate CPT, ICD, and modifier coding to reduce errors and underbilling.</p></li><li><p className="font-semibold text-[#0D47A1]">Claim Submission & Tracking</p><p className="text-[#010101]">Submit clean claims electronically and track their status in real time.</p></li><li><p className="font-semibold text-[#0D47A1]">Payment Posting & Reconciliation</p><p className="text-[#010101]">Automatically post insurance and patient payments and reconcile balances.</p></li><li><p className="font-semibold text-[#0D47A1]">Denial Management & Appeals</p><p className="text-[#010101]">Identify denied claims, analyze root causes, and manage resubmissions efficiently.</p></li><li><p className="font-semibold text-[#0D47A1]">Patient Billing & Collections</p><p className="text-[#010101]">Generate clear patient statements, support online payments, and manage balances.</p></li><li><p className="font-semibold text-[#0D47A1]">Reporting & Analytics</p><p className="text-[#010101]">Gain insights into revenue performance, AR aging, denial trends, and cash flow.</p></li></ul></div>
              </div>
            </div>
          </div>
        ) : serviceSlug === "ap" ? (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <ZoomableImage src={item.src} alt={item.title} height="fit-content" borderWidth={15} borderColor="#000" />
              <div className="space-y-6 lg:border-l lg:pl-8 border-[#D2DEF9]">
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">Accounts Payable</h2><p className="text-sm sm:text-base text-[#010101]">OnlineMedSys.com Accounts Payable module helps you manage your cash flow by streamlining how purchase orders are issued and invoices are processed for payment. This unique system is designed for non-accounting practice staff to easily review and authorize vendor invoices for later payment by management or outside accountants. It allows you to scan vendor invoices directly into the online system and electronically attach them to the invoice record. This eliminates the need to distribute paper copies to internal staff or outside accountants for approval and/or payment.</p></div>
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">Invoices</h2><ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-[#010101]"><li>Automatically generate invoice records from purchase orders</li><li>Create master invoice entries for multiple purchases billed to a credit card</li><li>Allocate items on the same invoice from one vendor to different expense accounts</li><li>Scan vendor invoices and electronically attach them to online invoice records</li><li>Review and process invoices for payment</li><li>Track outstanding, partial and paid invoices</li><li>Ability for outside accountants to process payments online through the web</li></ul></div>
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">Purchase Orders and Credit Memos</h2><ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-[#010101]"><li>Generate and track purchase orders online</li><li>Manage credit memos</li></ul></div>
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">Reporting</h2><ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-[#010101]"><li>Extract data from any field by pointing and clicking on a list of module fields</li><li>Automatically generate formatted reports</li><li>Copy and paste records into Microsoft Excel worksheets</li></ul></div>
              </div>
            </div>
          </div>
        ) : serviceSlug === "mobile-apps" ? (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              <div className="flex flex-col gap-6 w-full">
                <ZoomableImage src={iosImage} alt="iOS App" height="fit-content" borderWidth={15} borderColor="#000" />
                <ZoomableImage src={androidImage} alt="Android App" height="fit-content" borderWidth={15} borderColor="#000" />
              </div>
              <div className="space-y-6 lg:border-l lg:pl-8 border-[#D2DEF9]">
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">Provider Mobile Apps (iOS & Android)</h2><p className="text-sm sm:text-base font-medium text-[#010101]">Anytime Access to Appointments and e-Prescriptions</p><p className="text-sm sm:text-base text-[#010101]">Our Provider Mobile Apps for iOS and Android give healthcare providers secure, on-the-go access to their daily schedules and e-prescription details—helping them stay connected, informed, and efficient from anywhere.</p></div>
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">Key Features</h2><ul className="list-disc pl-5 space-y-4 text-sm sm:text-base"><li><p className="font-semibold text-[#0D47A1]">Daily Appointment Schedule</p><p className="text-[#010101]">View today's and upcoming appointments with patient details and visit status.</p></li><li><p className="font-semibold text-[#0D47A1]">e-Prescription Access</p><p className="text-[#010101]">Review prescribed medications, dosage, frequency, and prescription history.</p></li><li><p className="font-semibold text-[#0D47A1]">Real-Time Updates</p><p className="text-[#010101]">Instantly receive updates on schedule changes, cancellations, or new appointments.</p></li><li><p className="font-semibold text-[#0D47A1]">Patient Details at a Glance</p><p className="text-[#010101]">Access essential patient information linked to each appointment.</p></li><li><p className="font-semibold text-[#0D47A1]">Secure Login & Data Protection</p><p className="text-[#010101]">Multi-factor authentication and encrypted data for secure access.</p></li></ul></div>
              </div>
            </div>
          </div>
        ) : serviceSlug === "scan" ? (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="flex flex-col gap-6 w-full">
                <ZoomableImage src={item.src} alt={item.title} height="360px" borderWidth={15} borderColor="#000" fit="fill" />
                <ZoomableImage src={scanImage1} alt={`${item.title} - Additional View`} height="360px" borderWidth={15} borderColor="#000" fit="fill" />
              </div>
              <div className="space-y-6 lg:border-l lg:pl-8 border-[#D2DEF9]">
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">Scan Application</h2><p className="text-sm sm:text-base text-[#010101]">Our Scan Application is an advanced document management solution designed to securely capture, store, and analyze Explanation of Benefits (EOBs), checks, and financial documents using integrated AI—ensuring accuracy, faster processing, and complete audit readiness.</p></div>
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">Key Benefits</h2><ul className="list-disc pl-5 space-y-4 text-sm sm:text-base"><li><p className="font-semibold text-[#0D47A1]">Faster Document Processing</p><p className="text-[#010101]">AI-driven scanning and data extraction significantly reduce manual effort and turnaround time.</p></li><li><p className="font-semibold text-[#0D47A1]">Improved Accuracy</p><p className="text-[#010101]">Intelligent validation and duplicate detection minimize data entry errors and reconciliation issues.</p></li><li><p className="font-semibold text-[#0D47A1]">Secure Document Preservation</p><p className="text-[#010101]">Safely store EOBs, checks, and financial documents with long-term retention and audit readiness.</p></li><li><p className="font-semibold text-[#0D47A1]">Quick Search & Retrieval</p><p className="text-[#010101]">Instantly locate documents using payer, patient, date, amount, or reference details.</p></li><li><p className="font-semibold text-[#0D47A1]">Enhanced Compliance & Audit Support</p><p className="text-[#010101]">Maintains complete audit trails with role-based access and activity tracking.</p></li><li><p className="font-semibold text-[#0D47A1]">Scalable & Future-Ready</p><p className="text-[#010101]">Easily handles high document volumes as your organization grows.</p></li></ul></div>
              </div>
            </div>
          </div>
        ) : serviceSlug === "consent" ? (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="flex flex-col gap-6 w-full">
                <ZoomableImage src={item.src} alt={item.title} height="360px" borderWidth={15} borderColor="#000" fit="fill" />
                <ZoomableImage src={consentImage1} alt={`${item.title} - Additional View`} height="360px" borderWidth={15} borderColor="#000" fit="fill" />
              </div>
              <div className="space-y-6 lg:border-l lg:pl-8 border-[#D2DEF9]">
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">Patient Consent Form Management</h2><p className="text-sm sm:text-base font-medium text-[#010101]">Digital, Secure, and Compliant Patient Consent Collection</p><p className="text-sm sm:text-base text-[#010101]">Our Patient Consent Form Management application simplifies how healthcare organizations collect, manage, and store patient consents—ensuring compliance, reducing paperwork, and improving the patient experience.</p></div>
                <div className="space-y-3"><h2 className="text-xl font-semibold text-[#0D47A1]">Key Capabilities</h2><ul className="list-disc pl-5 space-y-4 text-sm sm:text-base"><li><p className="font-semibold text-[#0D47A1]">Digital Consent Forms</p><p className="text-[#010101]">Create and manage electronic consent forms for treatments, procedures, billing, telehealth, and data sharing.</p></li><li><p className="font-semibold text-[#0D47A1]">Patient e-Signature Support</p><p className="text-[#010101]">Capture secure electronic signatures from patients or guardians on any device.</p></li><li><p className="font-semibold text-[#0D47A1]">Customizable Templates</p><p className="text-[#010101]">Configure consent templates based on specialty, procedure, provider, or regulatory needs.</p></li><li><p className="font-semibold text-[#0D47A1]">Secure Storage & Audit Trail</p><p className="text-[#010101]">Store signed consent forms securely with date, time, and user tracking.</p></li></ul></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <ZoomableImage src={item.src} alt={item.title} height="400px" />
          </div>
        )}
      </div>
    );
  };

  if (!activeItem) {
    return (
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground">Service not found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {serviceOrder.map((serviceSlug) => renderServiceContent(serviceSlug))}
      </div>

      <div className="fixed right-10 top-1/2 z-40 -translate-y-1/2 hidden lg:flex flex-col gap-80">
        <button
          type="button"
          onClick={goToPrevious}
          disabled={currentIndex <= 0}
          className="h-12 w-12 rounded-full bg-[#2589CB] text-white shadow-lg transition-all duration-300 hover:bg-[#0D47A1] hover:scale-105 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none disabled:hover:bg-slate-300 disabled:hover:scale-100"
          aria-label="Previous service"
        >
          <ChevronUp className="mx-auto" size={22} />
        </button>
        <button
          type="button"
          onClick={goToNext}
          disabled={currentIndex >= serviceOrder.length - 1}
          className="h-12 w-12 rounded-full bg-[#2589CB] text-white shadow-lg transition-all duration-300 hover:bg-[#0D47A1] hover:scale-105 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none disabled:hover:bg-slate-300 disabled:hover:scale-100 translate-y-12"
          aria-label="Next service"
        >
          <ChevronDown className="mx-auto" size={22} />
        </button>
      </div>
    </section>
  );
};

export default ServiceDetail;
