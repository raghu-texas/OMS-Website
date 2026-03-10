import { Mail, Phone, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import omsLogo from "@/assets/oms-logo1.png";
import footerBg3 from "@/assets/footer-bg3.jfif";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const services = [
    { label: "Oral Surgery Practice Management Solution", path: "/practice-management" },
    { label: "Electronic Medical Records", path: "/services/emr" },
    { label: "Accounts Payable", path: "/services/ap" },
    { label: "Revenue Cycle Management", path: "/services/rcm" },
    { label: "Referral Portal", path: "/services/referral-portal" },
    { label: "Patient Portal", path: "/services/patient-portal" },
    { label: "Human Resources", path: "/services/hr" },
  ];

  const handleServiceClick = (path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      navigate(path);
    }
  };

  return (
    <footer
      id="contact"
      className="border-t border-border text-black"
      style={{
        backgroundImage: `url(${footerBg3})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto p-3">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-0">
          {/* About Us */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={omsLogo} alt="OnlineMedSys.com" className="h-12 sm:h-14 w-auto object-contain" loading="eager" decoding="async" />
            </div>
            <p className="text-black leading-relaxed mb-4">
              OnlineMedSys.com is your trusted partner in healthcare, connecting patients and providers with world-class
              advanced treatment. We're committed to making quality software accessible to everyone.
            </p>
          </div>

          {/* Our Services */}
          <div className="justify-self-center">
            <h3 className="text-lg font-semibold mb-4 text-black">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.path}
                    className="text-black hover:text-black transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleServiceClick(service.path);
                    }}
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-black">
                <Mail className="text-black mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="font-medium text-black">Email</p>
                  <a href="mailto:support@onlinemedsys.com" className="hover:text-black transition-colors">
                    support@onlinemedsys.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 text-black">
                <Phone className="text-black mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="font-medium text-black">Phone</p>
                  <a href="tel:+17138408640" className="hover:text-black transition-colors">
                    713-840-8640
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 text-black">
                <Home className="text-black mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="font-medium text-black">Address</p>
                  <p>OnlineMedSys.com</p>
                  <p>5599 San Felipe, Suite 900</p>
                  <p>Houston, TX 77056</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-0" style={{ borderColor: "#CFC9CA" }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-black">© 2026 ONLINEMEDSYS.COM. All rights reserved</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-black hover:text-black transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-black hover:text-black transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-black hover:text-black transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
