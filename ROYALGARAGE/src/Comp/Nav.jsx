import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/Comp/theme-provider";
import { Button } from "@/components/ui/button";

const links = [
  { name: "Home", path: "/home" },
  { name: "Services", path: "services" },
  { name: "About", path: "about" },
  { name: "Blog", path: "blog" },
  { name: "Contact", path: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { theme, setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    let previousY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      setScrolled(currentY > 40);

      if (currentY < 80) {
        setHidden(false);
      } else if (currentY > previousY + 5) {
        setHidden(true);
        setMobileOpen(false);
      } else if (currentY < previousY - 5) {
        setHidden(false);
      }

      previousY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${scrolled ? "bg-primary shadow-lg" : "bg-transparent"}`}
    >
      <nav className="container-main flex h-20 items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/src/assets/images/logo.png"
            alt="Royal Auto Garage"
            className="w-12 h-12 object-contain"
          />
          <div className="leading-tight">
            <h2 className="font-bold text-lg text-white tracking-wide">
              ROYAL
            </h2>
            <span className="text-[10px] tracking-[0.25em] text-white/70">
              AUTO GARAGE
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors ${
                location.pathname.includes(link.path)
                  ? "text-header"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-white hover:bg-white/10"
          >
            {theme === "dark" ? <Moon /> : <Sun />}
          </Button>

          <Link
            to="/royalgarage/services"
            className="flex items-center gap-2 bg-accent text-white px-5 py-3 rounded-md font-semibold text-sm hover:opacity-90 transition"
          >
            Book a Service
            <ArrowUpRight size={17} />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden bg-primary transition-all duration-300 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-main py-5 flex flex-col gap-5">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-white/90 hover:text-header font-medium"
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/royalgarage/services"
            className="bg-accent text-primary p-3 rounded-md text-center font-semibold"
          >
            Book a Service
          </Link>

          <Button
            variant="ghost"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="justify-start text-white"
          >
            {theme === "dark" ? <Sun /> : <Moon />}
            Toggle Theme
          </Button>
        </div>
      </div>
    </header>
  );
}
