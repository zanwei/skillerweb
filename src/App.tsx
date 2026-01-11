import { useCallback, useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Clients } from "@/components/clients";
import { Footer } from "@/components/footer";
import { detectPlatform, getDownloadUrl, getDownloadUrlSync } from "@/lib/download";

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
    
    try {
      // 尝试从 GitHub API 获取正确的下载链接
      const downloadUrl = await getDownloadUrl(platform);
      triggerDownload(downloadUrl);
    } catch (error) {
      console.error('Failed to get download URL:', error);
      // 回退到同步版本的 URL
      const fallbackUrl = getDownloadUrlSync(platform);
      triggerDownload(fallbackUrl);
    } finally {
      setIsDownloading(false);
    }
  }, [isDownloading]);

  // 直接触发文件下载
  const triggerDownload = (url: string) => {
    // 使用 window.open 在新标签页打开下载链接
    // 浏览器会自动检测文件类型并启动下载，新标签页会自动关闭或显示空白
    // 这是最可靠的跨域文件下载方式
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onDownload={handleDownload} />
      <main>
        <Hero onDownload={handleDownload} />
        <Features />
        <Clients />
      </main>
      <Footer onDownload={handleDownload} />
    </div>
  );
}

export default App;
