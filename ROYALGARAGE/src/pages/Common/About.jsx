import {
  Wrench,
  ShieldCheck,
  Users,
  Award,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "We believe in honest recommendations, transparent communication and dependable service.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We are committed to delivering quality workmanship and maintaining high service standards.",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "Every customer deserves attention, respect and a reliable automotive service experience.",
  },
  {
    icon: Wrench,
    title: "Professionalism",
    description:
      "Our approach combines technical expertise, responsibility and continuous improvement.",
  },
];

const team = [
  {
    name: "Mr. Kimani",
    role: "Founder & Director",
    image: "/images/team/founder.jpg",
  },
  {
    name: "Team Member",
    role: "Lead Technician",
    image: "/images/team/technician.jpg",
  },
  {
    name: "Team Member",
    role: "Service Manager",
    image: "/images/team/manager.jpg",
  },
];

const stats = [
  { value: "30+", label: "Years of Experience" },
  { value: "100+", label: "Vehicles Serviced Weekly" },
  { value: "4+", label: "Core Service Areas" },
];

export default function About() {
  return (
    <main className="w-full container-main">
      {/* OUR STORY */}
      <section className="section py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm uppercase tracking-widest text-amber-600">
              Our Story / 01
            </span>

            <h1 className="text-5xl md:text-7xl font-bold mt-5">
              Built on experience. Driven by passion.
            </h1>

            <p className="mt-8 text-muted-foreground leading-8">
              Royal Auto Garage began in the 1990s as a small automotive parts
              business under the leadership of Mr. Kimani. What started with a
              single mechanic gradually developed into a growing automotive
              service centre.
            </p>

            <p className="mt-4 text-muted-foreground leading-8">
              Through dedication, experience and a commitment to quality, the
              business continued to grow. Today, Royal Auto Garage serves more
              than 100 vehicles weekly, building on the foundation established
              decades ago.
            </p>
          </div>

          <div className="h-[550px] bg-muted rounded-2xl overflow-hidden">
            <img
              src="/images/about/garage.jpg"
              alt="Royal Auto Garage"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl font-semibold text-center mt-28 max-w-4xl mx-auto">
          At Royal Auto Garage, customer satisfaction is at the heart of
          everything we do.
        </h2>
      </section>

      {/* MISSION & VISION */}
      <section className="section py-24 bg-muted/40">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <span className="text-amber-600 uppercase text-sm tracking-widest">
              Our Purpose
            </span>
            <h2 className="text-4xl font-bold mt-4">Our Mission</h2>
            <p className="text-muted-foreground leading-8 mt-6">
              To provide dependable automotive services through skilled
              workmanship, quality products and a customer-centred approach.
            </p>
          </div>

          <div>
            <span className="text-amber-600 uppercase text-sm tracking-widest">
              Our Direction
            </span>
            <h2 className="text-4xl font-bold mt-4">Our Vision</h2>
            <p className="text-muted-foreground leading-8 mt-6">
              To become a trusted automotive service destination recognised for
              quality, innovation and exceptional customer experiences.
            </p>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="section py-24">
        <div className="max-w-2xl mb-14">
          <span className="text-amber-600 text-sm uppercase tracking-widest">
            What Defines Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            The values that drive us.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((item) => (
            <div key={item.title} className="p-6 border rounded-xl">
              <item.icon size={30} className="text-amber-600" />
              <h3 className="font-semibold text-xl mt-6">{item.title}</h3>
              <p className="text-muted-foreground mt-3 leading-7">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* OUR IMPACT */}
      <section className="section py-24 bg-neutral-950 text-white">
        <div className="text-center mb-16">
          <span className="text-amber-500 uppercase text-sm tracking-widest">
            Our Journey in Numbers
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Experience that speaks.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <h3 className="text-5xl md:text-7xl font-bold text-amber-500">
                {stat.value}
              </h3>
              <p className="mt-4 text-neutral-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OUR TEAM */}
      <section className="section py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-amber-600 text-sm uppercase tracking-widest">
              The People Behind Our Work
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Meet Our Team
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((person) => (
            <div key={person.role}>
              <div className="h-[380px] bg-muted rounded-xl overflow-hidden">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mt-5">{person.name}</h3>
              <p className="text-muted-foreground mt-1">{person.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section py-24 bg-muted/40">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-amber-600 text-sm uppercase tracking-widest">
              The Royal Difference
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Why choose Royal Auto Garage?
            </h2>
            <p className="mt-6 text-muted-foreground leading-8">
              We combine years of practical experience with a commitment to
              dependable automotive care. Our focus is to make every service
              experience straightforward and reliable.
            </p>

            <ul className="mt-8 space-y-5">
              {[
                "Experienced automotive technicians",
                "Customer-focused service",
                "Quality workmanship",
                "Reliable automotive solutions",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-center">
                  <CheckCircle2 className="text-amber-600 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="h-[500px] rounded-2xl bg-muted overflow-hidden">
            <img
              src="/images/about/workshop.jpg"
              alt="Automotive service"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-amber-600 uppercase text-sm tracking-widest">
            Customer Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Our clients talk about us.
          </h2>
        </div>

        {/* Replace with actual customer reviews */}
        <div className="max-w-3xl mx-auto border rounded-2xl p-10 text-center">
          <p className="text-xl leading-9">
            Customer testimonials will appear here. Share genuine feedback from
            customers who have experienced our services.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section py-24 bg-amber-600 text-white text-center rounded-2xl">
        <h2 className="text-4xl md:text-6xl font-bold">
          Your vehicle deserves the best care.
        </h2>
        <p className="mt-6 text-white/80">
          Experience dependable automotive service with Royal Auto Garage.
        </p>

        <a
          href="/services"
          className="inline-flex items-center gap-3 mt-8 px-7 py-4 bg-neutral-950 text-white rounded-full"
        >
          Explore Our Services
          <ArrowUpRight size={20} />
        </a>
      </section>
    </main>
  );
}
