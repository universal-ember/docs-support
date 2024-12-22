import Component from '@glimmer/component';
import type { DocsService } from 'kolay';
export declare class SideNav extends Component<{
    Element: HTMLElement;
    Args: {
        onClick?: () => void;
    };
}> {
    docs: DocsService;
    get humanSelected(): string | undefined;
    closeNav: (event: Event) => void;
}
//# sourceMappingURL=side-nav.gts.d.ts.map