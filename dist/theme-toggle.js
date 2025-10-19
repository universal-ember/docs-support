import './theme-toggle.css';
import { on } from '@ember/modifier';
import { Switch } from 'ember-primitives';
import { colorScheme } from 'ember-primitives/color-scheme';
import { Sun, Moon } from './icons.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

function toggleTheme() {
  if (colorScheme.current === 'dark') {
    colorScheme.update('light');
  } else {
    colorScheme.update('dark');
  }
}
function isDark() {
  return colorScheme.current === 'dark';
}
const ThemeToggle = setComponentTemplate(precompileTemplate("\n  <Switch class=\"site-theme-toggle\" as |s|>\n    <s.Control name=\"color-scheme\" checked={{(isDark)}} {{on \"change\" toggleTheme}} />\n    <s.Label>\n      <span class=\"sr-only\">Toggle between light and dark mode</span>\n      {{!--\n        \uD83C\uDFB5 It's raining, it's pouring, ... \uD83C\uDFB5\n        https://www.youtube.com/watch?v=ll5ykbAumD4\n      --}}\n      <Moon class=\"fill-sky-400\" />\n      <Sun class=\"fill-yellow-400\" />\n      <span class=\"ball\"></span>\n    </s.Label>\n  </Switch>\n", {
  strictMode: true,
  scope: () => ({
    Switch,
    isDark,
    on,
    toggleTheme,
    Moon,
    Sun
  })
}), templateOnly());

export { ThemeToggle };
//# sourceMappingURL=theme-toggle.js.map
