import { useState } from "react";
import { CheckCircle2, Calendar as CalendarIcon, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


function track(event: string, data?: Record<string, unknown>) {
  // Analytics: dataLayer if present, fallback to console
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dl = (window as any).dataLayer;
  if (dl && typeof dl.push === "function") {
    dl.push({ event, ...data });
  } else {
    // Avoid noisy logs; concise info only
    console.info("analytics", event, data || {});
  }
}


const BookDemo = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    practice: "",
    surgeons: "",
    offices: "",
    description: "",
    appointmentDate: "",
    appointmentTime: "",
    timeOfDay: "morning",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});


  function validate() {
    const nextErrors: Record<string, string> = {};
    if (!form.firstName.trim()) nextErrors.firstName = "First Name";
    if (!form.lastName.trim()) nextErrors.lastName = "Last Name";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Email";
    if (!form.mobile.trim()) nextErrors.mobile = "Mobile Number";
    if (!form.practice.trim()) nextErrors.practice = "Practice Name";
    if (!form.surgeons || !form.surgeons.toString().trim()) nextErrors.surgeons = "Number of surgeons";
    if (!form.offices || !form.offices.toString().trim()) nextErrors.offices = "Number of offices";
    if (!form.appointmentDate.trim()) nextErrors.appointmentDate = "Select Date";
    if (!form.timeOfDay.trim()) nextErrors.timeOfDay = "Preferred Session";
    if (!form.appointmentTime.trim()) nextErrors.appointmentTime = "Preferred Time";
    setErrors(nextErrors);
    return nextErrors;
  }

  async function onSubmit(e: React.FormEvent) {
  e.preventDefault();

  const validation = validate();
  const missing = Object.values(validation).filter(Boolean);

  if (missing.length > 0) {
    toast({
      variant: "destructive",
      title: "Missing required fields",
      description: "Please fill out: " + missing.join(", "),
    });
    return;
  }

  track("book_demo_submit", { form });

  try {
  // ✅ form-urlencoded (IMPORTANT)
    const params = new URLSearchParams({
  MailType: "Demo",
  ApptDate: new Date(form.appointmentDate).toLocaleDateString("en-US"),
  ApptSession: form.timeOfDay === "afternoon" ? "Afternoon" : "Morning",
  ApptTime: form.appointmentTime,
  FirstName: form.firstName.trim(),
  LastName: form.lastName.trim(),
  Email: form.email.trim(),
  CellPhone: form.mobile, // ✅ FIXED
  PracticeName: form.practice.trim(),
  TotalSurgeons: String(form.surgeons),
  TotalOffices: String(form.offices),
  Message: form.description || "Request the demo for OMS apps",
});

    const response = await fetch(
      "https://pm4-ppd-rest-cd.onlinemedsys.com/api/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    );

    const data = await response.json();

    if (response.ok && data.MailStatus === "Success") {
      toast({
        title: "Thanks! We will contact you soon.",
        description:
          "Your demo request has been submitted successfully.",
      });

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        practice: "",
        surgeons: "",
        offices: "",
        description: "",
        appointmentDate: "",
        appointmentTime: "",
        timeOfDay: "morning",
      });

      setErrors({});
    } else {
      throw new Error("API failed");
    }
  } catch (error) {
    console.error(error);
    toast({
      variant: "destructive",
      title: "Failed to submit demo request",
      description: "Please try again later.",
    });
  }
}

  return (
    <section
      className="relative pt-24 pb-16 bg-[#E6F3FD]"
      aria-label="Book Demo background"
    >
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-6">
          <div className="flex justify-center">
            <div
              className="relative inline-block"
              style={{ width: 'min(100%, 56rem)', height: 'fit-content' }}
            >
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                style={{
                  background: "#E8E8E8",
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
                  Request <span className="text-[#2589CB]">Demo</span>
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
      {/* Time zone selector removed per request */}

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Side - Demo Content */}
          <section aria-label="What to expect in demo" className="rounded-2xl bg-[#E6F3FD] border border-[#D2DEF9] shadow-sm p-5 z-20">
            <h2 className="text-xl font-bold mb-3 text-[#0D47A1]">What You'll See in the Demo</h2>
            <p className="text-base mb-3" style={{color: '#010101'}}>
              Our product specialist will walk you through:
            </p>
            <div className="space-y-2.5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" style={{color: '#010101'}} />
                <p className="text-base" style={{color: '#010101'}}>
                  Personalized overview of features built for oral surgery practices
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" style={{color: '#010101'}} />
                <p className="text-base" style={{color: '#010101'}}>
                  Live demo of clinical, EMR, billing, and administrative workflows
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" style={{color: '#010101'}} />
                <p className="text-base" style={{color: '#010101'}}>
                  How scheduling, charting, and payments work together seamlessly
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" style={{color: '#010101'}} />
                <p className="text-base" style={{color: '#010101'}}>
                  Oral surgery–specific use cases and real-world scenarios
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" style={{color: '#010101'}} />
                <p className="text-base" style={{color: '#010101'}}>
                  Answers to your questions, plus pricing, onboarding, and support details
                </p>
              </div>
            </div>
          </section>

          {/* Right Side - Contact Form */}
          <section aria-label="Contact form" className="rounded-2xl bg-white border border-[#D2DEF9] shadow-sm p-5 z-20">
            <form onSubmit={onSubmit} noValidate>
              <h2 className="text-xl font-bold mb-3 text-[#0D47A1]">Contact Details</h2>
              
              {/* Appointment Scheduling Section - Calendar, Time, and Time of Day */}
              <div className="mb-4 px-4 py-3 bg-[#E6F3FD] rounded-xl border border-[#2589CB]/20 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Calendar Dropdown */}
                  <div className="relative">
                    <label htmlFor="appointmentDate" className="block text-sm font-semibold mb-2 text-[#0D47A1]">
                      <CalendarIcon className="inline-block w-4 h-4 mr-1.5 mb-0.5" />
                      Select Date <span className="text-red-600">*</span>
                    </label>
                    <div className="relative w-[150px]">
                      <input
                        type="date"
                        id="appointmentDate"
                        name="appointmentDate"
                        className={`w-full h-[35px] rounded-lg border-2 ${errors.appointmentDate ? 'border-red-500' : 'border-[#2589CB]/30'} px-3 bg-white focus:border-[#2589CB] focus:ring-2 focus:ring-[#2589CB]/20 transition-all duration-200 appearance-none cursor-pointer hover:border-[#2589CB]/50 text-sm`}
                        placeholder="MM/DD/YYYY"
                        value={form.appointmentDate}
                        onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        lang="en-US"
                      />
                    </div>
                    {errors.appointmentDate && <p className="mt-1 text-xs text-red-600">{errors.appointmentDate}</p>}
                  </div>

                  {/* Time of Day Radio Buttons */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[#0D47A1] text-center">
                      Preferred Session <span className="text-red-600">*</span>
                    </label>
                    <div className="flex justify-center gap-2">
                      <label className="relative cursor-pointer group">
                        <input
                          type="radio"
                          name="timeOfDay"
                          value="morning"
                          checked={form.timeOfDay === "morning"}
                          onChange={(e) => setForm({ ...form, timeOfDay: e.target.value, appointmentTime: "" })}
                          className="peer sr-only"
                        />
                        <div className="flex items-center justify-center w-[90px] h-[35px] rounded-lg border-2 border-[#2589CB]/30 bg-white peer-checked:bg-[#2589CB] peer-checked:border-[#2589CB] peer-checked:text-white text-[#0D47A1] transition-all duration-200 hover:border-[#2589CB]/50 hover:shadow-sm font-medium whitespace-nowrap">
                          <span className="text-xs">☀️ Morning</span>
                        </div>
                      </label>
                      
                      <label className="relative cursor-pointer group">
                        <input
                          type="radio"
                          name="timeOfDay"
                          value="afternoon"
                          checked={form.timeOfDay === "afternoon"}
                          onChange={(e) => setForm({ ...form, timeOfDay: e.target.value, appointmentTime: "" })}
                          className="peer sr-only"
                        />
                        <div className="flex items-center justify-center w-[90px] h-[35px] rounded-lg border-2 border-[#2589CB]/30 bg-white peer-checked:bg-[#2589CB] peer-checked:border-[#2589CB] peer-checked:text-white text-[#0D47A1] transition-all duration-200 hover:border-[#2589CB]/50 hover:shadow-sm font-medium whitespace-nowrap">
                          <span className="text-xs">🌙 Afternoon</span>
                        </div>
                      </label>
                    </div>
                    {errors.timeOfDay && <p className="mt-1 text-xs text-red-600 text-center">{errors.timeOfDay}</p>}
                  </div>

                  {/* Time Dropdown */}
                  <div className="relative">
                    <label htmlFor="appointmentTime" className="block text-sm font-semibold mb-2 text-[#0D47A1]">
                      <Clock className="inline-block w-4 h-4 mr-1.5 mb-0.5" />
                      Preferred Time <span className="text-red-600">*</span>
                    </label>
                    <div className="relative w-[150px]">
                      <select
                        id="appointmentTime"
                        name="appointmentTime"
                        className={`w-full h-[35px] rounded-lg border-2 ${errors.appointmentTime ? 'border-red-500' : 'border-[#2589CB]/30'} px-3 bg-white focus:border-[#2589CB] focus:ring-2 focus:ring-[#2589CB]/20 transition-all duration-200 appearance-none cursor-pointer hover:border-[#2589CB]/50 text-sm`}
                        value={form.appointmentTime}
                        onChange={(e) => setForm({ ...form, appointmentTime: e.target.value })}
                      >
                        <option value="">Choose a time</option>
                        {form.timeOfDay === "morning" ? (
                          <>
                            <option value="09:00">09:00 AM</option>
                            <option value="09:30">09:30 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="10:30">10:30 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="11:30">11:30 AM</option>
                          </>
                        ) : (
                          <>
                            <option value="12:00">12:00 PM</option>
                            <option value="12:30">12:30 PM</option>
                            <option value="13:00">01:00 PM</option>
                            <option value="13:30">01:30 PM</option>
                            <option value="14:00">02:00 PM</option>
                            <option value="14:30">02:30 PM</option>
                            <option value="15:00">03:00 PM</option>
                            <option value="15:30">03:30 PM</option>
                            <option value="16:00">04:00 PM</option>
                            <option value="16:30">04:30 PM</option>
                            <option value="17:00">05:00 PM</option>
                          </>
                        )}
                      </select>
                      <Clock className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2589CB] pointer-events-none" />
                    </div>
                    <p className="mt-2 text-sm font-medium text-[#0D47A1] text-center">Duration : 30 mins</p>
                    {errors.appointmentTime && <p className="mt-1 text-xs text-red-600 text-center">{errors.appointmentTime}</p>}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {/* First Name and Last Name - Same Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1" style={{color: '#010101'}}>
                      First Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      className="w-full rounded-md border border-black px-3 py-2"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? "firstName-error" : undefined}
                      required
                    />
                    <p id="firstName-error" className="mt-1 text-xs text-red-600">{errors.firstName}</p>
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1" style={{color: '#010101'}}>
                      Last Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      className="w-full rounded-md border border-black px-3 py-2"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? "lastName-error" : undefined}
                      required
                    />
                    <p id="lastName-error" className="mt-1 text-xs text-red-600">{errors.lastName}</p>
                  </div>
                </div>

                {/* Email Address and Mobile Number - Same Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1" style={{color: '#010101'}}>
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="w-full rounded-md border border-black px-3 py-2"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      required
                    />
                    <p id="email-error" className="mt-1 text-xs text-red-600">{errors.email}</p>
                  </div>

                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium mb-1" style={{color: '#010101'}}>
                      Mobile Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="mobile"
                      name="mobile"
                      className="w-full rounded-md border border-black px-3 py-2"
                      value={form.mobile}
                      onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                      aria-invalid={!!errors.mobile}
                      aria-describedby={errors.mobile ? "mobile-error" : undefined}
                      required
                    />
                    <p id="mobile-error" className="mt-1 text-xs text-red-600">{errors.mobile}</p>
                  </div>
                </div>

                {/* Practice Name - Full Width */}
                <div>
                  <label htmlFor="practice" className="block text-sm font-medium mb-1" style={{color: '#010101'}}>
                    Practice Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="practice"
                    name="practice"
                    className="w-full rounded-md border border-black px-3 py-2"
                    value={form.practice}
                    onChange={(e) => setForm({ ...form, practice: e.target.value })}
                    aria-invalid={!!errors.practice}
                    aria-describedby={errors.practice ? "practice-error" : undefined}
                    required
                  />
                  <p id="practice-error" className="mt-1 text-xs text-red-600">{errors.practice}</p>
                </div>

                {/* Number of surgeons and Number of offices - Same Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="surgeons" className="block text-sm font-medium mb-1" style={{color: '#010101'}}>
                      Number of surgeons <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="surgeons"
                      name="surgeons"
                      className="w-full rounded-md border border-black px-3 py-2 bg-white"
                      value={form.surgeons}
                      onChange={(e) => setForm({ ...form, surgeons: e.target.value })}
                      aria-invalid={!!errors.surgeons}
                      aria-describedby={errors.surgeons ? "surgeons-error" : undefined}
                      required
                    >
                      <option value="">Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10+">10+</option>
                    </select>
                    <p id="surgeons-error" className="mt-1 text-xs text-red-600">{errors.surgeons}</p>
                  </div>

                  <div>
                    <label htmlFor="offices" className="block text-sm font-medium mb-1" style={{color: '#010101'}}>
                      Number of offices <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="offices"
                      name="offices"
                      className="w-full rounded-md border border-black px-3 py-2 bg-white"
                      value={form.offices}
                      onChange={(e) => setForm({ ...form, offices: e.target.value })}
                      aria-invalid={!!errors.offices}
                      aria-describedby={errors.offices ? "offices-error" : undefined}
                      required
                    >
                      <option value="">Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10+">10+</option>
                    </select>
                    <p id="offices-error" className="mt-1 text-xs text-red-600">{errors.offices}</p>
                  </div>
                </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1" style={{color: '#010101'}}>
                    Description
                  </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full rounded-md border border-black px-3 py-2"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              </div>

              <div className="flex justify-end pt-2">
                <button
                      type="submit"
                      className="px-6 py-2 rounded-md bg-[#2589CB] text-white font-medium hover:bg-[#1e6fa1] transition-colors"
                    >
                      Request Demo
                    </button>
              </div>
            </div>
            </form>
          </section>
        </div>
      </div>
    </section>
  );
};

export default BookDemo;