import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: "0.0.0.0", // This will expose the server to the network
    host: true, // listen to all network interface not just localhost  ex: calling someone with their phone number
    allowedHosts: true, // Accept requests from any host ex: calling someone with their name
    port: 5173,
  },
});
