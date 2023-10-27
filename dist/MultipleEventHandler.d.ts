import CentralIndexContext from "./centralIndexContext";
import { Selection } from "./selectionContext";
import * as React from "react";
export interface EventsHandlerProps {
    bpsPerBlock: number;
    children: any;
    aagrouping?: boolean;
    showDetails?: boolean;
    copyEvent: (e: React.KeyboardEvent<HTMLElement>) => boolean;
    handleMouseEvent: (e: any) => void;
    selection: Selection;
    seq: string[];
    name: string;
    nameToCompare?: string;
    setSelection: (selection: Selection) => void;
}
export interface EventsHandlerState {
    rightClickMenu: Boolean;
    xFloatingMenu: number;
    yFloatingMenu: number;
}
/**
 * EventHandler handles the routing of all events, including keypresses, mouse clicks, etc.
 */
export declare class MultipleEventHandler extends React.PureComponent<EventsHandlerProps> {
    static contextType: React.Context<{
        circular: number;
        linear: number;
        setCentralIndex: (_: "LINEAR" | "CIRCULAR", __: number) => void;
    }>;
    static context: React.ContextType<typeof CentralIndexContext>;
    context: React.ContextType<typeof CentralIndexContext>;
    clickedOnce: EventTarget | null;
    clickedTwice: EventTarget | null;
    state: {
        rightClickMenu: boolean;
        xFloatingMenu: number;
        yFloatingMenu: number;
    };
    /**
     * action handler for a keyboard keypresses.
     */
    handleKeyPress: (e: React.KeyboardEvent<HTMLElement>) => void;
    /**
     * maps a keypress to an interaction (String)
     *
     * ["All", "Copy", "Up", "Right", "Down", "Left"]
     */
    keypressMap: (e: React.KeyboardEvent<HTMLElement>) => string | null;
    /**
     * Respond to any of:
     * 	All: cmd + A, select all
     * 	Copy: cmd + C, copy
     * 	Up, Right, Down, Left: some directional movement of the cursor
     */
    handleSeqInteraction: (type: any) => Promise<void>;
    /**
     * Copy the current sequence selection to the user's clipboard
     */
    handleCopy: () => void;
    /**
     * select all of the sequence
     */
    selectAllHotkey: () => void;
    handleTripleClick: () => void;
    resetClicked: (...args: any[]) => void;
    /**
     * if the contextMenu button is clicked, check whether it was clicked
     * over a noteworthy element, for which db mutations have been written.
     *
     * if it is, mutate the contextMenu to account for those potential interactions
     * and pass on the click. Otherwise, do nothing
     *
     * if it is a regular click, pass on as normal
     */
    handleMouseEvent: (e: React.MouseEvent) => void;
    closeMenu: () => void;
    render: () => JSX.Element;
}
