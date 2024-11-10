import type { TOC } from '@ember/component/template-only';

/**
 * TODO: use CSS, this is silly.
 */
const proseClasses = `
  prose prose-slate max-w-none
  dark:prose-invert dark:text-slate-400
  prose-th:table-cell
  prose-headings:inline-block
  prose-headings:scroll-mt-28
  prose-headings:font-display
  prose-headings:font-normal
  lg:prose-headings:scroll-mt-[8.5rem]
  prose-h1:text-3xl

  prose-lead:text-slate-500
  dark:prose-lead:text-slate-400

  prose-a:font-semibold
  dark:prose-a:text-sky-400
  prose-a:no-underline
  prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,2px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))]
  hover:prose-a:[--tw-prose-underline-size:3px]
  dark:[--tw-prose-background:theme(colors.slate.900)]
  dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))]
  dark:hover:prose-a:[--tw-prose-underline-size:6px]
  prose-pre:rounded-xl prose-pre:bg-slate-900
  prose-pre:shadow-lg
  dark:prose-pre:bg-slate-800/60
  dark:prose-pre:shadow-none
  dark:prose-pre:ring-1
  dark:prose-pre:ring-slate-300/10
  dark:prose-hr:border-slate-800
  dark:prose-code:text-slate-50
`;

export const Article: TOC<{ Element: HTMLElement; Blocks: { default: [] } }> = <template>
  <article class={{proseClasses}} ...attributes>
    {{yield}}
  </article>
</template>;
