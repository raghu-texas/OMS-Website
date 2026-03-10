import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Info, Package, Mail } from "lucide-react";
import omsLogo from "@/assets/oms-logo1.png";

const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
      isRoute: true
    },
    {
      name: "Apps & Services",
      href: "/products-services",
      icon: Package,
      isRoute: true
    },
  {
    name: "Resources",
    href: "/resources",
    icon: ({ size = 18 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09A1.65 1.65 0 0 0 9 3.09V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    isRoute: true
  },
    {
      name: "About Us",
      href: "/about-us",
      icon: Info,
      isRoute: true
    },
    {
      name: "Contact Us",
      href: "#contact",
      icon: Mail,
      isRoute: false
    }
  ];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isRoute) {
      if (location.pathname === item.href) {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        navigate(item.href);
      }
    } else {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(item.href);
          element?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const element = document.querySelector(item.href);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80 mt-1.5 -ml-1 sm:-ml-3 lg:-ml-4">
            <img src={omsLogo} alt="OnlineMedSys.com" className="h-12 sm:h-14 w-auto object-contain" loading="eager" decoding="async" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors font-medium"
                >
                  <Icon size={18} />
                  {item.name}
                </button>
              );
            })}
            <div className="flex items-center gap-3 ml-4">
              <Button variant="outline" size="lg" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button asChild variant="default" size="lg">
                <a href="/book-demo">Book Free Demo</a>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-6 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors font-medium py-2"
                  >
                    <Icon size={18} />
                    {item.name}
                  </button>
                );
              })}
              <div className="flex flex-col gap-3 mt-2">
                <Button variant="outline" size="lg" onClick={() => { navigate('/login'); setIsMenuOpen(false); }}>
                  Login
                </Button>
                <Button asChild variant="default" size="lg">
                  <a href="/book-demo">Book Free Demo</a>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
