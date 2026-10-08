import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    // Render-Tests großer Seiten (Anbieter, Event-Radar) brauchen unter voller Parallel-Last
    // gelegentlich mehr als die Standard-5-s; einzeln laufen sie in < 1 s.
    testTimeout: 20000,
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
