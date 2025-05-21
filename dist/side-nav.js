import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { service } from '@ember/service';
import { sentenceCase } from 'change-case';
import { link } from 'ember-primitives/helpers';
import { PageNav } from 'kolay/components';
import { getAnchor } from 'should-handle-link';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';
import { g, i } from 'decorator-transforms/runtime';

function fixWords(text) {
  switch (text.toLowerCase()) {
    case 'ui':
      return 'UI';
    case 'iframe':
      return 'IFrame';
    default:
      return text;
  }
}
const joinUrl = (...strs) => {
  let prefix = strs[0]?.startsWith('/') ? '/' : '';
  return prefix + strs.map(s => s.replace(/^\//, '').replace(/\/$/, '')).filter(x => !!x).join('/');
};
/**
 * Converts 1-2-hyphenated-thing
 * to
 *   Hyphenated Thing
 */
const titleize = str => {
  return str.split(/-|\s/).filter(Boolean).filter(text => !text.match(/^[\d]+$/)).map(text => `${text[0]?.toLocaleUpperCase()}${text.slice(1, text.length)}`).map(text => fixWords(text)).join(' ').split('.')[0] || '';
};
function nameFor(x) {
  if ('componentName' in x) {
    return `${x.componentName}`;
  }
  let page = x;
  return page.title ? page.title : sentenceCase(page.name);
}
const asComponent = str => {
  return `<${str.split('.')[0]?.replaceAll(' ', '')} />`;
};
const isComponents = str => str === 'components';
const SectionLink = setComponentTemplate(precompileTemplate("\n    {{#let (link @href) as |l|}}\n      <a href={{@href}} class=\"font-medium font-display\n          {{if l.isActive \"text-sky-500\" \"text-slate-900 hover:text-slate-600 dark:text-white  dark:hover:text-slate-300\"}}\" {{on \"click\" l.handleClick}} ...attributes>\n        {{#if (isComponents @name)}}\n          {{asComponent (titleize @name)}}\n        {{else}}\n          {{titleize @name}}\n        {{/if}}\n      </a>\n    {{/let}}\n  ", {
  strictMode: true,
  scope: () => ({
    link,
    on,
    isComponents,
    asComponent,
    titleize
  })
}), templateOnly());
const SubSectionLink = setComponentTemplate(precompileTemplate("\n    {{#let (link @href) as |l|}}\n      <a href={{@href}} class=\"block w-full before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full\n          {{if l.isActive \"font-semibold text-sky-500 before:bg-sky-500\" \"text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300\"}}\" {{on \"click\" l.handleClick}} ...attributes>\n        {{#if (isComponents @name)}}\n          {{asComponent (titleize @name)}}\n        {{else}}\n          {{titleize @name}}\n        {{/if}}\n      </a>\n    {{/let}}\n  ", {
  strictMode: true,
  scope: () => ({
    link,
    on,
    isComponents,
    asComponent,
    titleize
  })
}), templateOnly());
class SideNav extends Component {
  static {
    g(this.prototype, "docs", [service('kolay/docs')]);
  }
  #docs = (i(this, "docs"), void 0);
  static {
    g(this.prototype, "router", [service('router')]);
  }
  #router = (i(this, "router"), void 0);
  get humanSelected() {
    let path = this.docs.selected?.path;
    if (!path) return undefined;
    return path.split('/').filter(Boolean).map(titleize).join(' / ');
  }
  get rootUrl() {
    return this.router.rootURL;
  }
  closeNav = event => {
    if (!getAnchor(event)) return;
    this.args.onClick?.();
  };
  /**
  *
  * This nav needs an aria-label to get around
  *  "Ensure landmarks are unique"
  *  because some demos render navs, and it's important that those
  *  demos are as simple as possible.
  *
  *
  *  nav isn't actually made in to an interactive element,
  *  it's an event delegation handler.
  *  The links themselves remain the actual interactive elements.
  */
  static {
    setComponentTemplate(precompileTemplate("\n    <aside class=\"bg-white dark:bg-slate-900\" ...attributes>\n      <PageNav aria-label=\"Main Navigation\">\n        <:page as |x|>\n          <SubSectionLink @href={{joinUrl this.rootUrl x.page.path}} @name={{nameFor x.page}} {{on \"click\" this.closeNav}} />\n        </:page>\n\n        <:collection as |x|>\n          {{#if x.index}}\n            <SectionLink @href={{joinUrl this.rootUrl x.index.page.path}} @name={{titleize x.collection.name}} {{on \"click\" this.closeNav}} />\n          {{else}}\n            <h2>\n              {{titleize x.collection.name}}\n            </h2>\n          {{/if}}\n        </:collection>\n      </PageNav>\n    </aside>\n  ", {
      strictMode: true,
      scope: () => ({
        PageNav,
        SubSectionLink,
        joinUrl,
        nameFor,
        on,
        SectionLink,
        titleize
      })
    }), this);
  }
}

export { SideNav };
//# sourceMappingURL=side-nav.js.map
