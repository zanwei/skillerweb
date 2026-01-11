import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, ExternalLink } from "lucide-react";

interface FooterProps {
  onDownload: () => void;
}

export function Footer({ onDownload }: FooterProps) {
  return (
    <footer className="bg-muted/30 border-t border-border">
      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-medium mb-4">
            Unite skills.md in one place.
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Download Skiller now and start discovering plugins and skills for
            Claude Code and other AI assistants.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={onDownload} className="w-full sm:w-auto">
              Download Skiller
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <a
                href="https://github.com/zanwei/skiller"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-4" />
                Star on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Links Section */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Product */}
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#features"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#clients"
                    className="hover:text-foreground transition-colors"
                  >
                    Integrations
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/zanwei/skiller/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    Changelog
                    <ExternalLink className="size-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://github.com/zanwei/skiller#readme"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    Documentation
                    <ExternalLink className="size-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://claude-plugins.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    Plugin Registry
                    <ExternalLink className="size-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/zanwei/skiller/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    Support
                    <ExternalLink className="size-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://github.com/zanwei/skiller"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    GitHub
                    <ExternalLink className="size-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/zanwei/skiller/blob/main/CONTRIBUTING.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    Contributing
                    <ExternalLink className="size-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/zanwei/skiller/blob/main/CODE_OF_CONDUCT.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    Code of Conduct
                    <ExternalLink className="size-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://github.com/zanwei/skiller/blob/main/LICENSE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    MIT License
                    <ExternalLink className="size-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom Section */}
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">Skiller</span>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Skiller. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
