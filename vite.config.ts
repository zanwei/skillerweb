import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import compression from "vite-plugin-compression"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Gzip compression for production
    compression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024,
    }),
    // Brotli compression (better compression ratio)
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1024,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target modern browsers for smaller bundle
    target: "es2020",
    // Minification settings
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info"],
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    // Code splitting configuration
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          // React core - rarely changes
          "react-vendor": ["react", "react-dom"],
          // UI utilities
          "ui-utils": ["clsx", "tailwind-merge", "class-variance-authority"],
          // Radix UI - heavy but rarely changes
          "radix-ui": ["radix-ui"],
          // Icons
          "icons": ["lucide-react"],
        },
        // Chunk naming for better caching
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 500,
    // CSS code splitting
    cssCodeSplit: true,
    // Generate sourcemaps only in development
    sourcemap: false,
    // Asset inlining threshold (4kb)
    assetsInlineLimit: 4096,
  },
  // Optimize deps
  optimizeDeps: {
    include: ["react", "react-dom", "clsx", "tailwind-merge"],
    exclude: [],
  },
  // Preview server config
  preview: {
    headers: {
      "Cache-Control": "public, max-age=31536000",
    },
  },
})
