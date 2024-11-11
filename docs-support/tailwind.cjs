'use strict';

/**
 * Thanks, past self
 * https://github.com/CrowdStrike/ember-oss-docs/blob/main/ember-oss-docs/tailwind.cjs
 */
const path = require('path');

const { fontFamily } = require('tailwindcss/defaultTheme');

const files = '**/*.{js,ts,hbs,gjs,gts,html}';
const sourceEntries = '{app,src}';

function config(root) {
  const appRoot = path.join(root);

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
    ...Object.keys(packageJson.dependencies).map((depName) => {
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
    plugins: [require('@tailwindcss/typography')],
  };
}

module.exports = { config };
