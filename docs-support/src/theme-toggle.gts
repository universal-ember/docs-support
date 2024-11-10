import { on } from '@ember/modifier';

import { Switch } from 'ember-primitives';
import { colorScheme } from 'ember-primitives/color-scheme';

import { Moon, Sun } from './icons.gts';

function toggleTheme() {
  if (colorScheme.current === 'dark') {
    colorScheme.update('light');
  } else {
    colorScheme.update('dark');
  }
}

function isDark() {
  return colorScheme.current === 'dark';
}

export const ThemeToggle = <template>
  <Switch id='site-theme-toggle' as |s|>
    <s.Control
      name='color-scheme'
      checked={{(isDark)}}
      {{on 'change' toggleTheme}}
    />
    <s.Label>
      <span class='sr-only'>Toggle between light and dark mode</span>
      {{!
        🎵 It's raining, it's pouring, ... 🎵
        https://www.youtube.com/watch?v=ll5ykbAumD4
      }}
      <Moon class='fill-sky-400' />
      <Sun class='fill-yellow-400' />
      <span class='ball'></span>
    </s.Label>
  </Switch>
</template>;
