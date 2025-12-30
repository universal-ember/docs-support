import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const Text = setComponentTemplate(precompileTemplate("\n  <span class=\"dark:text-white text:slate-900\">{{yield}}</span>\n", {
  strictMode: true
}), templateOnly());

export { Text };
//# sourceMappingURL=text.js.map
