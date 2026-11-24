import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  ArrowUpRight,
  Wrench,
  ShieldCheck,
  Clock3,
  Handshake,
  ScanSearch,
  ClipboardCheck,
  Settings,
  CheckCircle2,
  Quote,
  Phone,
  CarFront,
  Gauge,
} from "lucide-react";

// Existing assets
import bg2 from "../../assets/images/bg2.jpg";
import bg3 from "../../assets/images/bg3.jpg";
import bg4 from "../../assets/images/tirereplacement.jpg";
import bg from "../../assets/images/engine3.jpg";
import landRover from "../../assets/images/landroverimage.png";
import Banner from "../../Comp/banner";

// --------------------------------------------------
// STATIC DATA
// --------------------------------------------------

const slides = [
  {
    image: bg2,
    text: "From routine maintenance to complex mechanical repairs, we provide dependable automotive care.",
  },
  {
    image: bg3,
    text: "Our experienced team is committed to keeping your vehicle performing at its best.",
  },
  {
    image: bg4,
    text: "Quality workmanship and customer-focused service are at the heart of everything we do.",
  },
  {
    image: bg,
    text: "Trust Royal Auto Garage for professional vehicle maintenance and repair solutions.",
  },
];

const coreServices = [
  {
    icon: Wrench,
    heading: "General Auto Repairs",
    paragraph:
      "We handle a wide range of mechanical issues, restoring your vehicle's performance and reliability.",
  },
  {
    icon: Gauge,
    heading: "Engine Diagnostics",
    paragraph:
      "We identify engine faults and performance issues using diagnostic tools and professional expertise.",
  },
  {
    icon: CarFront,
    heading: "Routine Vehicle Servicing",
    paragraph:
      "Regular maintenance, including oil changes, filter replacements and vehicle inspections.",
  },
  {
    icon: Settings,
    heading: "Electrical Services",
    paragraph:
      "Diagnosis and repair of battery, wiring, lighting and other vehicle electrical systems.",
  },
];

const advantages = [
  {
    icon: ShieldCheck,
    title: "Quality Workmanship",
    description:
      "We focus on careful inspection, proper repairs and attention to detail.",
  },
  {
    icon: Wrench,
    title: "Experienced Technicians",
    description:
      "Our team brings practical automotive knowledge to every service.",
  },
  {
    icon: Clock3,
    title: "Efficient Service",
    description:
      "We follow an organized service process to keep work moving efficiently.",
  },
  {
    icon: Handshake,
    title: "Customer Commitment",
    description:
      "We value honest communication, dependable service and lasting relationships.",
  },
];

const processSteps = [
  {
    icon: ScanSearch,
    number: "01",
    title: "Vehicle Assessment",
    description:
      "We inspect your vehicle, understand your concerns and identify its service requirements.",
  },
  {
    icon: ClipboardCheck,
    number: "02",
    title: "Diagnosis & Estimate",
    description:
      "We determine the necessary repairs and communicate the estimated work before proceeding.",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Repair & Servicing",
    description:
      "Our technicians carry out the agreed repairs and maintenance with attention to quality.",
  },
  {
    icon: CheckCircle2,
    number: "04",
    title: "Inspection & Collection",
    description:
      "We inspect completed work and prepare your vehicle for collection.",
  },
];

const galleryImages = [
  { image: bg, title: "Engine Maintenance" },
  { image: bg2, title: "Workshop Activities" },
  { image: bg3, title: "Vehicle Inspection" },
  { image: bg4, title: "Tyre Replacement" },
  { image: landRover, title: "Vehicle Servicing" },
];

const teamMembers = [
  {
    name: "Mr. Kimani",
    role: "Founder & Director",
    image: null,
  },
  {
    name: "Team Member",
    role: "Lead Technician",
    image: null,
  },
  {
    name: "Team Member",
    role: "Service Manager",
    image: null,
  },
];

const testimonials = [
  {
    name: "Customer Name",
    vehicle: "Vehicle Owner",
    message:
      "Add a genuine customer review describing their experience with Royal Auto Garage.",
  },
  {
    name: "Customer Name",
    vehicle: "Vehicle Owner",
    message:
      "Add another genuine review highlighting the quality of service and customer experience.",
  },
  {
    name: "Customer Name",
    vehicle: "Vehicle Owner",
    message:
      "Share feedback from a customer who has used your automotive services.",
  },
];

// --------------------------------------------------
// REUSABLE COMPONENTS
// --------------------------------------------------

function SectionHeading({ eyebrow, title, description, center = false }) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-2xl`}>
      {eyebrow && (
        <span className="text-header uppercase tracking-[0.2em] text-sm font-semibold">
          {eyebrow}
        </span>
      )}

      <h2 className="heading-medium text-primary mt-3">{title}</h2>

      {description && (
        <p className="text-muted-foreground leading-7 mt-4">{description}</p>
      )}
    </div>
  );
}

function SectionLink({ to, children }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="inline-flex items-center gap-2 font-semibold text-primary hover:gap-4 transition-all"
    >
      {children}
      <ArrowUpRight size={18} />
    </button>
  );
}

// --------------------------------------------------
// HOME PAGE
// --------------------------------------------------

export default function Home() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  // Hero image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden=">
      {/* ==========================================
          01. HERO
      ========================================== */}

      <section className="relative w-full h-screen min-h-[650px] overflow-hidden ">
        {slides.map((slide, i) => (
          <img
            key={slide.image}
            src={slide.image}
            alt="Royal Auto Garage automotive services"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-black/60 z-10" />

        <div className="relative z-20 container-main h-full flex flex-col justify-center items-center text-center">
          <span className="uppercase tracking-[0.3em] text-sm text-white/80 mb-6">
            Professional Automotive Care
          </span>

          <h1 className="font-[Outfit] font-bold text-secondary text-5xl md:text-7xl lg:text-8xl">
            Royal <span className="text-header">Auto</span>{" "}
            <span className="text-white">Garage</span>
          </h1>

          <div className="max-w-2xl mt-8">
            <h2 className="text-white text-xl md:text-2xl font-semibold">
              Reliable Auto Repair & Maintenance Services in Nairobi
            </h2>

            <p className="text-white/80 leading-8 mt-5">{slides[index].text}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 mt-10">
            <button
              onClick={() => navigate("/royalgarage/services")}
              className="px-8 py-4 bg-accent rounded-lg font-semibold text-primary flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 transition"
            >
              Book a Service
              <ArrowRight size={19} />
            </button>

            <button
              onClick={() => navigate("/royalgarage/about")}
              className="px-8 py-4 border border-white/70 text-white rounded-lg hover:bg-white hover:text-black transition"
            >
              Discover Our Story
            </button>
          </div>

          {/* Slide indicators */}
          <div className="flex gap-3 mt-12">
            {slides.map((slide, i) => (
              <button
                key={slide.image}
                aria-label={`Show slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  index === i ? "w-10 bg-accent" : "w-3 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-30">
          <Banner />
        </div>
      </section>

      {/* ==========================================
          02. ABOUT US
      ========================================== */}

      <section className="section container-main">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-7">
            <SectionHeading
              eyebrow="About Royal Auto Garage"
              title="Decades of experience. A commitment to better automotive care."
            />

            <p className="text-muted-foreground leading-8">
              Royal Auto Garage began in the 1990s as a small automotive parts
              business under the leadership of Mr. Kimani. What started with a
              single mechanic gradually developed into a growing automotive
              service centre.
            </p>

            <p className="text-muted-foreground leading-8">
              Through dedication, experience and a commitment to quality, the
              business continued to grow. Today, Royal Auto Garage serves more
              than 100 vehicles weekly.
            </p>

            <SectionLink to="/royalgarage/about">
              Discover Our Story
            </SectionLink>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-primary">
                  1990s
                </h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  Our journey began
                </p>
              </div>

              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-primary">
                  100+
                </h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  Vehicles serviced weekly
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src={landRover}
              alt="Vehicle at Royal Auto Garage"
              className="w-full h-[450px] md:h-[580px] object-cover rounded-2xl shadow-xl"
            />

            <div className="absolute -bottom-6 -left-4 md:-left-8 bg-primary text-primary-foreground p-6 rounded-xl max-w-[220px]">
              <p className="text-sm opacity-80">Driven by experience</p>
              <h3 className="text-xl font-bold mt-2">
                Built on trust and dedication.
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          03. WHY CHOOSE US
      ========================================== */}

      <section className="section bg-muted/40">
        <div className="container-main">
          <SectionHeading
            eyebrow="The Royal Difference"
            title="Why choose Royal Auto Garage?"
            description="We combine practical experience, professional workmanship and a customer-focused approach to deliver dependable automotive care."
            center
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {advantages.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="bg-card p-7 rounded-xl border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center text-primary">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-xl font-bold mt-7">{item.title}</h3>

                  <p className="text-muted-foreground leading-7 mt-3 text-sm">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          04. CORE SERVICES
      ========================================== */}

      <section className="section container-main">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="What We Do"
            title="Our Core Services"
            description="From routine maintenance to specialized repairs, we provide solutions that help keep your vehicle in good condition."
          />

          <SectionLink to="/royalgarage/services">
            View All Services
          </SectionLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {coreServices.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.heading}
                className="bg-card border rounded-xl p-7 flex flex-col min-h-[290px] hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center text-primary">
                  <Icon size={27} />
                </div>

                <h3 className="text-xl font-bold mt-7">{service.heading}</h3>

                <p className="text-sm text-muted-foreground leading-7 mt-4 flex-1">
                  {service.paragraph}
                </p>

                <button
                  onClick={() => navigate("/royalgarage/services")}
                  className="flex items-center gap-2 mt-6 text-primary font-semibold text-sm"
                >
                  Explore Service
                  <ArrowRight size={17} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==========================================
          05. HOW WE WORK
      ========================================== */}

      <section className="section container-main">
        <div className="container-main">
          <SectionHeading
            eyebrow="Our Process"
            title="Professional care, from assessment to collection."
            description="We follow an organized process to make your vehicle service experience straightforward and transparent."
            center
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {processSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="relative">
                  <div className="bg-card border rounded-xl p-7 h-full">
                    <div className="flex justify-between items-center">
                      <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center text-primary">
                        <Icon size={27} />
                      </div>

                      <span className="text-4xl font-bold text-muted/50">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mt-8">{step.title}</h3>

                    <p className="text-sm text-muted-foreground leading-7 mt-4">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          06. WORKSHOP GALLERY
      ========================================== */}

      <section className="section container-main">
        <SectionHeading
          eyebrow="Inside Our Workshop"
          title="A closer look at what we do."
          description="Explore the people, equipment and automotive work that make up the Royal Auto Garage experience."
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
          {galleryImages.map((item, index) => (
            <div
              key={item.title}
              className={`relative overflow-hidden rounded-xl group ${
                index === 0 ? "lg:row-span-2" : ""
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                  index === 0
                    ? "h-full min-h-[350px]"
                    : "h-[220px] md:h-[270px]"
                }`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                <h3 className="text-white font-semibold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          07. OUR EXPERTS
      ========================================== */}

      <section className="section container-main">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading
              eyebrow="The People Behind Our Work"
              title="Meet Our Experts"
              description="The skilled hands and dedicated people behind every vehicle we service."
            />

            <SectionLink to="/royalgarage/about">Meet the Team</SectionLink>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
            {teamMembers.map((person) => (
              <div key={person.role}>
                <div className="h-[350px] bg-muted rounded-xl overflow-hidden flex items-center justify-center">
                  {person.image ? (
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-muted-foreground">
                      <CarFront size={55} />
                      <span className="text-sm">Team photograph</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold mt-5">{person.name}</h3>

                <p className="text-muted-foreground mt-1">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          08. TESTIMONIALS
      ========================================== */}

      <section className="section container-main">
        <SectionHeading
          eyebrow="Customer Experiences"
          title="Our clients talk about us."
          description="Customer trust is built through consistent service, communication and quality workmanship."
          center
        />

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {testimonials.map((item, index) => (
            <div key={index} className="border bg-card rounded-xl p-8">
              <Quote size={30} className="text-header" />

              <p className="leading-8 text-muted-foreground mt-6">
                "{item.message}"
              </p>

              <div className="border-t mt-7 pt-5">
                <h3 className="font-bold">{item.name}</h3>

                <p className="text-sm text-muted-foreground mt-1">
                  {item.vehicle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          09. FINAL CALL TO ACTION
      ========================================== */}

      <section className="container-main pb-16">
        <div className="relative overflow-hidden rounded-2xl bg-neutral-950 text-white p-10 md:p-20 text-center">
          <div className="absolute inset-0 opacity-20">
            <img src={bg3} alt="" className="w-full h-full object-cover" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-header uppercase tracking-[0.2em] text-sm font-semibold">
              Royal Auto Garage
            </span>

            <h2 className="text-4xl md:text-6xl font-bold mt-6">
              Your vehicle deserves dependable care.
            </h2>

            <p className="text-white/70 leading-8 mt-6">
              From routine maintenance to complex repairs, our team is ready to
              help keep you moving. Get in touch with Royal Auto Garage today.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">
              <button
                onClick={() => navigate("/royalgarage/services")}
                className="px-8 py-4 bg-accent text-white rounded-lg font-semibold flex items-center justify-center gap-3 hover:opacity-90 transition"
              >
                Book a Service
                <ArrowRight size={19} />
              </button>

              <button
                onClick={() => navigate("/royalgarage/contact")}
                className="px-8 py-4 border border-white/40 rounded-lg flex items-center justify-center gap-3 hover:bg-white hover:text-black transition"
              >
                <Phone size={18} />
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
