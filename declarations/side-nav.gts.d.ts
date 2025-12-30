import Component from '@glimmer/component';
import type RouterService from '@ember/routing/router-service';
import type { DocsService } from 'kolay';
export declare class SideNav extends Component<{
    Element: HTMLElement;
    Args: {
        onClick?: () => void;
    };
}> {
    docs: DocsService;
    router: RouterService;
    get humanSelected(): string | undefined;
    get rootUrl(): string;
    closeNav: (event: Event) => void;
}
//# sourceMappingURL=side-nav.gts.d.ts.map