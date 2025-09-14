import type { TOC } from '@ember/component/template-only';
export declare const PageLayout: TOC<{
    Blocks: {
        logoLink: [];
        topRight: [];
        editLink: [typeof EditLink];
        error: [error: string];
    };
}>;
declare const EditLink: TOC<{
    Args: {
        href: string;
    };
    Blocks: {
        default: [];
    };
}>;
export declare const TopRight: TOC<{
    Blocks: {
        default: [];
    };
}>;
export {};
//# sourceMappingURL=page-layout.gts.d.ts.map