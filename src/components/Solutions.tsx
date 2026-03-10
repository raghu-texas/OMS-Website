import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import workflowAutomation from "@/assets/workflow-automation.jpg";
import cloudSecurity from "@/assets/cloud-security.jpg";
import { Button } from "@/components/ui/button";
import ImageWithFallback from "@/components/ImageWithFallback";

const solutions = [
  {
    image: workflowAutomation,
    title: "Intelligent Workflow Automation",
    description:
      "Streamline repetitive tasks and reduce administrative burden with AI-powered automation that learns from your practice patterns and optimizes operations.",
    features: [
      "Automated appointment scheduling",
      "Smart prescription management",
      "Automated billing and claims processing",
      "Intelligent task prioritization",
    ],
  },
  {
    image: cloudSecurity,
    title: "Cloud Security & Compliance",
    description:
      "Protect sensitive patient data with enterprise-grade cloud security, compliance auditing, and robust access controls that meet healthcare regulations.",
    features: [
      "HIPAA-compliant infrastructure",
      "Role-based access control",
      "Audit trails and monitoring",
      "Encrypted data at rest and in transit",
    ],
  },
];

const Solutions = () => {
  return (
    <section className="pt-4 pb-4 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {solutions.map((solution, index) => {
            const isLight =
              solution.title === "Cloud Security & Compliance" ||
              solution.title === "Intelligent Workflow Automation";
            const hasBorder =
              solution.title === "Cloud Security & Compliance" ||
              solution.title === "Intelligent Workflow Automation";
            return (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-8 items-center p-8 rounded-2xl ${hasBorder ? "border" : ""}`}
                style={{
                  backgroundColor:
                    solution.title === "Intelligent Workflow Automation"
                      ? "#FFFFFF"
                      : solution.title === "Cloud Security & Compliance"
                      ? "#FAFCFD"
                      : "transparent",
                  borderColor: hasBorder ? "#D2DEF9" : undefined,
                }}
              >
                <div
                  className={`${
                    solution.title === "Intelligent Workflow Automation" ? "lg:order-2" : ""
                  } group animate-fade-in overflow-hidden rounded-2xl shadow-2xl w-[90%] mx-auto`}
                >
                  <ImageWithFallback
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-[360px] object-cover transform-gpu transition-transform duration-300 ease-out group-hover:scale-110"
                  />
                </div>
                <div
                  className={`animate-fade-in ${solution.title === "Intelligent Workflow Automation" ? "lg:order-1" : ""}`}
                >
                  <h3 className={`text-3xl font-bold mb-4 ${isLight ? "text-black" : "text-foreground"}`}>
                    {solution.title}
                  </h3>
                  <p className={`text-lg mb-6 ${isLight ? "text-black/90" : "text-muted-foreground"}`}>
                    {solution.description}
                  </p>
                  <ul className="space-y-2">
                    {solution.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className={`flex items-center gap-3 ${isLight ? "text-black/90" : "text-muted-foreground"}`}
                      >
                        <Check className={"text-primary flex-shrink-0"} size={18} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
