import trainingImg from "@/assets/training.png";
import supportImg from "@/assets/support.png";
import soft2Img from "@/assets/soft2.png";
import printerImg from "@/assets/printer.png";
import monitorImg from "@/assets/Monitor.png";

const BulletRow = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex items-start gap-3">
    <span aria-hidden className="mt-1">{icon}</span>
    <span>{children}</span>
  </div>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" style={{ stroke: 'black', fill: 'black' }} xmlns="http://www.w3.org/2000/svg">
    <path d="M3 5c0-1.1.9-2 2-2h3c.9 0 1.7.6 1.9 1.5l.7 2.8c.2.8-.1 1.6-.7 2.1l-1.5 1.3c1.6 3.1 4.1 5.5 7.2 7.1l1.3-1.5c.5-.6 1.3-.9 2.1-.7l2.8.7c.9.2 1.5 1 1.5 1.9v3c0 1.1-.9 2-2 2h-1c-9.4 0-17-7.6-17-17V5z" strokeWidth="1.8" fill="none"/>
    <circle cx="18.5" cy="5.5" r="3.2" strokeWidth="1.6" fill="none"/>
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" style={{ stroke: 'black', fill: 'black' }} xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.8" fill="none"/>
    <path d="M4 7l8 6 8-6" strokeWidth="1.8" fill="none"/>
  </svg>
);

const UpgradeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" style={{ stroke: 'black', fill: 'black' }} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3l4 4h-3v6h-2V7H8l4-4z" />
    <rect x="5" y="15" width="14" height="4" rx="1.5" strokeWidth="1.6" fill="none"/>
  </svg>
);

const Resources = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      {/* Title Wrapper - matches About Us */}
      <div className="flex justify-center mb-8">
        <div className="relative inline-block" style={{ width: 'min(100%, 56rem)', height: 'fit-content' }}>
          <div className="absolute inset-0 rounded-3xl overflow-hidden border border-[#E3EEF7]" style={{ background: '#E8F1F9' }} />
          <div className="absolute top-3 left-8 w-24 h-24 bg-[#E3EEF7] rounded-full blur-3xl opacity-70" />
          <div className="absolute bottom-3 right-8 w-32 h-32 bg-[#E3EEF7] rounded-full blur-3xl opacity-60" />
          <div className="relative text-center py-2 px-6 w-full">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="h-1 w-12 bg-gradient-to-r from-transparent to-[#2589CB] rounded-full" />
              <div className="h-1 w-1 bg-[#2589CB] rounded-full" />
              <div className="h-1 w-12 bg-gradient-to-l from-transparent to-[#2589CB] rounded-full" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight text-[#0D47A1]">
              Resources
            </h1>
            <div className="flex items-center justify-center gap-4 mt-0">
              <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-[#617CB5]" />
              <div className="h-2 w-2 border-2 border-[#2589CB] rounded-full" />
              <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-[#617CB5]" />
            </div>
          </div>
        </div>
      </div>

      {/* Training & Implementation */}
      <section className="rounded-2xl p-6 shadow-sm mb-10 border border-gray-300" style={{ backgroundColor: '#FAFCFD' }}>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden">
            <img src={trainingImg} alt="Training" className="w-full h-[360px] object-cover" loading="lazy" decoding="async" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">Training & Implementation</h2>
            <p className="text-lg leading-relaxed text-foreground">
              In order to ensure a smooth transition to our online system, we provide a carefully planned implementation program for all new clients. We will guide you through the entire process - from evaluating minimum hardware and software requirements and arranging for Internet connectivity to populating data tables and staff training. We can conduct 2-3 online training sessions to facilitate training and provide additional sessions after go-live, as needed.
            </p>
            <p className="text-lg leading-relaxed text-foreground mt-4">
              Our goal is to minimize any disruption to your practice during conversion, and to make sure your staff is informed and involved throughout the entire implementation process.
            </p>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="rounded-2xl p-6 shadow-sm border border-gray-300" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">Support</h2>
            <p className="text-lg leading-relaxed text-foreground">
              OnlineMedSys.com’s professional support services program is driven by a commitment to provide the highest quality technical support services. We provide a versatile mix of online and direct personal services to ensure you receive the help you need, when you need it. Our staff includes experienced administrators, trainers, and software support specialists who are knowledgeable, responsive and caring.
            </p>
            <p className="text-lg leading-relaxed text-foreground mt-4">
              All OnlineMedSys.com customers receive a standard support service package as part of their monthly software-hosting fee. Our plan ensures that fast, accurate problem resolution is only a phone call or email away.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Standard Technical Support Plan</h3>
            <div className="space-y-3 text-foreground">
              <BulletRow icon={<PhoneIcon />}>Help Desk telephone support during regular business hours. Monday through Friday 7:30 AM - 6:00 PM CT, excluding holidays</BulletRow>
              <BulletRow icon={<MailIcon />}>Ability to submit questions to the Help Desk at all times via email</BulletRow>
              <BulletRow icon={<UpgradeIcon />}>Automatic application upgrades and enhancements</BulletRow>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden lg:order-2">
            <img src={supportImg} alt="Support" className="w-full h-[360px] object-cover" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      {/* Hardware & Software Specifications for practice */}
      <section className="rounded-2xl p-6 shadow-sm border border-gray-300 mt-10" style={{ backgroundColor: '#FAFCFD' }}>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="rounded-2xl overflow-hidden">
            <img src={soft2Img} alt="Hardware & Software" className="w-full h-[360px] object-cover" loading="lazy" decoding="async" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">Hardware & Software Specifications</h2>
            <div className="text-lg leading-relaxed text-foreground space-y-4">
              <div>
                <strong>Computers</strong><br />
                Windows 11 Pro 64 bit <br />
                Intel processor i3 or greater<br />
                8 GB RAM or greater<br />
                128 GB SSD hard drive or greater<br />
                Integrated graphics <br />
                1 GB Ethernet network adapter<br />
                Business class computers for enhanced reliability
              </div>
            </div>
          </div>
        </div>

        {/* Row 1: content left, Monitor image right */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="text-lg leading-relaxed text-foreground">
            <div>
              <strong>Tablets</strong><br />
              Microsoft Surface Pro 8+<br />
              Specs: i5, 8 GB, 128 GB or better, 13" screens<br />
              Laptop replacement<br />
              Surface Go 3+<br />
              Specs: i3, 4 GB, 64 GB or better, 10.5" screens<br />
              Signing consents and basic PM/EMR work
            </div>
            <div className="mt-4">
              <strong>Software</strong><br />
              Google Chrome or Edge browsers are regularly tested for full functionality and preferred<br />
              Microsoft Word for correspondence, labels and letters<br />
              Microsoft Excel to export data from reports<br />
              Adobe Acrobat or Adobe Reader for claims and statement printing
            </div>
            <div className="mt-4">
              <strong>Internet Access</strong><br />
              A business class connection of 300 Mbps minimum is recommended for offices up to 10 computers. A second, backup internet connection configured by an IT tech for firewall failover is strongly recommended.
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden mt-24 lg:order-2">
            <img src={monitorImg} alt="Monitor" className="w-full h-[360px] object-cover" loading="lazy" decoding="async" />
          </div>
        </div>

        {/* Row 2: internet image left, Printers & Scanners/Misc on right */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="rounded-2xl overflow-hidden mt-24">
            <img src={printerImg} alt="Printer" className="w-full h-[360px] object-cover" loading="lazy" decoding="async" />
          </div>
          <div className="text-lg leading-relaxed text-foreground lg:pl-6">
            <div>
              <strong>Printers & Scanners</strong><br />
              Any printer compatible with Windows operating systems<br />
              <u>Recommended:</u><br />
              Business class printers like Brother, HP, Dell, etc.<br />
              Dymo LabelWriter printers for labels<br />
              Business class networked copier/printer/scanners like HP, Brother, Canon, Konica, Savin, etc.<br />
              Any twain compliant scanner<br />
              <u>Recommended:</u><br />
              Document & card scanners: Ambir Image Scan Pro 820ix <a href="https://ambir.com" target="_blank" rel="noopener noreferrer">https://ambir.com</a>
            </div>
            <div className="mt-4">
              <strong>Miscellaneous</strong><br />
              Any web cam for patient photos<br />
              Vital signs monitors: Criticare 8100 nGenuity series, Mortara S12 or S19, Zoe Nightingale PPM3, Mindray ePM 10/12<br />
              Implant tracking: Terra Bar Code D5100 Scanner <a href="https://www.amazon.com/dp/B07M68LS2N" target="_blank" rel="noopener noreferrer">https://www.amazon.com/dp/B07M68LS2N</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;