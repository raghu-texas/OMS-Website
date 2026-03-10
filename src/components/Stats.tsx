const Stats = () => {
  const stats = [
    {
      number: "25+",
      label: "Years Experience",
      description: "Oral surgery management"
    },
    {
      number: "100+",
      label: "Practices",
      description: "Trusted by over 100 practices"
    },
    {
      number: "10M+",
      label: "Patient Records",
      description: "Securely managed"
    },
    {
      number: "99.99%",
      label: "Availability",
      description: "Excellent uptime"
    }
  ];

  return (
    <section className="relative z-20 -mt-16 px-[3%]">
      <div className="py-4 bg-gradient-to-br from-primary via-secondary to-primary relative overflow-hidden rounded-2xl shadow-lg">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            // Move only 100+ Practices and 10M+ Patient Records 0.5 inch to the right
            const style: React.CSSProperties = { animationDelay: `${index * 0.1}s` };
            if (stat.number === "100+" || stat.number === "10M+") {
              style.marginLeft = '0.5in';
            } else {
              style.marginLeft = 0;
            }
            return (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={style}
              >
                <div className="mb-2">
                  <span className="text-4xl lg:text-5xl font-bold text-white">
                    {stat.number}
                  </span>
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-white/90 mb-1 whitespace-nowrap">
                  {stat.label}
                </h3>
                <p className="text-sm lg:text-base text-white/80 mt-0 whitespace-nowrap">
                  {stat.description}
                </p>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
