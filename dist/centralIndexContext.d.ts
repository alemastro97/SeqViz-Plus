import * as React from "react";
/** The "central index" is used to scroll the linear or circular viewer when you click on an annotation */
declare const CentralIndexContext: React.Context<{
    circular: number;
    linear: number;
    setCentralIndex: (_: "LINEAR" | "CIRCULAR", __: number) => void;
}>;
export default CentralIndexContext;
