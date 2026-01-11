import { useEffect, useState, useMemo } from "react";
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

export function Hero({ onDownload }: HeroProps) {
  const [platform, setPlatform] = useState<Platform>("unknown");

  // Panel state
  const [activeTab, setActiveTab] = useState<Tab>("plugins");
  const [searchQuery, setSearchQuery] = useState("");
  const [pluginCategory, setPluginCategory] = useState<string | null>(null);
  const [skillSort, setSkillSort] = useState<SortOption>("relevance");
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

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
    <section className="relative min-h-screen flex items-center justify-center pt-16 pb-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-2/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text Content */}
          <div className="flex-1 text-center lg:text-left pt-16">
        {/* Main Heading */}
        <h1 className="text-5xl lg:text-7xl font-medium tracking-[-3px] mb-6">
          <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text font-medium h-fit">
            Skills.md in a place
          </span>
        </h1>

        {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8 font-light">
          A menubar app for discovering, browsing, and installing{" "}
          <span className="text-foreground font-medium">Claude Code plugins</span> and{" "}
          <span className="text-foreground font-medium">Agent Skills</span> with just a click.
        </p>

        {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-8">
          <Button size="lg" onClick={onDownload} className="w-full sm:w-auto gap-2 text-base px-6">
            <Download className="size-5" />
            Download for {getSimplePlatformLabel(platform)}
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="w-full sm:w-auto gap-2 text-base px-6"
          >
            <a
              href="https://github.com/zanwei/skiller"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-5" />
              View on GitHub
            </a>
          </Button>
        </div>

          </div>

          {/* Right: Panel Mockup */}
          <div className="flex-shrink-0 relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-chart-2/20 to-primary/20 rounded-2xl blur-xl transform scale-105" />

            {/* App Panel */}
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
        </div>
      </div>
    </section>
  );
}
