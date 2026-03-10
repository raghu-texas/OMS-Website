import cloudImage from "@/assets/cloud2.png";
import { Card, CardContent } from "@/components/ui/card";

const CloudSection = () => (
  <section className="py-4 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <img
                src={cloudImage}
                alt="In the Cloud"
                className="w-full max-w-md scale-[1.2] rounded-2xl shadow-xl object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground mb-2">In the Cloud</h2>
              <p className="text-muted-foreground">
                OnlineMedSys.com practice solutions are 100% cloud-based so they are accessible from anywhere at anytime and are easy to use. Whether you are in your office or on the road you can log into the system to check your schedule, review patient notes, evaluate a financial report, and review any other information in the system.
              </p>
              <h3 className="text-xl font-semibold text-foreground mt-6">Lower Technology Cost</h3>
              <p className="text-muted-foreground">
                All OnlineMedSys.com software and your practice data are stored in highly secure, state-of-the art data centers. Hosted on redundant computers, backed-up nightly and monitored 24 hours a day. You simply log in through your web browser to access your software and data. This lowers your IT costs and eliminates the burden of installing new software releases and performing regular system back-ups.
              </p>
              <h3 className="text-xl font-semibold text-foreground mt-6">Support for Practices with Multiple Offices</h3>
              <p className="text-muted-foreground">
                Do you need to schedule multiple doctors in multiple offices from a central location? You can with the Practice Manager Scheduler. Different offices can share online information easily and cost effectively, assuming proper authorizations, because practice data is centrally stored and accessed via the internet.
              </p>
              <h3 className="text-xl font-semibold text-foreground mt-6">A Subscription Service</h3>
              <p className="text-muted-foreground">
                A full suite of services or an individual module – you decide! Competitively priced, it is cost-effective for a single office or multiple locations. OnlineMedSys.com software is licensed on a monthly subscription basis so you can get started quickly without any up front software purchase. In fact, all you need to get started is a Windows-based computer, an Internet connection and Microsoft Edge or Google Chrome browsers.
              </p>
              <h3 className="text-xl font-semibold text-foreground mt-6">Secure and Confidential Data</h3>
              <p className="text-muted-foreground">
                Only authorized users can access applications and data based on either a log in name and password, and multi-factor authentication. You can assign different access rights on a per-user basis to restrict access to sensitive information, and every transaction is tracked according to who the user is, when it was done and from which location. Data encryption, firewalls and other network security measures are also used to ensure the protection of your mission critical data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
);

export default CloudSection;
