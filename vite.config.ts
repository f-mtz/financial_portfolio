import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    historyApiFallback: true,
    host: "::",
    port: 8080,
  },
    build: {
    assetsInclude: ['**/*.jpg', '**/*.png'], // Inclui tipos de imagem
    assetsDir: 'assets',                     // Pasta de saída
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
}));

