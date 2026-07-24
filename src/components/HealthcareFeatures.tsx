import { useRef, useState } from "react";
import practiceMgmtImage from "@/assets/feature-practice-mgmt1.png";
import patientPortalImage from "@/assets/feature-patient-portal.png";
import revenueCycleImage from "@/assets/feature-revenue-cycle.png";
import emrImage from "@/assets/feature-emr.png";
import referralImage from "@/assets/feature-referral.png";
import hrImage from "@/assets/feature-hr.png";
import accountsPayableImage from "@/assets/feature-accounts-payable.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, Plus, Minus } from "lucide-react";
import ImageWithFallback from "@/components/ImageWithFallback";
const HealthcareFeatures = () => {
  const ZoomableImage = ({ src, alt, borderWidth = 1, borderColor = '#D2DEF9', imageFit = 'fill', zoomControls = false }: { src: string; alt: string; borderWidth?: number; borderColor?: string; imageFit?: 'cover' | 'contain' | 'fill'; zoomControls?: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [panX, setPanX] = useState(0);
    const [panY, setPanY] = useState(0);
    const [isPanning, setIsPanning] = useState(false);
    const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
    const isPanningRef = useRef(false);
    const panRef = useRef({ x: 0, y: 0 });
    const imageRef = useRef<HTMLImageElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [touchStartDistance, setTouchStartDistance] = useState<number | null>(null);
    const [touchMidpoint, setTouchMidpoint] = useState<{ x: number; y: number } | null>(null);

    const imageClass = `w-full h-full ${imageFit === 'contain' ? 'object-contain' : imageFit === 'fill' ? 'object-fill' : 'object-cover'} rounded-2xl`;

    const updateTransform = (zoom: number, x: number, y: number) => {
      if (imageRef.current) {
        imageRef.current.style.transform = `translate(${x}px, ${y}px) scale(${zoom})`;
        imageRef.current.style.transition = isPanningRef.current ? 'none' : 'transform 0.2s ease';
      }
    };

    const setZoom = (nextZoom: number) => {
      const clamped = Math.min(Math.max(nextZoom, 1), 3);
      setZoomLevel(clamped);
      if (clamped === 1) {
        panRef.current = { x: 0, y: 0 };
        setPanX(0);
        setPanY(0);
      }
      updateTransform(clamped, panRef.current.x, panRef.current.y);
    };

    const zoomIn = () => setZoom(zoomLevel + 0.25);
    const zoomOut = () => setZoom(zoomLevel - 0.25);
    const resetZoom = () => setZoom(1);

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
      if (!zoomControls || zoomLevel <= 1) return;
      setIsPanning(true);
      isPanningRef.current = true;
      pointerStartRef.current = { x: event.clientX, y: event.clientY };
      event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isPanningRef.current || !pointerStartRef.current) return;
      event.preventDefault();
      const deltaX = event.clientX - pointerStartRef.current.x;
      const deltaY = event.clientY - pointerStartRef.current.y;
      pointerStartRef.current = { x: event.clientX, y: event.clientY };
      panRef.current = { x: panRef.current.x + deltaX, y: panRef.current.y + deltaY };
      setPanX(panRef.current.x);
      setPanY(panRef.current.y);
      updateTransform(zoomLevel, panRef.current.x, panRef.current.y);
    };

    const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isPanningRef.current) return;
      setIsPanning(false);
      isPanningRef.current = false;
      pointerStartRef.current = null;
      setPanX(panRef.current.x);
      setPanY(panRef.current.y);
      event.currentTarget.releasePointerCapture(event.pointerId);
    };

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
      if (!zoomControls) return;      if (!imageRef.current?.contains(event.target as Node)) return;      event.preventDefault();
      const delta = event.deltaY > 0 ? -0.15 : 0.15;
      setZoom(zoomLevel + delta);
    };

    const getTouchDistance = (touches: React.TouchList) => {
      if (touches.length < 2) return null;
      const firstTouch = touches.item(0);
      const secondTouch = touches.item(1);
      if (!firstTouch || !secondTouch) return null;
      const dx = firstTouch.clientX - secondTouch.clientX;
      const dy = firstTouch.clientY - secondTouch.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const getTouchMidpoint = (touches: React.TouchList) => {
      if (touches.length < 2) return null;
      const firstTouch = touches.item(0);
      const secondTouch = touches.item(1);
      if (!firstTouch || !secondTouch) return null;
      return {
        x: (firstTouch.clientX + secondTouch.clientX) / 2,
        y: (firstTouch.clientY + secondTouch.clientY) / 2,
      };
    };

    const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
      if (!zoomControls || event.touches.length < 2) return;
      if (!imageRef.current?.contains(event.target as Node)) return;
      const distance = getTouchDistance(event.touches);
      const midpoint = getTouchMidpoint(event.touches);
      setTouchStartDistance(distance);
      setTouchMidpoint(midpoint);
    };

    const handleTouchMove = (event: React.TouchEvent<HTMLImageElement>) => {
      if (!zoomControls || event.touches.length < 2 || touchStartDistance === null || !touchMidpoint) return;
      if (!imageRef.current?.contains(event.target as Node)) return;
      event.preventDefault();
      const distance = getTouchDistance(event.touches);
      if (!distance) return;
      const scale = distance / touchStartDistance;
      const nextZoom = zoomLevel * scale;
      setZoom(nextZoom);
      setTouchStartDistance(distance);
    };

    const handleTouchEnd = () => {
      setTouchStartDistance(null);
      setTouchMidpoint(null);
    };

    return (
      <>
        <div className="relative w-full mx-auto">
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setZoomLevel(1);
            }}
            className="w-full text-left cursor-zoom-in"
            aria-label={`Open ${alt}`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow w-[90%] h-[360px] mx-auto box-border">
              <div className="w-full h-full overflow-hidden rounded-2xl">
                <ImageWithFallback
                  src={src}
                  alt={alt}
                  className={imageClass}
                  style={{
                    borderColor,
                    borderWidth: `${borderWidth}px`,
                    borderStyle: 'solid',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
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
            {zoomControls && (
              <div className="absolute left-1/2 top-3 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-slate-200 bg-white/95 px-1.5 py-1 shadow-md backdrop-blur-sm">
                <button
                  type="button"
                  onClick={zoomOut}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-700"
                  aria-label="Zoom out"
                >
                  <Minus size={14} />
                </button>
                <button
                  type="button"
                  onClick={resetZoom}
                  className="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-full border border-slate-300 bg-white px-1.5 text-[11px] font-medium text-slate-900 hover:bg-slate-100"
                  aria-label="Reset zoom"
                >
                  {zoomLevel.toFixed(2)}x
                </button>
                <button
                  type="button"
                  onClick={zoomIn}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-700"
                  aria-label="Zoom in"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
            <div className="flex items-center justify-center h-[92vh] w-[80vw] overflow-hidden rounded-xl bg-white">
              <div className="relative h-full w-full rounded-3xl overflow-hidden border border-slate-300/60 shadow-inner bg-slate-50">
                <ImageWithFallback
                  ref={imageRef}
                  draggable={false}
                  src={src}
                  alt={alt}
                  className="h-full w-full max-h-[92vh] max-w-[95vw] object-fill"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  onWheel={handleWheel}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  style={{
                    transform: `translate(${panX}px, ${panY}px) scale(${zoomLevel})`,
                    transformOrigin: 'center center',
                    transition: isPanning ? 'none' : 'transform 0.2s ease',
                    cursor: zoomControls && zoomLevel > 1 ? (isPanning ? 'grabbing' : 'grab') : 'auto',
                    touchAction: 'none',
                    userSelect: 'none',
                  }}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const features = [{
    image: practiceMgmtImage,
    title: "Practice Management Solutions",
    description: "Comprehensive practice management software that streamlines scheduling, billing, and workflow optimization. Our integrated platform helps you manage every aspect of your healthcare practice efficiently, from appointment booking to revenue cycle management. Reduce administrative burden and focus more on patient care with our intelligent automation features."
  }, {
    image: revenueCycleImage,
    title: "Revenue Cycle Management",
    description: "Maximize your practice's financial performance with our intelligent billing and revenue cycle management solution. Automated claim submission, denial management, and real-time eligibility verification streamline your billing processes. Our analytics dashboard provides insights into financial performance, helping you identify opportunities for revenue optimization."
  }, {
    image: emrImage,
    title: "Electronic Medical Records",
    description: "Advanced EMR system designed for seamless clinical documentation and data management. Our intuitive interface reduces charting time while ensuring accurate, comprehensive patient records. Built-in clinical decision support, customizable templates, and interoperability standards help you deliver evidence-based care efficiently and effectively."
  }, {
    image: patientPortalImage,
    title: "Patient Portal & Engagement",
    description: "Empower your patients with 24/7 access to their health records and appointment scheduling. Our secure patient portal enhances communication between providers and patients, improving satisfaction and outcomes. Features include online bill pay, prescription refills, secure messaging, and telehealth integration for modern healthcare delivery."
  }, {
    image: referralImage,
    title: "Referral Portal",
    description: "Streamline patient referrals with our secure and efficient referral portal, ensuring seamless communication between providers."
  }, {
    image: accountsPayableImage,
    title: "Accounts Payable",
    description: "Scan and upload new invoices to track and manage payables.  Easily review and authorize vendor invoices for later payment by management or outside accountants.  Review paid invoice data or generate custom reports."
  }, {
    image: hrImage,
    title: "Human Resources",
    description: "Maintain individual employee profiles with hiring, payroll and benefits details.  Manage and approve your staff's time punches, time off records for payroll processing with ADP. Track PTO, vacation, sick leave, jury and travel hours.  Additionally, the system supports automated generation of weekly, overtime, pay-period, and monthly timesheets."
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
    "Practice Management Solutions": "/services/practice",
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
            const isThickBorder = ["Accounts Payable", "Practice Management Solutions", "Human Resources", "Revenue Cycle Management", "Electronic Medical Records", "Referral Portal", "Patient Portal & Engagement"].includes(feature.title);
          return <div
              key={index}
              className={`grid lg:grid-cols-2 gap-8 items-center p-8 rounded-2xl ${isLightBg ? 'text-black' : ''} ${hasBorder ? 'border' : ''}`}
              style={{ ...(hasBorder ? { borderColor: '#D2DEF9' } : {}), ...(bgColor ? { backgroundColor: bgColor } : {}) }}
            >
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <ZoomableImage
                    src={feature.image}
                    alt={feature.title}
                    borderWidth={isThickBorder ? 15 : 1}
                    borderColor={isThickBorder ? '#000' : '#D2DEF9'}
                    imageFit="fill"
                    zoomControls={feature.title === 'Practice Management Solutions'}
                  />
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