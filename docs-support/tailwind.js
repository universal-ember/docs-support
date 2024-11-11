import path from 'node:path';
import { readPackageUp } from 'read-package-up';
import { packageUp } from 'package-up';
import { fontFamily } from 'tailwindcss/defaultTheme.js';
import typography from '@tailwindcss/typography';

/**
 * Thanks, past self
 * https://github.com/CrowdStrike/ember-oss-docs/blob/main/ember-oss-docs/tailwind.cjs
 */
const files = '**/*.{js,ts,hbs,gjs,gts,html}';
const sourceEntries = '{app,src}';

export async function config(root) {
  const appManifestPath = await packageUp(root);
  const appPackageJson = await readPackageUp(root);
  const appRoot = path.dirname(appManifestPath);

  const contentPaths = [
    `${appRoot}/${sourceEntries}/${files}`,

    /**
     * Also check if addons/libraries contain any tailwind classes
     * that we need to include
     *
     * This may be overkill for the typical app,
     * but for our use case, documentation apps, it should be fine.
     * (The risk here is scanning too many files and potentially
     *   running out of files watchers (tho, this isn't a problem on linux haha))
     */
    ...Object.keys(appPackageJson.dependencies).map((depName) => {
      const packagePath = path.dirname(require.resolve(depName, { paths: [appRoot] }));

      return `${packagePath}/${files}`;
    }),
  ];

  /** @type {import('tailwindcss').Config} */
  return {
    content: [...contentPaths],
    darkMode: 'selector',
    theme: {
      extend: {
        maxWidth: {
          '8xl': '88rem',
        },
        fontFamily: {
          sans: ['InterVariable', ...fontFamily.sans],
          display: ['Lexend', { fontFeatureSettings: '"ss01"' }],
        },
      },
    },
    plugins: [typography],
  };
}
