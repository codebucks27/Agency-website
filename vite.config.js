import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import autoprefixer from "autoprefixer";
import { parse } from "dotenv";
import dotenvExpand from "dotenv-expand";
import { defineConfig } from "vitest/config";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const packageJson = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

/**
 * Keep CRA's highest-first precedence, including its exclusion of .env.local
 * in tests. Expansion uses CRA's compatible parser and recursive expander.
 * @param {string} mode
 */
function loadPublicEnvironment(mode) {
  /** @type {Record<string, string>} */
  const environment = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (typeof value === "string") environment[key] = value;
  }
  const files = [
    `.env.${mode}.local`,
    ...(mode === "test" ? [] : [".env.local"]),
    `.env.${mode}`,
    ".env",
  ];

  for (const file of files) {
    const path = resolve(projectRoot, file);
    if (existsSync(path)) {
      const parsed = parse(readFileSync(path));
      // CRA's dotenv.config populated the entire file before expansion, so
      // forward/nested references can see later keys in this same file.
      for (const [key, value] of Object.entries(parsed)) {
        if (environment[key] === undefined) environment[key] = value;
      }
      // dotenv-expand 5 accepts either process.env or an empty environment.
      // Scope its synchronous call to this private copy, then restore the
      // inherited object before Vite or any other config code runs.
      const inheritedEnvironment = process.env;
      try {
        process.env = environment;
        dotenvExpand({ parsed });
      } finally {
        process.env = inheritedEnvironment;
      }
    }
  }

  return environment;
}

/**
 * CRA uses the full PUBLIC_URL for production and its pathname in development;
 * homepage contributes only its pathname unless it is explicitly relative.
 * @param {string | undefined} publicUrl
 * @param {string | undefined} homepage
 * @param {boolean} development
 */
function publicBase(publicUrl, homepage, development) {
  const value = publicUrl || homepage;
  if (!value) return "/";
  const withSlash = value.endsWith("/") ? value : `${value}/`;
  const pathname = new URL(withSlash, "https://create-react-app.dev").pathname;
  if (development) return value.startsWith(".") ? "/" : pathname;
  return publicUrl || value.startsWith(".") ? withSlash : pathname;
}

export default defineConfig(({ command, mode, isPreview }) => {
  const nodeEnv = mode === "test" || process.env.VITEST
    ? "test"
    : command === "build" || isPreview ? "production" : "development";
  process.env.NODE_ENV = nodeEnv;

  const environment = loadPublicEnvironment(mode);
  const base = publicBase(environment.PUBLIC_URL, packageJson.homepage, nodeEnv === "development");
  /** @type {Record<string, string>} */
  const publicEnvironment = { NODE_ENV: nodeEnv, PUBLIC_URL: base.slice(0, -1) };

  for (const [key, value] of Object.entries(environment)) {
    if (/^REACT_APP_/i.test(key) && typeof value === "string") {
      publicEnvironment[key] = value;
    }
  }

  return {
    appType: "spa",
    base,
    // This config loads env files itself; Vite must not load them a second time.
    envDir: false,
    envPrefix: "REACT_APP_",
    define: {
      "process.env": JSON.stringify(publicEnvironment),
      ...Object.fromEntries(Object.entries(publicEnvironment).map(([key, value]) => [
        `import.meta.env.${key}`, JSON.stringify(value),
      ])),
    },
    plugins: [
      react(),
      {
        name: "cra-public-html-environment",
        transformIndexHtml: {
          order: "pre",
          handler: (html) => html.replace(/%([\w]+)%/g, (token, key) => publicEnvironment[key] ?? token),
        },
      },
      legacy({
        targets: packageJson.browserslist.production,
        modernTargets: packageJson.browserslist.production,
        modernPolyfills: true,
      }),
    ],
    css: { postcss: { plugins: [autoprefixer()] } },
    server: { port: 3000 },
    build: { outDir: "build", sourcemap: true },
    test: {
      environment: "jsdom",
      setupFiles: ["./src/setupTests.js"],
      include: ["src/**/*.test.{js,jsx}"],
      css: true,
      restoreMocks: true,
    },
  };
});
