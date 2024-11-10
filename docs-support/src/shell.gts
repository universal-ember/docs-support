import type { TOC } from '@ember/component/template-only';
import 'ember-mobile-menu/themes/android';
import './shell.css';

import { colorScheme } from 'ember-primitives/color-scheme';

export const Shell: TOC<{ Blocks: { default: [] } }> = <template>
  {{(syncBodyClass)}}
  {{yield}}
</template>;

function isDark() {
  return colorScheme.current === 'dark';
}

function syncBodyClass() {
  if (isDark()) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}
