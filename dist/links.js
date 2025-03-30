import { ExternalLink } from 'ember-primitives/components/external-link';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const linkClasses = `
  text-sm font-semibold
  dark:text-sky-400
  no-underline shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))]
  hover:[--tw-prose-underline-size:6px]
  dark:[--tw-prose-background:theme(colors.slate.900)]
  dark:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))]
  dark:hover:[--tw-prose-underline-size:6px]
`;
const InternalLink = setComponentTemplate(precompileTemplate("\n  <a class={{linkClasses}} href=\"#\" ...attributes>\n    {{yield}}\n  </a>\n", {
  strictMode: true,
  scope: () => ({
    linkClasses
  })
}), templateOnly());
const Link = setComponentTemplate(precompileTemplate("\n  <ExternalLink class={{linkClasses}} ...attributes>\n    {{yield}}\n  </ExternalLink>\n", {
  strictMode: true,
  scope: () => ({
    ExternalLink,
    linkClasses
  })
}), templateOnly());

export { InternalLink, Link };
//# sourceMappingURL=links.js.map
