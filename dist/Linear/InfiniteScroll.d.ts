import CentralIndexContext from '../centralIndexContext';
import { Size } from '../elements';
import * as React from 'react';
interface InfiniteScrollProps {
    blockHeights: number[];
    bpsPerBlock: number;
    seqBlocks: JSX.Element[];
    size: Size;
    totalHeight: number;
    seqBlocksCompare: any;
    seqBlocksSymbols: any;
    alignment: boolean;
}
interface InfiniteScrollState {
    centralIndex: number;
    visibleBlocks: number[];
}
/**
 * InfiniteScroll is a wrapper around the seqBlocks. Renders only the seqBlocks that are
 * within the range of the current dom viewerport
 *
 * This component should sense scroll events and, during one, recheck which sequences are shown.
 */
export declare class InfiniteScroll extends React.PureComponent<InfiniteScrollProps, InfiniteScrollState> {
    static contextType: React.Context<{
        circular: number;
        linear: number;
        setCentralIndex: (_: "LINEAR" | "CIRCULAR", __: number) => void;
    }>;
    static context: React.ContextType<typeof CentralIndexContext>;
    context: React.ContextType<typeof CentralIndexContext>;
    scroller: React.RefObject<HTMLDivElement>;
    insideDOM: React.RefObject<HTMLDivElement>;
    timeoutID: any;
    constructor(props: InfiniteScrollProps);
    componentDidMount: () => void;
    componentDidUpdate: (prevProps: InfiniteScrollProps, prevState: InfiniteScrollState, snapshot: any) => void;
    componentWillUnmount: () => void;
    /**
     * more info at: https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate
     */
    getSnapshotBeforeUpdate: (prevProps: InfiniteScrollProps) => {
        blockIndex: number;
        blockY: number;
    };
    /**
     * Scroll to centralIndex. Likely from circular clicking on an element
     * that should then be scrolled to in linear
     */
    scrollToCentralIndex: () => void;
    /**
     * the component has mounted to the DOM or updated, and the window should be scrolled downwards
     * so that the central index is visible
     */
    restoreSnapshot: (snapshot: any) => void;
    /**
     * check whether the blocks that should be visible have changed from what's in state,
     * update if so
     */
    handleScrollOrResize: () => void;
    incrementScroller: (incAmount: any) => void;
    stopIncrementingScroller: () => void;
    /**
     * handleMouseOver is for detecting when the user is performing a drag event
     * at the very top or the very bottom of DIV. If they are, this starts
     * a incrementing the div's scrollTop (ie an upward or downward scroll event) that's
     * terminated by the user leaving the scroll area
     *
     * The rate of the scrollTop is proportional to how far from the top or the
     * bottom the user is (within [-40, 0] for top, and [0, 40] for bottom)
     */
    handleMouseOver: (e: React.MouseEvent<HTMLDivElement>) => void;
    render(): JSX.Element;
}
export {};
