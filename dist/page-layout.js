import { cell } from 'ember-resources';
import { modifier } from 'ember-modifier';
import { Page } from 'kolay/components';
import { ResponsiveMenuLayout } from './menu-layout.js';
import { Link } from './links.js';
import { Article } from './article.js';
import { ThemeToggle } from './theme-toggle.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

function removeLoader() {
  document.querySelector('#initial-loader')?.remove();
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function resetScroll(..._args) {
  document.querySelector('html')?.scrollTo(0, 0);
}
const isScrolled = cell(false);
const onWindowScroll = modifier(() => {
  function onScroll() {
    isScrolled.current = window.scrollY > 0;
  }
  onScroll();
  window.addEventListener('scroll', onScroll, {
    passive: true
  });
  return () => {
    window.removeEventListener('scroll', onScroll);
  };
});
const PageLayout = setComponentTemplate(precompileTemplate("\n  <ResponsiveMenuLayout>\n    <:header as |Toggle|>\n      <header class=\"sticky top-0 z-50 transition duration-500 shadow-md shadow-slate-900/5 dark:shadow-none bg-white/95\n          {{if isScrolled.current \"dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75\" \"dark:bg-slate-900/95\"}}\" {{onWindowScroll}}>\n        <div class=\"outer-content flex flex-none flex-wrap items-center justify-between py-4\">\n          <div class=\"flex mr-6 lg:hidden\">\n            <Toggle />\n          </div>\n          <div class=\"relative flex items-center flex-grow basis-0\">\n            <a href=\"/\" aria-label=\"Home page\">\n              {{yield to=\"logoLink\"}}\n            </a>\n          </div>\n          {{!--\n            If we ever have a search bar\n              <div class=\"mr-6 -my-5 sm:mr-8 md:mr-0\">\n                  input here\n              </div>\n            --}}\n          <TopRight>\n            {{yield to=\"topRight\"}}\n          </TopRight>\n        </div>\n      </header>\n    </:header>\n    <:content>\n      <section data-main-scroll-container class=\"flex-auto max-w-2xl min-w-0 py-4 lg:max-w-none\">\n        <Article>\n          <Page>\n            <:pending>\n              <div class=\"fixed top-12 p-4 rounded z-50 transition border border-slate-800 duration-500 shadow-xl shadow-slate-900/5 bg-white/95 'dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'\">\n                Loading, Compiling, etc\n              </div>\n            </:pending>\n\n            <:error as |error|>\n              <section>\n                {{yield error to=\"error\"}}\n              </section>\n            </:error>\n\n            <:success as |prose|>\n              <prose />\n              {{(removeLoader)}}\n              {{!-- this is probably really bad, and anti-patterny\n                  but ember doesn't have a good way to have libraries\n                  tie in to the URL without a bunch of setup -- which is maybe fine?\n                  needs some experimenting -- there is a bit of a disconnect with\n                  deriving data from the URL, and the timing of the model hooks.\n                  It might be possible to have an afterModel hook wait until the page is\n                  compiled.\n                  (that's why we have async state, because we're compiling, not loading)\n              --}}\n              {{resetScroll prose}}\n            </:success>\n          </Page>\n        </Article>\n\n        {{#if (has-block \"editLink\")}}\n\n          <div class=\"flex justify-end pt-6 mt-12 border-t border-slate-200 dark:border-slate-800\">\n\n            {{yield EditLink to=\"editLink\"}}\n          </div>\n        {{/if}}\n      </section>\n    </:content>\n\n  </ResponsiveMenuLayout>\n", {
  strictMode: true,
  scope: () => ({
    ResponsiveMenuLayout,
    isScrolled,
    onWindowScroll,
    TopRight,
    Article,
    Page,
    removeLoader,
    resetScroll,
    EditLink
  })
}), templateOnly());
const EditLink = setComponentTemplate(precompileTemplate("\n  <Link class=\"edit-page flex\" href={{@href}}>\n    {{yield}}\n  </Link>\n", {
  strictMode: true,
  scope: () => ({
    Link
  })
}), templateOnly());
const TopRight = setComponentTemplate(precompileTemplate("\n  <div class=\"relative flex justify-end gap-6 basis-0 sm:gap-8 md:flex-grow\">\n    <ThemeToggle />\n    {{yield}}\n  </div>\n", {
  strictMode: true,
  scope: () => ({
    ThemeToggle
  })
}), templateOnly());

export { PageLayout, TopRight };
//# sourceMappingURL=page-layout.js.map
