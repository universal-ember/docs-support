import MenuWrapper from 'ember-mobile-menu/components/mobile-menu-wrapper';
import { Menu } from './icons.js';
import { SideNav } from './side-nav.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

// @ts-expect-error - no types are provided for ember-mobile-menu

const Toggle = setComponentTemplate(precompileTemplate("\n  <@toggle>\n    <Menu class=\"w-6 h-6 stroke-slate-500\" />\n  </@toggle>\n", {
  strictMode: true,
  scope: () => ({
    Menu
  })
}), templateOnly());
const ResponsiveMenuLayout = setComponentTemplate(precompileTemplate("\n  <MenuWrapper as |mmw|>\n    <mmw.MobileMenu @mode=\"push\" @maxWidth={{300}} as |mm|>\n      <SideNav @onClick={{mm.actions.close}} />\n    </mmw.MobileMenu>\n\n    <mmw.Content>\n      {{yield (component Toggle toggle=mmw.Toggle) to=\"header\"}}\n\n      <div class=\"outer-content\">\n        <SideNav />\n\n        <main class=\"relative grid justify-center flex-auto w-full mx-auto max-w-8xl\">\n          {{yield to=\"content\"}}\n        </main>\n      </div>\n    </mmw.Content>\n  </MenuWrapper>\n", {
  strictMode: true,
  scope: () => ({
    MenuWrapper,
    SideNav,
    Toggle
  })
}), templateOnly());

export { ResponsiveMenuLayout };
//# sourceMappingURL=menu-layout.js.map
