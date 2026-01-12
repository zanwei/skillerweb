import { useCallback, useEffect, useState, lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { track } from "@vercel/analytics";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { detectPlatform, getDownloadUrl, getDownloadUrlSync, getSimplePlatformLabel } from "@/lib/download";

// Lazy load non-critical components
const Features = lazy(() => import("@/components/features").then(m => ({ default: m.Features })));
const Clients = lazy(() => import("@/components/clients").then(m => ({ default: m.Clients })));
const Footer = lazy(() => import("@/components/footer").then(m => ({ default: m.Footer })));

// Minimal loading placeholder
function SectionLoader() {
  return <div className="min-h-[400px]" />;
}

export function App() {
  const [isDark, setIsDark] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Check system preference for dark mode
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Apply dark mode class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Handle download action - 异步获取正确的下载链接并直接触发下载
  const handleDownload = useCallback(async () => {
    if (isDownloading) return;
    
    const platform = detectPlatform();
    setIsDownloading(true);
    
    // 追踪下载事件
    track("download", {
      platform: getSimplePlatformLabel(platform),
      detailedPlatform: platform,
    });
    
    try {
      // 尝试从 GitHub API 获取正确的下载链接
      const downloadUrl = await getDownloadUrl(platform);
      triggerDownload(downloadUrl);
    } catch {
      // 回退到同步版本的 URL
      const fallbackUrl = getDownloadUrlSync(platform);
      triggerDownload(fallbackUrl);
    } finally {
      setIsDownloading(false);
    }
  }, [isDownloading]);

  // 直接触发文件下载
  const triggerDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onDownload={handleDownload} />
      <main>
        <Hero onDownload={handleDownload} />
        <Suspense fallback={<SectionLoader />}>
          <Features />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Clients />
        </Suspense>
      </main>
      <Suspense fallback={<SectionLoader />}>
        <Footer onDownload={handleDownload} />
      </Suspense>
      <Analytics />
    </div>
  );
}

export default App;
