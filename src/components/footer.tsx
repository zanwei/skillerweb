import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

interface FooterProps {
  onDownload: () => void;
}

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Integrations", href: "#clients" },
    {
      label: "Changelog",
      href: "https://github.com/zanwei/skiller/releases",
      external: true,
    },
  ],
  resources: [
    {
      label: "Documentation",
      href: "https://github.com/zanwei/skiller#readme",
      external: true,
    },
    {
      label: "Plugin Registry",
      href: "https://claude-plugins.dev",
      external: true,
    },
    {
      label: "Support",
      href: "https://github.com/zanwei/skiller/issues",
      external: true,
    },
  ],
  community: [
    {
      label: "GitHub",
      href: "https://github.com/zanwei/skiller",
      external: true,
    },
    {
      label: "Contributing",
      href: "https://github.com/zanwei/skiller/blob/main/CONTRIBUTING.md",
      external: true,
    },
  ],
};

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
    >
      {children}
      {external && <ExternalLink className="size-3" />}
    </a>
  );
}

export function Footer({ onDownload }: FooterProps) {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer 
      className="border-t border-border"
      style={{ 
        contentVisibility: 'auto',
        containIntrinsicSize: 'auto 500px',
        contain: 'layout style paint'
      }}
    >
      {/* CTA Section */}
      <div className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div
          ref={ctaRef}
          className="max-w-2xl mx-auto text-center animate-on-scroll"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 tracking-tight text-balance">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 text-pretty">
            Download Skiller and start discovering plugins and skills.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              onClick={onDownload}
              className="w-full sm:w-auto px-8 h-12"
            >
              Download Skiller
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="w-full sm:w-auto px-8 h-12"
            >
              <a
                href="https://github.com/zanwei/skiller"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-4 mr-2" />
                Star on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <img
                  src="/logo.png"
                  alt="Skiller"
                  className="size-6 rounded-md object-contain"
                  width={24}
                  height={24}
                  loading="lazy"
                />
                <span className="font-semibold tracking-tight">
                  Skiller
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                All your skills in one place.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-medium text-sm mb-3">Product</h3>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href} external={link.external}>
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-medium text-sm mb-3">Resources</h3>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href} external={link.external}>
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="font-medium text-sm mb-3">Community</h3>
              <ul className="space-y-2">
                {footerLinks.community.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href} external={link.external}>
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-border py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Skiller. MIT License.
          </p>
          <a
            href="https://github.com/zanwei/skiller"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
