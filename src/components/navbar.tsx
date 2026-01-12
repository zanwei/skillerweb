import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download } from "lucide-react";

interface NavbarProps {
  onDownload: () => void;
}

export function Navbar({ onDownload }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setHasScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-200 will-change-[background-color] ${
        hasScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
      style={{ contain: 'layout style' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 relative">
          {/* Logo */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <img
              src="/logo.png"
              alt="Skiller"
              className="size-7 rounded-md object-contain"
              width={28}
              height={28}
            />
            <span className="font-semibold text-lg tracking-tight">Skiller</span>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("clients")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Integrations
            </button>
            <a
              href="https://github.com/zanwei/skiller"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <Button
              onClick={onDownload}
              size="sm"
              className="gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              <Download className="size-4" />
              Download
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - CSS-based animation */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 top-16 bg-background/98 backdrop-blur-sm md:hidden z-50 animate-fade-in"
        >
          <div
            className="flex flex-col p-6 gap-6 animate-slide-down"
          >
            <button
              onClick={() => scrollToSection("features")}
              className="text-lg font-medium text-foreground hover:text-primary transition-colors text-left py-2"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("clients")}
              className="text-lg font-medium text-foreground hover:text-primary transition-colors text-left py-2"
            >
              Integrations
            </button>
            <a
              href="https://github.com/zanwei/skiller"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-foreground hover:text-primary transition-colors text-left py-2"
            >
              GitHub
            </a>
            <div className="pt-4 border-t border-border">
              <Button onClick={onDownload} className="w-full gap-2" size="lg">
                <Download className="size-5" />
                Download Skiller
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
