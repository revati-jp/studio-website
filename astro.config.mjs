// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import svelte from "@astrojs/svelte";
import license from "rollup-plugin-license";

const ALLOWED_LICENSES = ["BSD-3-Clause", "MIT", "ISC"];

const VERIFIED_UNLICENSED_PACKAGES = [
  // BSD-3-Clause
  // https://www.npmjs.com/package/@threejs-kit/instanced-sprite-mesh?activeTab=code
  "@threejs-kit/instanced-sprite-mesh",
];

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Noto Sans JP",
      cssVariable: "--font-noto-sans-jp",
      weights: [400, 500, 900],
      subsets: ["japanese", "latin"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Montserrat",
      cssVariable: "--font-montserrat",
      weights: [400, 800],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Special Gothic Expanded One",
      cssVariable: "--font-special-gothic-expanded-one",
      weights: [400],
    },
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: [
            '@use "/src/styles/_color.scss" as *;',
            '@use "/src/styles/_mixin.scss" as *;',
          ].join("\n"),
        },
      },
    },
    plugins: [
      license({
        thirdParty: {
          allow: {
            test: ({ name, license }) => {
              if (license === undefined || license === null || license === "")
                return (
                  name !== null && VERIFIED_UNLICENSED_PACKAGES.includes(name)
                );
              return ALLOWED_LICENSES.some(
                (allowed) => license === allowed || license === `(${allowed})`,
              );
            },
            failOnUnlicensed: true,
            failOnViolation: true,
          },
          output: () => {},
        },
      }),
    ],
  },

  integrations: [svelte()],
});
