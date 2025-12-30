import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const H2 = setComponentTemplate(precompileTemplate("\n  <h2 class=\"text-3xl\">{{yield}}</h2>\n", {
  strictMode: true
}), templateOnly());

export { H2 };
//# sourceMappingURL=h2.js.map
