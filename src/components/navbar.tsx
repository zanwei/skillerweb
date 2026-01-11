import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download } from "lucide-react";

interface NavbarProps {
  onDownload: () => void;
}

export function Navbar({ onDownload }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-16 relative">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-1">
            <span className="font-semibold text-lg">Skiller</span>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <button
              onClick={() => scrollToSection("features")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("clients")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Clients
            </button>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
            <Button onClick={onDownload} size="sm">
              <Download className="size-4" />
              Download
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("features")}
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("clients")}
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Clients
              </button>
              <Button onClick={onDownload} className="w-full">
                <Download className="size-4" />
                Download
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
