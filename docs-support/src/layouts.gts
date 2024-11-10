// @ts-expect-error - no types are provided for ember-mobile-menu
import MenuWrapper from 'ember-mobile-menu/components/mobile-menu-wrapper';

import { hash } from '@ember/helper';

import { Article } from './article.gts';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

import { Page } from 'kolay/components';
import { Link } from './links.gts';

const Toggle: TOC<{
  Args: {
    toggle: ComponentLike<{ Blocks: { default: [] } }>;
  };
}> = <template>
  <@toggle>
    <Menu class='w-6 h-6 stroke-slate-500' />
  </@toggle>
</template>;

export const Layout: TOC<{
  Blocks: {
    nav: [options?: { close: () => void }];
    content: [];
    header: [toggle: ComponentLike];
  };
}> = <template>
  <MenuWrapper as |mmw|>
    <mmw.MobileMenu @mode='push' @maxWidth={{300}} as |mm|>
      {{yield (hash close=mm.actions.close) to='nav'}}
    </mmw.MobileMenu>

    <mmw.Content>
      {{yield (component Toggle toggle=mmw.Toggle) to='header'}}

      <div class='outer-content'>
        {{yield to='nav'}}

        <main
          class='relative grid justify-center flex-auto w-full mx-auto max-w-8xl'
        >
          {{yield to='content'}}
        </main>
      </div>
    </mmw.Content>
  </MenuWrapper>
</template>;

// Removes the App Shell / welcome UI
// before initial rending and chunk loading finishes
function removeLoader() {
  document.querySelector('#initial-loader')?.remove();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function resetScroll(..._args: unknown[]) {
  document.querySelector('html')?.scrollTo(0, 0);
}

export const PageLayout: TOC<{
  Args: {};
  Blocks: {
    nav: [];
    header: [];
    editLink: [];
    error: [error: string];
  };
}> = <template>
  <Layout>
    <:nav>{{yield to='nav'}}</:nav>
    <:header>{{yield to='header'}}</:header>
    <:content>
      <section
        data-main-scroll-container
        class='flex-auto max-w-2xl min-w-0 py-4 lg:max-w-none'
      >
        <Article>
          <Page>
            {{! TODO: we need a pending state here
                  right now this is ignored, because the :pending
                  block doesn't exist.
            }}
            {{! -- <:pending>
              <div class="h-full w-full"></div>
            </:pending>
        }}

            <:error as |error|>
              <section>
                {{yield error to='error'}}
              </section>
            </:error>

            <:success as |prose|>
              <prose />
              {{(removeLoader)}}
              {{! this is probably really bad, and anti-patterny
                  but ember doesn't have a good way to have libraries
                  tie in to the URL without a bunch of setup -- which is maybe fine?
                  needs some experimenting -- there is a bit of a disconnect with
                  deriving data from the URL, and the timing of the model hooks.
                  It might be possible to have an afterModel hook wait until the page is
                  compiled.
                  (that's why we have async state, because we're compiling, not loading)
              }}
              {{resetScroll prose}}
            </:success>
          </Page>
        </Article>

        {{#if (has-block 'editLink')}}

          <div
            class='flex justify-end pt-6 mt-12 border-t border-slate-200 dark:border-slate-800'
          >

            {{yield EditLink to='editLink'}}
          </div>
        {{/if}}
      </section>
    </:content>

  </Layout>
</template>;

const EditLink: TOC<{ Args: { href: string }; Blocks: { default: [] } }> =
  <template>
    <Link class='edit-page flex' href={{@href}}>
      {{yield}}
    </Link>
  </template>;
