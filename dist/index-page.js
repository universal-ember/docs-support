import { Hero } from 'ember-primitives/layout/hero';
import './index-page.css';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const IndexPage = setComponentTemplate(precompileTemplate("\n  <Hero class=\"shadow-xl shadow-slate-900/5 gradient-background\">\n    <header class=\"absolute md:sticky right-0 bottom-0 md:top-0 z-50 p-4 flex items-center\">\n      {{yield to=\"header\"}}\n    </header>\n\n    <div class=\"h-full flex flex-col gap-8 justify-center items-center\">\n      <div style=\"width: 66%; margin: 0 auto; transform: translateY(-20%);\" class=\"grid gap-4\">\n        <h1 style=\"filter: drop-shadow(3px 5px 0px rgba(0, 0, 0, 0.4));\">\n          {{yield to=\"logo\"}}\n        </h1>\n        <p class=\"italic text-white w-full md:w-1/2 mx-auto\">\n          {{yield to=\"tagline\"}}\n        </p>\n      </div>\n      {{yield to=\"callToAction\"}}\n    </div>\n  </Hero>\n\n  {{yield to=\"content\"}}\n\n  <hr />\n  <footer style=\"padding: 3rem; width: 66%;\" class=\"mx-auto gap-12 flex-wrap flex justify-between\">\n    {{yield to=\"footer\"}}\n  </footer>\n", {
  strictMode: true,
  scope: () => ({
    Hero
  })
}), templateOnly());

export { IndexPage };
//# sourceMappingURL=index-page.js.map
