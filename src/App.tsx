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
    // 创建一个临时的 <a> 标签来触发下载
    // 这种方式比 window.open 更可靠，不会被弹出窗口阻止器拦截
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    // 如果是文件下载链接，添加 download 属性
    // 注意：由于是跨域链接，download 属性可能不生效，但链接仍会正常跳转
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
