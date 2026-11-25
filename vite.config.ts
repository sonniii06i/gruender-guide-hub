import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Stabile Core-Vendor-Chunks für langfristiges Browser-Caching.
        // Schwere optionale Bibliotheken (jspdf, pdf-lib, html2canvas, recharts, lucide-icons)
        // bleiben bewusst aus manualChunks raus, damit Rollup sie niemals als gemeinsamen
        // CommonJS-Host in den Initial-Preload von index.html zieht, sondern erst auf der
        // jeweiligen Lazy-Route lädt.
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("/react/") || id.includes("/react-dom/") || id.includes("/scheduler/")) return "vendor-react";
          if (id.includes("/react-router")) return "vendor-router";
          if (id.includes("/@supabase/")) return "vendor-supabase";
          if (id.includes("/@tanstack/")) return "vendor-query";
          return undefined;
        },
      },
    },
  },
}));
