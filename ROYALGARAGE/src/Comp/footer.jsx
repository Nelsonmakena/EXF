import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ArrowUpRight, Wrench } from "lucide-react";

const companyLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/royalgarage/about" },
  { name: "Our Services", path: "/royalgarage/services" },
  { name: "Contact Us", path: "/royalgarage/contact" },
  { name: "Blog", path: "/royalgarage/blog" },
];

const serviceLinks = [
  "General Auto Repairs",
  "Engine Diagnostics",
  "Routine Servicing",
  "Electrical Services",
];

const socialLinks = [
  // { icon: Facebook, url: "#", label: "Facebook" },
  // { icon: Instagram, url: "#", label: "Instagram" },
  // { icon: Linkedin, url: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      {/* Main footer */}
      <div className="container-main pt-16 md:pt-20 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center text-primary">
                <Wrench size={25} />
              </div>

              <div>
                <h2 className="font-bold text-xl tracking-wide">
                  ROYAL <span className="text-header">AUTO</span>
                </h2>
                <p className="text-xs tracking-[0.3em] text-gray-400">GARAGE</p>
              </div>
            </Link>

            <p className="text-sm text-gray-400 leading-7 max-w-xs">
              Providing dependable automotive repair and maintenance services.
              Built on experience, driven by quality and committed to customer
              satisfaction.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  aria-label={label}
                  className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-black transition"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Company navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Company</h3>

            <ul className="space-y-4 text-sm text-gray-400">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-accent transition-colors inline-flex items-center gap-2"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Our Services</h3>

            <ul className="space-y-4 text-sm text-gray-400">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    to="/royalgarage/services"
                    className="hover:text-accent transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Get In Touch</h3>

            <div className="space-y-5 text-sm text-gray-400">
              <div className="flex gap-3 items-start">
                <MapPin size={19} className="text-accent shrink-0 mt-1" />
                <p>
                  Nairobi, Kenya
                  <span className="block text-xs mt-1">Visit our garage</span>
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <Phone size={19} className="text-accent shrink-0" />
                <span>+254 XXX XXX XXX</span>
              </div>

              <div className="flex gap-3 items-center">
                <Mail size={19} className="text-accent shrink-0" />
                <span>info@royalautogarage.com</span>
              </div>

              <div className="flex gap-3 items-start">
                <Clock size={19} className="text-accent shrink-0 mt-1" />
                <p>
                  Monday - Saturday
                  <span className="block text-xs mt-1">
                    Working hours: To be confirmed
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking banner */}
        <div className="mt-16 border border-white/10 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold">
              Need professional vehicle care?
            </h3>
            <p className="text-sm text-gray-400 mt-2">
              Let our team help keep your vehicle road-ready.
            </p>
          </div>

          <Link
            to="/royalgarage/services"
            className="bg-accent text-primary px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-3 hover:opacity-90 transition whitespace-nowrap"
          >
            Book a Service
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-white/10">
        <div className="container-main py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} Royal Auto Garage. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs text-gray-500">
            <Link
              to="/royalgarage/privacy"
              className="hover:text-white transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/royalgarage/terms"
              className="hover:text-white transition"
            >
              Terms & Conditions
            </Link>
          </div>

          <p className="text-xs text-gray-500">
            Built for better automotive care.
          </p>
        </div>
      </div>
    </footer>
  );
}
