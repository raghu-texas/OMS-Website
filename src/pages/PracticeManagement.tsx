// Removed Card components to make content plain without boxes
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import featuresChart from "@/assets/features-chart.avif";
import smsImage from "@/assets/sms-dashboard.jfif";
import implantImage from "@/assets/implant-tracking.png";
import schedulerImage from "@/assets/scheduler-management.png";
import ImageWithFallback from "@/components/ImageWithFallback";

const PracticeManagement = () => {
  const navigate = useNavigate();
  const ZoomableImage = ({ src, alt }: { src: string; alt: string }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [lens, setLens] = useState({ visible: false, rect: null as DOMRect | null });

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setLens({ visible: true, rect });
    };

    const handleLeave = () => setLens({ visible: false, rect: null });

    const rect = lens.rect;
    const originX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const originY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight / 2;
    const translateX = screenCenterX - originX;
    const translateY = screenCenterY - originY + 36;

    return (
      <div className="relative w-full mx-auto">
        <div
          ref={containerRef}
          className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border w-[90%] mx-auto bg-white"
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

  return (
    <section className="pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="relative mb-4">
            <div className="flex justify-center">
              <div
                className="relative inline-block"
                style={{ width: 'min(100%, 56rem)', height: 'fit-content' }}
              >
                <div
                  className="absolute inset-0 rounded-3xl overflow-hidden"
                  style={{
                    background: '#E8F1F9',
                  }}
                />
                <div className="absolute top-3 left-8 w-24 h-24 bg-[#E3EEF7] rounded-full blur-3xl opacity-70" />
                <div className="absolute bottom-3 right-8 w-32 h-32 bg-[#E3EEF7] rounded-full blur-3xl opacity-60" />
                <div className="relative text-center py-2 px-6 w-full">
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="h-1 w-12 bg-gradient-to-r from-transparent to-[#2589CB] rounded-full" />
                    <div className="h-1 w-1 bg-[#2589CB] rounded-full" />
                    <div className="h-1 w-12 bg-gradient-to-l from-transparent to-[#2589CB] rounded-full" />
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight text-[#0D47A1]">
                    Practice <span className="text-[#2589CB]">Management</span>
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
          <p className="text-lg text-black">
            Explore key operational modules that enhance efficiency and visibility.
          </p>
        </div>

        {/* Intro content with image side-by-side */}
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

        {/* Scheduler Management section: image-left, content-right */}
        <div className="mb-8 rounded-2xl p-6 border" style={{ backgroundColor: '#FAFCFD', borderColor: '#D2DEF9' }}>
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <ZoomableImage src={schedulerImage} alt="Scheduler Management" />
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

        {/* SMS Dashboard section: content-left (vertically centered), image-right */}
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
            <ZoomableImage src={smsImage} alt="SMS Dashboard" />
          </div>
        </div>

        {/* Implant Tracking section: image-left, content-right */}
        <div className="mb-10 rounded-2xl p-6 border" style={{ backgroundColor: '#FAFCFD', borderColor: '#D2DEF9' }}>
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <ZoomableImage src={implantImage} alt="Implant Tracking" />
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

        {/* Navigation Arrow */}
        <div className="flex justify-end items-center">
          <button
            onClick={() => navigate('/services/emr')}
            className="p-3 rounded-full border transition-all border-[#2589CB] text-[#2589CB] hover:bg-[#2589CB] hover:text-white cursor-pointer"
            aria-label="Next service"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Removed duplicate cards below wrappers as requested */}
      </div>
    </section>
  );
};

export default PracticeManagement;
