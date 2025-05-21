import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const OopsError = setComponentTemplate(precompileTemplate("\n  <div data-page-error class=\"dark:text-white text:slate-900\" style=\"border: 1px solid red; padding: 1rem; word-break: break-all;\">\n    <h1>Oops!</h1><br />\n    {{@error}}\n\n    <br />\n    <br />\n    {{yield}}\n  </div>\n", {
  strictMode: true
}), templateOnly());

export { OopsError };
//# sourceMappingURL=errors.js.map
