import { LightBulb } from './icons.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const Callout = setComponentTemplate(precompileTemplate("\n  <div class=\"flex p-6 my-8 rounded-3xl bg-sky-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10\">\n    <LightBulb class=\"flex-none w-8 h-8\" />\n    <div class=\"flex-auto min-w-0 ml-4\">\n      <div class=\"text-sky-800 [--tw-prose-background:theme(colors.sky.50)] prose-a:text-sky-900 dark:text-slate-50 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0\">\n        {{yield}}\n      </div>\n    </div>\n  </div>\n", {
  strictMode: true,
  scope: () => ({
    LightBulb
  })
}), templateOnly());

export { Callout };
//# sourceMappingURL=callout.js.map
