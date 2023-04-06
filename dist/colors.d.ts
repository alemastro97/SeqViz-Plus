/**
 * a color pallete of colors (for LinearSeq right now)\
 * generated using:
 * https://material.io/color/#!/?view.left=0&view.right=0&primary.color=FFCC80
 */
export declare const COLORS: string[];
export declare const COLOR_BORDER_MAP: {
    "#6B81FF": string;
    "#85A6FF": string;
    "#8CDEBD": string;
    "#8FDE8C": string;
    "#9DEAED": string;
    "#C59CFF": string;
    "#CFF283": string;
    "#F07F7F": string;
    "#F099F7": string;
    "#F0A3CE": string;
    "#F7C672": string;
    "#FAA887": string;
};
export declare const chooseRandomColor: (colors?: string[]) => string;
/** get an "indexed" color from the colors array */
export declare const colorByIndex: (i: number, colors?: string[]) => string;
/** get an "indexed" color from the colors array */
export declare const borderColorByIndex: (i: number) => any;
/** darken a HEX color by 50% */
export declare const darkerColor: (c: any) => any;
