export type Platform = "macos-intel" | "macos-arm" | "windows" | "linux" | "unknown";

export interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

export interface ReleaseInfo {
  tag_name: string;
  assets: ReleaseAsset[];
}

// 检测平台和架构
export function detectPlatform(): Platform {
  const platform = navigator.platform.toLowerCase();
  const userAgent = navigator.userAgent.toLowerCase();

  if (platform.includes("mac") || userAgent.includes("mac")) {
    // 检测 Apple Silicon (M1/M2/M3)
    // navigator.userAgent 在 Apple Silicon 上通常包含 "arm" 或可以通过其他方式检测
    // 也可以通过检测 WebGL renderer 来判断
    const isAppleSilicon = detectAppleSilicon();
    return isAppleSilicon ? "macos-arm" : "macos-intel";
  } else if (platform.includes("win") || userAgent.includes("win")) {
    return "windows";
  } else if (platform.includes("linux") || userAgent.includes("linux")) {
    return "linux";
  }

  return "unknown";
}

// 检测是否为 Apple Silicon
function detectAppleSilicon(): boolean {
  try {
    // 方法1: 检查 navigator.userAgentData (Chromium 浏览器)
    if ('userAgentData' in navigator) {
      const uaData = (navigator as Navigator & { userAgentData?: { platform: string } }).userAgentData;
      if (uaData?.platform === 'macOS') {
        // 在支持的浏览器中，可以通过其他 API 检测架构
        // 但目前没有直接的方法，所以继续使用其他方法
      }
    }

    // 方法2: 检查 WebGL renderer (更可靠)
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        // Apple Silicon GPU 名称通常包含 "Apple M" 或 "Apple GPU"
        if (renderer && (renderer.includes('Apple M') || renderer.includes('Apple GPU'))) {
          return true;
        }
      }
    }

    // 方法3: 检查 platform 是否有 arm 相关信息
    if (navigator.platform.includes('arm') || navigator.userAgent.includes('arm')) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

// 获取简化的平台类型用于显示
export function getSimplePlatform(platform: Platform): "macos" | "windows" | "linux" | "unknown" {
  if (platform === "macos-intel" || platform === "macos-arm") {
    return "macos";
  }
  return platform;
}

// 缓存 release 信息
let cachedReleaseInfo: ReleaseInfo | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

// 从 GitHub API 获取最新 release 信息
export async function fetchLatestRelease(): Promise<ReleaseInfo | null> {
  // 检查缓存
  if (cachedReleaseInfo && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedReleaseInfo;
  }

  try {
    const response = await fetch('https://api.github.com/repos/zanwei/skiller/releases/latest');
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    const data = await response.json();
    cachedReleaseInfo = {
      tag_name: data.tag_name,
      assets: data.assets.map((asset: { name: string; browser_download_url: string; size: number }) => ({
        name: asset.name,
        browser_download_url: asset.browser_download_url,
        size: asset.size,
      })),
    };
    cacheTimestamp = Date.now();
    return cachedReleaseInfo;
  } catch (error) {
    console.error('Failed to fetch release info:', error);
    return null;
  }
}

// 根据平台获取对应的下载 URL
export async function getDownloadUrl(platform: Platform): Promise<string> {
  const releaseInfo = await fetchLatestRelease();
  
  if (!releaseInfo || releaseInfo.assets.length === 0) {
    // 如果无法获取 release 信息，使用同步版本的下载链接
    return getDownloadUrlSync(platform);
  }

  const assets = releaseInfo.assets;
  
  // 根据平台匹配资产
  let matchedAsset: ReleaseAsset | undefined;

  switch (platform) {
    case "macos-arm":
      // 优先查找 aarch64/arm64 版本
      matchedAsset = assets.find(a => 
        a.name.endsWith('.dmg') && (a.name.includes('aarch64') || a.name.includes('arm64'))
      );
      // 如果没有 arm 版本，回退到 x64
      if (!matchedAsset) {
        matchedAsset = assets.find(a => a.name.endsWith('.dmg'));
      }
      break;
    case "macos-intel":
      // 优先查找 x64/intel 版本
      matchedAsset = assets.find(a => 
        a.name.endsWith('.dmg') && (a.name.includes('x64') || a.name.includes('intel'))
      );
      // 如果没有明确标注，使用第一个 dmg
      if (!matchedAsset) {
        matchedAsset = assets.find(a => a.name.endsWith('.dmg'));
      }
      break;
    case "windows":
      // 优先查找 .exe 安装程序
      matchedAsset = assets.find(a => a.name.endsWith('.exe'));
      // 如果没有 exe，尝试 msi
      if (!matchedAsset) {
        matchedAsset = assets.find(a => a.name.endsWith('.msi'));
      }
      break;
    case "linux":
      // 优先查找 .deb
      matchedAsset = assets.find(a => a.name.endsWith('.deb'));
      // 如果没有 deb，尝试 AppImage
      if (!matchedAsset) {
        matchedAsset = assets.find(a => a.name.endsWith('.AppImage'));
      }
      // 如果没有 AppImage，尝试 rpm
      if (!matchedAsset) {
        matchedAsset = assets.find(a => a.name.endsWith('.rpm'));
      }
      break;
    default:
      // 未知平台，返回 releases 页面
      return "https://github.com/zanwei/skiller/releases";
  }

  if (matchedAsset) {
    return matchedAsset.browser_download_url;
  }

  // 如果没有找到匹配的资产，返回 releases 页面
  return "https://github.com/zanwei/skiller/releases";
}

// 同步版本的 getDownloadUrl（用于 GitHub API 不可用时的备用方案）
// 使用固定文件名，需要配合 CI/CD 在发布时创建不带版本号的文件副本
export function getDownloadUrlSync(platform: Platform): string {
  const baseUrl = "https://github.com/zanwei/skiller/releases/latest/download";

  switch (platform) {
    case "macos-arm":
      return `${baseUrl}/Skiller_aarch64.dmg`;
    case "macos-intel":
      return `${baseUrl}/Skiller_x64.dmg`;
    case "windows":
      return `${baseUrl}/Skiller_x64-setup.exe`;
    case "linux":
      return `${baseUrl}/Skiller_amd64.deb`;
    default:
      return "https://github.com/zanwei/skiller/releases";
  }
}

export function getPlatformLabel(platform: Platform): string {
  switch (platform) {
    case "macos-arm":
      return "macOS (Apple Silicon)";
    case "macos-intel":
      return "macOS (Intel)";
    case "windows":
      return "Windows";
    case "linux":
      return "Linux";
    default:
      return "All Platforms";
  }
}

// 简化的平台标签（不区分架构）
export function getSimplePlatformLabel(platform: Platform): string {
  switch (platform) {
    case "macos-arm":
    case "macos-intel":
      return "macOS";
    case "windows":
      return "Windows";
    case "linux":
      return "Linux";
    default:
      return "All Platforms";
  }
}

export function getPlatformIcon(platform: Platform): string {
  switch (platform) {
    case "macos-arm":
    case "macos-intel":
      return "🍎";
    case "windows":
      return "🪟";
    case "linux":
      return "🐧";
    default:
      return "💻";
  }
}
