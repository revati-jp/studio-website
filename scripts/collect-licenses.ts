import * as fs from "node:fs/promises";
import { getDependencies, getLicenseText } from "@quantco/pnpm-licenses";
import type { Dependency } from "../src/types";

const dependencies = await getDependencies(
  { prod: true },
  {
    stdin: false,
    stdout: false,
    inputFile: undefined,
    outputFile: "",
  },
);

const output: Dependency[] = [];
for (const dependency of dependencies) {
  let licenseText: string | undefined;
  try {
    const result = await getLicenseText(dependency);
    licenseText = result.licenseText;
  } catch {
    console.warn(
      `License text not found for ${dependency.name}@${dependency.version}. Skipping license text.`,
    );
  }

  if (dependency.homepage && !isSafeHomepageURL(dependency.homepage)) {
    console.error(
      `Unsafe homepage URL found: "${dependency.homepage}" (${dependency.name}@${dependency.version})`,
    );
    process.exit(1);
  }

  output.push({
    name: dependency.name,
    version: dependency.version,
    license: dependency.license,
    homepage: dependency.homepage,
    licenseText,
  });
}

output.sort((a, b) => a.version.localeCompare(b.version));
output.sort((a, b) => a.name.localeCompare(b.name));

await fs.mkdir(".astro", { recursive: true });
await fs.writeFile(".astro/licenses.json", JSON.stringify(output, null, 2));

console.log("Successfully generated .astro/licenses.json!");

function isSafeHomepageURL(inputURL: string): boolean {
  const url = new URL(inputURL);
  return ["http:", "https:"].includes(url.protocol);
}
