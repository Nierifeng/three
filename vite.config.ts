import { ConfigEnv, UserConfigExport, defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const { VITE_PORT, VITE_PUBLIC_PATH } = loadEnv(mode, process.cwd());
  console.log(VITE_PORT, VITE_PUBLIC_PATH, mode);

  return defineConfig({
    plugins: [vue()],
    base: VITE_PUBLIC_PATH,
    server: {
      port: Number(VITE_PORT),
      https: false,
    },
    build: {
      sourcemap: command === "serve",
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          assetFileNames: "static/[name].[ext]",
        },
      },
    },
  });
};

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   base:'/three/'
// })
