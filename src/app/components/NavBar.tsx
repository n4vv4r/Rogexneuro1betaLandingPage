import { useState, useEffect } from "react";
import { Menu, X, Activity } from "lucide-react";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "PRISMA Beta", href: "#prisma" },
    { label: "Funcionalidades", href: "#features" },
    { label: "Dashboard", href: "#dashboard" },
    { label: "Newsletter", href: "#newsletter" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Inversores", href: "#investors" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(6, 12, 24, 0.96)"
          : "rgba(6, 12, 24, 0.7)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(0, 212, 255, 0.12)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
            }}
          >
            <Activity size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="text-white tracking-wider"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              ROGEX
            </span>
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "9px",
                fontWeight: 500,
                color: "#00d4ff",
                letterSpacing: "0.12em",
              }}
            >
              LABORATORIES
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors duration-200"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                color: "#6b82a8",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#dde8f5")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#6b82a8")
              }
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#investors"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#00d4ff",
              letterSpacing: "0.04em",
              padding: "7px 16px",
              border: "1px solid rgba(0, 212, 255, 0.3)",
              borderRadius: "8px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "rgba(0, 212, 255, 0.08)";
              el.style.borderColor = "rgba(0, 212, 255, 0.5)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "transparent";
              el.style.borderColor = "rgba(0, 212, 255, 0.3)";
            }}
          >
            Inversores
          </a>
          <a
            href="#newsletter"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#060c18",
              background: "linear-gradient(135deg, #00d4ff, #0ea5e9)",
              padding: "7px 18px",
              borderRadius: "8px",
              letterSpacing: "0.02em",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "0.9")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "1")
            }
          >
            Newsletter
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: "rgba(6, 12, 24, 0.98)" }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: "#6b82a8",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#newsletter"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: "#060c18",
              background: "linear-gradient(135deg, #00d4ff, #0ea5e9)",
              padding: "10px 20px",
              borderRadius: "8px",
              textAlign: "center",
              marginTop: "8px",
            }}
          >
            Newsletter
          </a>
        </div>
      )}
    </header>
  );
}
