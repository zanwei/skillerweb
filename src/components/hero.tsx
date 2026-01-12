import { useEffect, useState, useMemo, memo } from "react";
import { Button } from "@/components/ui/button";
import { Download, Github } from "lucide-react";
import {
  detectPlatform,
  getSimplePlatformLabel,
  type Platform,
} from "@/lib/download";
import {
  Panel,
  TabBar,
  SearchBar,
  FilterDropdown,
  SortDropdown,
  PluginList,
  SkillList,
  InstalledList,
  Settings,
  mockPlugins,
  mockSkills,
  pluginCategories,
  type Tab,
  type Plugin,
  type Skill,
  type SortOption,
} from "@/components/mockup";

interface HeroProps {
  onDownload: () => void;
}

// Memoized Panel component to prevent unnecessary re-renders
const HeroPanel = memo(function HeroPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("plugins");
  const [searchQuery, setSearchQuery] = useState("");
  const [pluginCategory, setPluginCategory] = useState<string | null>(null);
  const [skillSort, setSkillSort] = useState<SortOption>("relevance");
  const [showSettings, setShowSettings] = useState(false);

  // Filter plugins
  const filteredPlugins = useMemo(() => {
    let result = [...mockPlugins];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.author.toLowerCase().includes(query)
      );
    }
    if (pluginCategory) {
      result = result.filter((p) => p.category === pluginCategory);
    }
    return result;
  }, [searchQuery, pluginCategory]);

  // Filter and sort skills
  const filteredSkills = useMemo(() => {
    let result = [...mockSkills];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query) ||
          s.owner.toLowerCase().includes(query)
      );
    }
    if (skillSort === "downloads") {
      result.sort((a, b) => b.downloads - a.downloads);
    } else if (skillSort === "stars") {
      result.sort((a, b) => b.stars - a.stars);
    }
    return result;
  }, [searchQuery, skillSort]);

  const installedCount = 0;

  const handleInstallPlugin = (plugin: Plugin) => {
    console.log("Installing plugin:", plugin.name);
  };

  const handleOpenPlugin = (plugin: Plugin) => {
    console.log("Opening plugin:", plugin.name);
  };

  const handleInstallSkill = (skill: Skill) => {
    console.log("Installing skill:", skill.name);
  };

  const handleInstallSkillTo = (skill: Skill, client: string) => {
    console.log("Installing skill:", skill.name, "to client:", client);
  };

  const handleDownloadSkill = (skill: Skill) => {
    console.log("Downloading skill:", skill.name);
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSearchQuery("");
    setShowSettings(false);
  };

  const handleOpenSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleBackFromSettings = () => {
    setShowSettings(false);
  };

  const categoryOptions = useMemo(() => {
    return pluginCategories
      .filter((c) => c !== "All")
      .map((c) => ({ value: c, label: c }));
  }, []);

  return (
    <div className="relative scale-[0.84] sm:scale-[0.96] md:scale-[1.08] lg:scale-100 origin-top">
      <Panel onOpenSettings={handleOpenSettings} showHeader={!showSettings}>
        {showSettings ? (
          <Settings onClose={handleBackFromSettings} />
        ) : (
          <>
            <TabBar
              activeTab={activeTab}
              onTabChange={handleTabChange}
              installedCount={installedCount}
            />

            {activeTab === "plugins" && (
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search plugins..."
                filterDropdown={
                  <FilterDropdown
                    label="Category"
                    options={categoryOptions}
                    value={pluginCategory}
                    onChange={setPluginCategory}
                  />
                }
              />
            )}

            {activeTab === "skills" && (
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search skills..."
                filterDropdown={
                  <SortDropdown
                    value={skillSort}
                    onChange={setSkillSort}
                  />
                }
              />
            )}

            {activeTab === "plugins" && (
              <PluginList
                plugins={filteredPlugins}
                total={mockPlugins.length}
                onInstall={handleInstallPlugin}
                onOpen={handleOpenPlugin}
              />
            )}

            {activeTab === "skills" && (
              <SkillList
                skills={filteredSkills}
                total={mockSkills.length}
                onInstall={handleInstallSkill}
                onInstallTo={handleInstallSkillTo}
                onDownload={handleDownloadSkill}
              />
            )}

            {activeTab === "installed" && <InstalledList />}
          </>
        )}
      </Panel>
    </div>
  );
});

export function Hero({ onDownload }: HeroProps) {
  const [platform, setPlatform] = useState<Platform>("unknown");

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  return (
    <section className="relative min-h-dvh flex items-center justify-center pt-24 pb-20 overflow-hidden">
      {/* Subtle dot pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '24px 24px',
          color: 'var(--muted-foreground)',
        }}
      />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.08),transparent)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Main Heading */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 text-balance leading-[1.1] animate-fade-in-up delay-100"
            >
              All your skills
              <br />
              <span className="text-muted-foreground">in one place.</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg text-muted-foreground max-w-lg mb-8 text-pretty mx-auto lg:mx-0 animate-fade-in-up delay-200"
            >
              A menubar app for browsing and installing{" "}
              <span className="text-foreground font-medium">Claude Code plugins</span> and{" "}
              <span className="text-foreground font-medium">Agent Skills</span>.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-6 animate-fade-in-up delay-300"
            >
              <Button
                size="lg"
                onClick={onDownload}
                className="gap-2 px-6 h-12 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-shadow"
              >
                <Download className="size-5" />
                Download for {getSimplePlatformLabel(platform)}
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="gap-2 px-6 h-12 text-base font-medium"
              >
                <a
                  href="https://github.com/zanwei/skiller"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="size-5" />
                  GitHub
                </a>
              </Button>
            </div>

            {/* Platform availability */}
            <p
              className="text-sm text-muted-foreground animate-fade-in-up delay-400"
            >
              Available for macOS, Windows, and Linux
            </p>
          </div>

          {/* Right: Panel Mockup */}
          <div
            className="w-full lg:w-auto flex justify-center lg:shrink-0 relative animate-fade-in-up delay-300"
          >
            {/* Shadow/Glow effect behind panel */}
            <div className="absolute inset-0 translate-y-4 scale-[0.97] blur-3xl bg-foreground/5 rounded-3xl" />
            
            <HeroPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
