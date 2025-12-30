import 'ember-mobile-menu/themes/android';
import './site-css/site.css';
import './site-css/components.css';
import './site-css/featured-demo.css';
import './site-css/shiki.css';
import './site-css/shell.css';
import { colorScheme } from 'ember-primitives/color-scheme';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const Shell = setComponentTemplate(precompileTemplate("\n  {{(syncBodyClass)}}\n  {{yield}}\n", {
  strictMode: true,
  scope: () => ({
    syncBodyClass
  })
}), templateOnly());
function isDark() {
  return colorScheme.current === 'dark';
}
function syncBodyClass() {
  if (isDark()) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}

export { Shell };
//# sourceMappingURL=shell.js.map
