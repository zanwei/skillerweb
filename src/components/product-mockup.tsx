import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
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

export function ProductMockup() {
  const [activeTab, setActiveTab] = useState<Tab>("plugins");
  const [searchQuery, setSearchQuery] = useState("");
  const [pluginCategory, setPluginCategory] = useState<string | null>(null);
  const [skillSort, setSkillSort] = useState<SortOption>("relevance");
  const [showSettings, setShowSettings] = useState(false);

  // Filter plugins (no sorting - keep original order)
  const filteredPlugins = useMemo(() => {
    let result = [...mockPlugins];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.author.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (pluginCategory) {
      result = result.filter((p) => p.category === pluginCategory);
    }

    return result;
  }, [searchQuery, pluginCategory]);

  // Filter and sort skills
  const filteredSkills = useMemo(() => {
    let result = [...mockSkills];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query) ||
          s.owner.toLowerCase().includes(query)
      );
    }

    // Sort based on selected option
    if (skillSort === "downloads") {
      result.sort((a, b) => b.downloads - a.downloads);
    } else if (skillSort === "stars") {
      result.sort((a, b) => b.stars - a.stars);
    }
    // relevance keeps original order

    return result;
  }, [searchQuery, skillSort]);

  // No installed count shown in original app
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

  // Get category options for plugin filter dropdown
  const categoryOptions = useMemo(() => {
    return pluginCategories
      .filter((c) => c !== "All")
      .map((c) => ({ value: c, label: c }));
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Product Preview
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Beautiful, Intuitive Interface
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access Skiller from your menubar and browse plugins and skills with a
            clean, native-feeling interface.
          </p>
        </div>

        {/* Mockup Container */}
        <div className="relative flex justify-center">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-chart-2/20 to-primary/20 rounded-2xl blur-xl transform scale-105 max-w-[440px] mx-auto" />

          {/* App Panel */}
          <Panel onOpenSettings={handleOpenSettings} showHeader={!showSettings}>
            {/* Show Settings or regular content */}
            {showSettings ? (
              <Settings onClose={handleBackFromSettings} />
            ) : (
              <>
                <TabBar
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                  installedCount={installedCount}
                />

                {/* Search Bar for Plugins */}
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

                {/* Search Bar for Skills - with Relevance sort dropdown */}
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

                {/* Content Area */}
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
    </section>
  );
}
