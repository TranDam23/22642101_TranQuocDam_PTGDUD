import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/socket.io": {
        target: "http://localhost:3002",
        changeOrigin: true,
        ws: true, // Cho phép proxy WebSocket
      },
    },
  },
});
