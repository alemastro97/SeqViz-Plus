import * as React from "react";
import SeqViz, { SeqVizProps } from "./SeqViz";
import "./SeqViz.css";
import enzymes from "./enzymes";
/**
 * Export a React component directly for React-based development
 */
export { SeqViz, enzymes as Enzymes };
export default SeqViz;
export type { SeqVizProps } from "./SeqViz";
/**
 * Return a Viewer object with three properties:
 *  - `render` to an HTML element
 *  - `setState(options)` to update the viewer's internal state
 *  - `renderToString` to return an HTML representation of the Viewer
 */
declare const Viewer: (element: string | HTMLElement | undefined, options: SeqVizProps) => {
    render: () => React.CElement<SeqVizProps, SeqViz>;
    renderToString: () => string;
    setState: (state: SeqVizProps) => React.CElement<SeqVizProps, SeqViz>;
} | undefined;
export { Viewer };
