import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import polyfillKaiOS from "./scripts/vite";

// https://vitejs.dev/config/
export default defineConfig({
	base: "",
	plugins: [preact(), polyfillKaiOS()],
	server: {
		port: 3000,
	},
	resolve: {
		alias: {
			react: "preact/compat",
			"react-dom/test-utils": "preact/test-utils",
			"react-dom": "preact/compat", // Must be below test-utils
			"react/jsx-runtime": "preact/jsx-runtime",
		},
	},
	build: {
		target: "es6",
		cssTarget: "firefox48",
		cssCodeSplit: false,
		modulePreload: false,
		assetsInlineLimit: 0,
		minify: true,
		ssr: false,
		rollupOptions: {
			output: {
				format: "iife",
			},
		},

		outDir: "./docs",
	},
	worker: {
		plugins: [polyfillKaiOS()],
	},
});
