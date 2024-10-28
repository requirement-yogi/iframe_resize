// CSS modules
declare module "*.module.css" {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module "*.module.scss" {
    const classes: { readonly [key: string]: string };
    export default classes;
}

// Images
declare module "*.png" {
    const src: string;
    export default src;
}
declare module "*.jpg" {
    const src: string;
    export default src;
}
declare module "*.jpeg" {
    const src: string;
    export default src;
}
declare module "*.bmp" {
    const src: string;
    export default src;
}
declare module "*.gif" {
    const src: string;
    export default src;
}
declare module "*.svg" {
    import React from "react";
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

// Atlassian Connect
declare namespace AP {
    namespace context {
        function getContext<T>(): Promise<T>;
    }
}

// Environment variables
interface Window {
    __ENV: Record<string, string>;
}

// JSX control statements
/* eslint-disable jsx-control-statements/jsx-jcs-no-undef */
declare const If: React.FC<{ condition: boolean }>;
declare const Choose: React.FC;
declare const When: React.FC<{ condition: boolean }>;
declare const Otherwise: React.FC;
/* eslint-enable jsx-control-statements/jsx-jcs-no-undef */
