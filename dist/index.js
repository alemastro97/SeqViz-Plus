/*!
 * seqviz-plus - 2.0.9
 * provided and maintained by Lattice Automation (https://latticeautomation.com/)
 * LICENSE MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("seqviz-plus", [], factory);
	else if(typeof exports === 'object')
		exports["seqviz-plus"] = factory();
	else
		root["seqviz-plus"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Viewer = exports.Enzymes = exports.SeqViz = void 0;
var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(2);
var server_1 = __webpack_require__(3);
var SeqViz_1 = __webpack_require__(4);
exports.SeqViz = SeqViz_1.default;
__webpack_require__(44);
var enzymes_1 = __webpack_require__(42);
exports.Enzymes = enzymes_1.default;
exports["default"] = SeqViz_1.default;
/**
 * Return a Viewer object with three properties:
 *  - `render` to an HTML element
 *  - `setState(options)` to update the viewer's internal state
 *  - `renderToString` to return an HTML representation of the Viewer
 */
var Viewer = function (element, options) {
    if (element === void 0) { element = "root"; }
    // used to keep track of whether to re-render after a "set" call
    var rendered = false;
    // get the HTML element by ID or use as is if passed directly
    var domElement;
    if (!document)
        return;
    if (typeof element === "string") {
        if (document.getElementById(element)) {
            domElement = document.getElementById(element);
        }
        else {
            throw new Error("Failed to find an element with ID: ".concat(element));
        }
    }
    else {
        domElement = element;
    }
    var viewer = React.createElement(SeqViz_1.default, options, null);
    /**
     * Render the Viewer to the element passed
     */
    var render = function () {
        rendered = true;
        ReactDOM.render(viewer, domElement);
        return viewer;
    };
    /**
     * Return an HTML string representation of the viewer
     */
    var renderToString = function () {
        return (0, server_1.renderToString)(viewer);
    };
    /**
     * Update the viewer with new settings. Re-renders if render was already called.
     */
    var setState = function (state) {
        options = __assign(__assign({}, options), state);
        viewer = React.createElement(SeqViz_1.default, options, null);
        if (rendered) {
            ReactDOM.render(viewer, domElement);
        }
        return viewer;
    };
    return {
        render: render,
        renderToString: renderToString,
        setState: setState,
    };
};
exports.Viewer = Viewer;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("react-dom");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("react-dom/server");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var React = __webpack_require__(1);
var seqparse_1 = __webpack_require__(5);
var SeqViewerContainer_1 = __webpack_require__(6);
var colors_1 = __webpack_require__(13);
var digest_1 = __webpack_require__(41);
var isEqual_1 = __webpack_require__(11);
var search_1 = __webpack_require__(43);
var sequence_1 = __webpack_require__(24);
/**
 * SeqViz is a viewer for rendering sequences in a linear and/or circular viewer.
 */
var SeqViz = /** @class */ (function (_super) {
    __extends(SeqViz, _super);
    function SeqViz(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Re-parse props to state if there are changes to:
         * - seq/accession/file (this probably means we need to update the rest)
         * - search input changes
         * - enzymes change
         * - annotations
         *
         * This is needed for the parse(accession) call that makes an async fetch to a remote repository
         * https://reactjs.org/docs/react-component.html#componentdidupdate
         */
        _this.componentDidUpdate = function (
        // previous props
        _a, 
        // previous state
        _b) {
            var _c = _a.accession, accession = _c === void 0 ? "" : _c, annotations = _a.annotations, enzymes = _a.enzymes, enzymesCustom = _a.enzymesCustom, file = _a.file, search = _a.search;
            var seq = _b.seq, seqType = _b.seqType;
            // New accession or file provided, fetch and/or parse.
            if (accession !== _this.props.accession || file !== _this.props.file || (_this.props.seq && _this.props.seq !== seq)) {
                var input = _this.parseInput();
                _this.setState(__assign(__assign({ annotations: input.annotations, compSeq: input.compSeq, name: input.name, seq: input.seq, seqType: input.seqType }, _this.search(_this.props, input.seq)), _this.cut(input.seq, input.seqType)));
                return;
            }
            // New search parameters provided.
            if (search &&
                (!_this.props.search || search.query !== _this.props.search.query || search.mismatch !== _this.props.search.mismatch)) {
                _this.setState(_this.search(_this.props, seq)); // new search parameters
            }
            // New digest parameters.
            if (!(0, isEqual_1.isEqual)(enzymes, _this.props.enzymes) || !(0, isEqual_1.isEqual)(enzymesCustom, _this.props.enzymesCustom)) {
                _this.setState(_this.cut(seq, seqType));
            }
            // New annotations provided.
            if (!(0, isEqual_1.isEqual)(annotations, _this.props.annotations)) {
                _this.setState({
                    annotations: _this.parseAnnotations(_this.props.annotations, _this.props.seq),
                });
            }
        };
        /**
         * If a file is provided or a sequence is provided, parse it and its annotations.
         * If an accession is provided, query a remote repository and parse the sequence and annotations.
         */
        _this.parseInput = function (props) {
            var _a = props || _this.props, annotations = _a.annotations, compSeq = _a.compSeq, file = _a.file, _b = _a.name, name = _b === void 0 ? "" : _b, seq = _a.seq;
            if (file) {
                // Parse a sequence file
                var parseOptions = {};
                if (file && file instanceof File) {
                    parseOptions.fileName = file.name;
                }
                var parsed = (0, seqparse_1.parseFile)(file.toString(), parseOptions);
                if (parsed.length) {
                    var seqType = (0, sequence_1.guessType)(parsed[0].seq);
                    return {
                        annotations: _this.parseAnnotations(parsed[0].annotations, parsed[0].seq),
                        compSeq: (0, sequence_1.complement)(parsed[0].seq, seqType).compSeq,
                        name: parsed[0].name,
                        seq: parsed[0].seq,
                        seqType: seqType,
                    };
                }
            }
            else if (seq) {
                // Fill in default props just using the seq
                var seqType = (0, sequence_1.guessType)(seq);
                return {
                    annotations: _this.parseAnnotations(annotations, seq),
                    compSeq: compSeq || (0, sequence_1.complement)(seq, seqType).compSeq,
                    name: name,
                    seq: seq,
                    seqType: seqType,
                };
            }
            return {
                annotations: [],
                compSeq: "",
                name: "",
                seq: "",
                seqType: "dna",
            };
        };
        /**
         * Search for the query sequence in the part sequence, set in state.
         */
        _this.search = function (props, seq) {
            var onSearch = props.onSearch, searchProp = props.search, seqType = props.seqType;
            if (!searchProp || !seq || !seq.length) {
                return { search: [] };
            }
            var results = (0, search_1.default)(searchProp.query, searchProp.mismatch, seq, seqType || (0, sequence_1.guessType)(seq));
            if (_this.state && (0, isEqual_1.isEqual)(results, _this.state.search)) {
                return { search: _this.state.search };
            }
            onSearch && onSearch(results);
            return { search: results };
        };
        /**
         * Find and save enzymes' cut-site locations.
         */
        _this.cut = function (seq, seqType) { return ({
            cutSites: (0, digest_1.default)(seq || "", seqType, _this.props.enzymes || [], _this.props.enzymesCustom || {}),
        }); };
        /**
         * Fix annotations to add unique ids, fix directionality, and modulo the start and end of each.
         */
        _this.parseAnnotations = function (annotations, seq) {
            if (annotations === void 0) { annotations = null; }
            if (seq === void 0) { seq = ""; }
            return (annotations || []).map(function (a, i) { return (__assign(__assign({ id: (0, sequence_1.randomID)() }, a), { color: a.color || (0, colors_1.colorByIndex)(i, colors_1.COLORS), direction: (0, sequence_1.directionality)(a.direction), end: a.end % (seq.length + 1), start: a.start % (seq.length + 1) })); });
        };
        var seq = _this.parseInput(props);
        _this.state = __assign(__assign(__assign({}, seq), _this.search(props, seq.seq)), _this.cut(seq.seq, seq.seqType));
        return _this;
    }
    /**
     * If an accession was provided, query it here.
     */
    SeqViz.prototype.componentDidMount = function () {
        var _this = this;
        var accession = this.props.accession;
        if (!accession || !accession.length) {
            return;
        }
        // Query an accession to a sequence
        (0, seqparse_1.default)(accession, { cors: true }).then(function (parsed) {
            var seqType = (0, sequence_1.guessType)(parsed.seq);
            _this.setState(__assign(__assign({ annotations: _this.parseAnnotations(parsed.annotations, parsed.seq), compSeq: (0, sequence_1.complement)(parsed.seq, seqType).compSeq, name: parsed.name, seq: parsed.seq, seqType: seqType }, _this.search(_this.props, parsed.seq)), _this.cut(parsed.seq, seqType)));
        });
    };
    /** Log caught errors. */
    SeqViz.prototype.componentDidCatch = function (error, errorInfo) {
        console.error("Error caught in SeqViz: %v %v", error, errorInfo);
    };
    SeqViz.prototype.render = function () {
        var _this = this;
        var _a = this.props, highlightedRegions = _a.highlightedRegions, highlights = _a.highlights, showComplement = _a.showComplement, showIndex = _a.showIndex, style = _a.style, zoom = _a.zoom, viewer = _a.viewer;
        var translations = this.props.translations;
        var _b = this.state, compSeq = _b.compSeq, seq = _b.seq, seqType = _b.seqType;
        // This is an unfortunate bit of seq checking. We could get a seq directly or from a file parsed to a part.
        if (!seq)
            return React.createElement("div", { className: "la-vz-seqviz" });
        // If the seqType is aa, make the entire sequence the "translation"
        if (seqType === "aa") {
            // TODO: during some grand future refactor, make this cleaner and more transparent to the user
            translations = [{ direction: 1, end: seq.length, start: 0 }];
        }
        // Since all the props are optional, we need to parse them to defaults.
        var props = {
            bpColors: this.props.bpColors || {},
            copyEvent: this.props.copyEvent || (function () { return false; }),
            cutSites: this.state.cutSites,
            highlights: (highlights || []).concat(highlightedRegions || []).map(function (h, i) { return (__assign(__assign({}, h), { direction: 1, end: h.end % (seq.length + 1), id: "highlight-".concat(i, "-").concat(h.start, "-").concat(h.end), name: "", start: h.start % (seq.length + 1) })); }),
            onSelection: (function (selection) {
                // @ts-ignore
                _this.setState({ selection: selection });
            }),
            rotateOnScroll: !!this.props.rotateOnScroll,
            showComplement: (!!compSeq && (typeof showComplement !== "undefined" ? showComplement : true)) || false,
            showIndex: !!showIndex,
            translations: (translations || []).map(function (t) { return ({
                direction: t.direction ? (t.direction < 0 ? -1 : 1) : 1,
                end: viewer !== 'alignment' ? t.start + Math.floor((t.end - t.start) / 3) * 3 : t.end,
                start: t.start % seq.length,
            }); }),
            viewer: this.props.viewer || "both",
            zoom: {
                circular: typeof (zoom === null || zoom === void 0 ? void 0 : zoom.circular) == "number" ? Math.min(Math.max(zoom.circular, 0), 100) : 0,
                linear: typeof (zoom === null || zoom === void 0 ? void 0 : zoom.linear) == "number" ? Math.min(Math.max(zoom.linear, 0), 100) : 50,
            },
        };
        return (React.createElement("div", { className: "la-vz-seqviz", "data-testid": "la-vz-seqviz", style: style },
            React.createElement(SeqViewerContainer_1.default, __assign({}, this.props, props, this.state))));
    };
    SeqViz.defaultProps = {
        accession: "",
        annotations: [],
        backbone: "",
        bpColors: {},
        colors: [],
        compSeq: "",
        copyEvent: function (e) { return e.key === "c" && (e.metaKey || e.ctrlKey); },
        enzymes: [],
        enzymesCustom: {},
        name: "",
        onSearch: function (_) { return null; },
        onSelection: function (_) { return null; },
        rotateOnScroll: true,
        search: { mismatch: 0, query: "" },
        seq: "",
        seqToCompare: "",
        colorized: true,
        showComplement: true,
        showIndex: true,
        style: {},
        translations: [],
        viewer: "both",
        zoom: { circular: 0, linear: 50 },
    };
    return SeqViz;
}(React.Component));
exports["default"] = SeqViz;


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("seqparse");

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHAR_WIDTH = void 0;
var React = __webpack_require__(1);
var react_resize_detector_1 = __webpack_require__(7);
var Circular_1 = __webpack_require__(8);
var EventHandler_1 = __webpack_require__(22);
var MultipleEventHandler_1 = __webpack_require__(26);
var Linear_1 = __webpack_require__(28);
var SelectionHandler_1 = __webpack_require__(38);
var MultipleSequenceSelectionHandler_1 = __webpack_require__(39);
var centralIndexContext_1 = __webpack_require__(9);
var isEqual_1 = __webpack_require__(11);
var selectionContext_1 = __webpack_require__(21);
var Alignment_1 = __webpack_require__(40);
/**
 * This is the width in pixels of a character that's 12px
 * This will need to change whenever the css of the plasmid viewer text changes
 * just divide the width of some rectangular text by it's number of characters
 */
exports.CHAR_WIDTH = 7.2;
/**
 * a parent sequence viewer component that holds whatever is common between
 * the linear and circular sequence viewers. The Header is an example
 */
var SeqViewerContainer = /** @class */ (function (_super) {
    __extends(SeqViewerContainer, _super);
    function SeqViewerContainer(props) {
        var _this = _super.call(this, props) || this;
        /** this is here because the size listener is returning a new "size" prop every time */
        _this.shouldComponentUpdate = function (nextProps, nextState) {
            return !(0, isEqual_1.isEqual)(nextProps, _this.props) || !(0, isEqual_1.isEqual)(nextState, _this.state);
        };
        /**
         * Update the central index of the linear or circular viewer.
         */
        _this.setCentralIndex = function (type, value) {
            var _a;
            if (type !== "LINEAR" && type !== "CIRCULAR") {
                throw new Error("Unknown central index type: ".concat(type));
            }
            if (_this.state.centralIndex[type.toLowerCase()] === value) {
                return; // nothing changed
            }
            _this.setState({ centralIndex: __assign(__assign({}, _this.state.centralIndex), (_a = {}, _a[type.toLowerCase()] = value, _a)) });
        };
        /**
         * Update selection in state. Should only be performed from handlers/selection.jsx
         */
        _this.setSelection = function (selection) {
            // If the user passed a selection, do not update our state here
            var parent = selection.parent, ref = selection.ref, rest = __rest(selection, ["parent", "ref"]);
            if (!_this.props.selection)
                _this.setState({ selection: selection });
            if (_this.props.onSelection)
                _this.props.onSelection(rest);
        };
        /**
         * Returns the selection that was either a prop (optional) or the selection maintained in state.
         */
        _this.getSelection = function (state, prop) {
            if (prop) {
                return __assign(__assign({}, prop), { clockwise: typeof prop.clockwise === "undefined" || !!prop.clockwise, type: "" });
            }
            return state;
        };
        /**
         * given the width of the screen, and the current zoom, how many basepairs should be displayed
         * on the screen at a given time and what should their size be
         */
        _this.linearProps = function () {
            var _a = _this.props, seq = _a.seq, seqType = _a.seqType, viewer = _a.viewer, colorized = _a.colorized;
            var size = _this.props.testSize || { height: _this.props.height, width: _this.props.width };
            var zoom = _this.props.zoom.linear;
            // hack
            if (viewer.includes("both")) {
                size.width /= 2;
            }
            var seqFontSize = Math.min(Math.round(zoom * 0.1 + 9.5), 18); // max 18px
            // otherwise the sequence needs to be cut into smaller subsequences
            // a sliding scale in width related to the degree of zoom currently active
            var bpsPerBlock = Math.round((size.width / seqFontSize) * 1.4) || 1; // width / 1 * seqFontSize
            if (seqType === "aa" && colorized) {
                bpsPerBlock = Math.round(bpsPerBlock / 3); // more space for each amino acid
            }
            if (zoom <= 5) {
                bpsPerBlock *= 3;
            }
            else if (zoom <= 10) {
                // really ramp up the range, since at this zoom it'll just be a line
                bpsPerBlock *= 2;
            }
            else if (zoom > 70) {
                // keep font height the same but scale number of bps in one row
                bpsPerBlock = Math.round(bpsPerBlock * (70 / zoom));
            }
            bpsPerBlock = Math.max(1, bpsPerBlock);
            if (size.width && bpsPerBlock < seq.length) {
                size.width -= 28; // -28 px for the padding (10px) + scroll bar (18px)
            }
            var charWidth = size.width / bpsPerBlock; // width of each basepair
            var lineHeight = 1.4 * seqFontSize; // aspect ratio is 1.4 for roboto mono
            var elementHeight = 16; // the height, in pixels, of annotations, ORFs, etc
            return __assign(__assign({}, _this.props), { bpsPerBlock: bpsPerBlock, charWidth: charWidth, elementHeight: elementHeight, lineHeight: lineHeight, seqFontSize: seqFontSize, size: size, zoom: { linear: zoom } });
        };
        _this.alignmentProps = function () {
            var _a = _this.props, seq = _a.seq, seqType = _a.seqType, colorized = _a.colorized;
            var size = _this.props.testSize || { height: _this.props.height, width: _this.props.width };
            var zoom = _this.props.zoom.linear;
            var seqFontSize = Math.min(Math.round(zoom * 0.1 + 9.5), 18); // max 18px
            // otherwise the sequence needs to be cut into smaller subsequences
            // a sliding scale in width related to the degree of zoom currently active
            var bpsPerBlock = Math.round((size.width / seqFontSize) * 1.4) || 1; // width / 1 * seqFontSize
            if (seqType === "aa" && colorized) {
                bpsPerBlock = Math.round(bpsPerBlock / 3); // more space for each amino acid
            }
            if (zoom <= 5) {
                bpsPerBlock *= 3;
            }
            else if (zoom <= 10) {
                // really ramp up the range, since at this zoom it'll just be a line
                bpsPerBlock *= 2;
            }
            else if (zoom > 70) {
                // keep font height the same but scale number of bps in one row
                bpsPerBlock = Math.round(bpsPerBlock * (70 / zoom));
            }
            bpsPerBlock = Math.max(1, bpsPerBlock);
            if (size.width && bpsPerBlock < seq.length) {
                size.width -= 28; // -28 px for the padding (10px) + scroll bar (18px)
            }
            var charWidth = size.width / bpsPerBlock; // width of each basepair
            var lineHeight = 1.4 * seqFontSize; // aspect ratio is 1.4 for roboto mono
            var elementHeight = 16; // the height, in pixels, of annotations, ORFs, etc
            return __assign(__assign({}, _this.props), { bpsPerBlock: bpsPerBlock, charWidth: charWidth, elementHeight: elementHeight, lineHeight: lineHeight, seqFontSize: seqFontSize, size: size, zoom: { linear: zoom } });
        };
        /**
         * given the length of the sequence and the dimensions of the viewbox, how should
         * zoom of the plasmid viewer affect the radius of the circular viewer and its vertical shift
         *
         * minPixelPerBP = s / 50 where
         * s = theta * radius where
         * radius = h / 2 + c ^ 2 / 8 h    (https://en.wikipedia.org/wiki/Circular_segment)
         * and theta = 50 / seqLength
         */
        _this.circularProps = function () {
            var _a = _this.props, seqLength = _a.seq.length, viewer = _a.viewer;
            var size = _this.props.testSize || { height: _this.props.height, width: _this.props.width };
            var zoom = _this.props.zoom.circular;
            // hack
            if (viewer.includes("both")) {
                size.width /= 2;
            }
            var center = {
                x: size.width / 2,
                y: size.height / 2,
            };
            var limitingDim = Math.min(size.height, size.width);
            var exp = 0.83; // exponent... greater exp leads to flatter curve (c in fig)
            var beta = Math.exp(Math.log(50 / seqLength) / -(Math.pow(100, exp))); // beta coefficient (b in fig)
            var bpsOnArc = seqLength * beta; // calc using the full expression
            // scale the radius so only (bpsOnArc) many bps are shown
            var radius = limitingDim * 0.34;
            return __assign(__assign({}, _this.props), { bpsOnArc: bpsOnArc, center: center, radius: radius === 0 ? 1 : radius, size: size, yDiff: 0, zoom: { circular: zoom } });
        };
        _this.state = {
            centralIndex: {
                circular: 0,
                linear: 0,
                setCentralIndex: _this.setCentralIndex,
            },
            selection: _this.getSelection(selectionContext_1.defaultSelection, props.selection),
        };
        return _this;
    }
    SeqViewerContainer.prototype.render = function () {
        var _this = this;
        var _a = this.props, selectionProp = _a.selection, seq = _a.seq, viewer = _a.viewer, seqToCompare = _a.seqToCompare;
        var _b = this.state, centralIndex = _b.centralIndex, selection = _b.selection;
        var linearProps = this.linearProps();
        var circularProps = this.circularProps();
        var alignmentProps = this.alignmentProps();
        return (React.createElement("div", { ref: this.props.targetRef, className: "la-vz-viewer-container", "data-testid": "la-vz-viewer-container" },
            React.createElement(centralIndexContext_1.default.Provider, { value: centralIndex },
                React.createElement(selectionContext_1.default.Provider, { value: this.getSelection(selection, selectionProp) },
                    viewer !== 'alignment' && React.createElement(SelectionHandler_1.default, { bpsPerBlock: linearProps.bpsPerBlock, center: circularProps.center, centralIndex: centralIndex.circular, seq: seq, setCentralIndex: this.setCentralIndex, setSelection: this.setSelection, yDiff: circularProps.yDiff }, function (inputRef, handleMouseEvent, onUnmount) { return (React.createElement(EventHandler_1.EventHandler, { bpsPerBlock: linearProps.bpsPerBlock, copyEvent: _this.props.copyEvent, handleMouseEvent: handleMouseEvent, selection: selection, seq: seq, setSelection: _this.setSelection },
                        viewer === "linear" && (React.createElement(Linear_1.default, __assign({}, linearProps, { handleMouseEvent: handleMouseEvent, inputRef: inputRef, onUnmount: onUnmount }))),
                        viewer === "circular" && (React.createElement(Circular_1.default, __assign({}, circularProps, { handleMouseEvent: handleMouseEvent, inputRef: inputRef, onUnmount: onUnmount }))),
                        viewer === "both" && (React.createElement(React.Fragment, null,
                            React.createElement(Circular_1.default, __assign({}, circularProps, { handleMouseEvent: handleMouseEvent, inputRef: inputRef, onUnmount: onUnmount })),
                            React.createElement(Linear_1.default, __assign({}, linearProps, { handleMouseEvent: handleMouseEvent, inputRef: inputRef, onUnmount: onUnmount })))),
                        viewer === "both_flip" && (React.createElement(React.Fragment, null,
                            React.createElement(Linear_1.default, __assign({}, linearProps, { handleMouseEvent: handleMouseEvent, inputRef: inputRef, onUnmount: onUnmount })),
                            React.createElement(Circular_1.default, __assign({}, circularProps, { handleMouseEvent: handleMouseEvent, inputRef: inputRef, onUnmount: onUnmount })))))); }),
                    viewer === 'alignment' &&
                        React.createElement(React.Fragment, null,
                            seq.length !== seqToCompare.length && React.createElement("div", { className: "warning-banner" }, "Attention: the two inserted sequences do not have the same length"),
                            React.createElement(MultipleSequenceSelectionHandler_1.default, { bpsPerBlock: linearProps.bpsPerBlock, center: circularProps.center, centralIndex: centralIndex.circular, seq: [seq, seqToCompare], setCentralIndex: this.setCentralIndex, setSelection: this.setSelection, yDiff: circularProps.yDiff }, function (inputRef, handleMouseEvent, onUnmount) { return (React.createElement(MultipleEventHandler_1.MultipleEventHandler, { bpsPerBlock: linearProps.bpsPerBlock, copyEvent: _this.props.copyEvent, handleMouseEvent: handleMouseEvent, selection: selection, seq: [seq, seqToCompare], setSelection: _this.setSelection },
                                React.createElement(Alignment_1.default, __assign({}, alignmentProps, { handleMouseEvent: handleMouseEvent, inputRef: inputRef, onUnmount: onUnmount })))); }))))));
    };
    return SeqViewerContainer;
}(React.Component));
exports["default"] = (0, react_resize_detector_1.withResizeDetector)(SeqViewerContainer);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("react-resize-detector");

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Arc = exports.RENDER_SEQ_LENGTH_CUTOFF = void 0;
var React = __webpack_require__(1);
var SeqViewerContainer_1 = __webpack_require__(6);
var centralIndexContext_1 = __webpack_require__(9);
var elementsToRows_1 = __webpack_require__(10);
var isEqual_1 = __webpack_require__(11);
var Annotations_1 = __webpack_require__(12);
var CutSites_1 = __webpack_require__(15);
var Find_1 = __webpack_require__(16);
var Index_1 = __webpack_require__(17);
var Labels_1 = __webpack_require__(18);
var Selection_1 = __webpack_require__(20);
/** Sequence length cutoff below which the circular viewer's sequence won't be rendered. */
exports.RENDER_SEQ_LENGTH_CUTOFF = 250;
/** Circular is a circular viewer that contains a bunch of arcs. */
var Circular = /** @class */ (function (_super) {
    __extends(Circular, _super);
    function Circular(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Deep equality comparison
         */
        _this.shouldComponentUpdate = function (nextProps) { return !(0, isEqual_1.isEqual)(nextProps, _this.props); };
        /**
         * Return the SVG rotation transformation needed to put a child element in the
         * correct location around the plasmid. This func makes use of the centralIndex field in parent state
         * to rotate the plasmid viewer.
         */
        _this.getRotation = function (index) {
            var center = _this.props.center;
            var seqLength = _this.state.seqLength;
            var centralIndex = _this.context.circular;
            // how many degrees should it be rotated?
            var adjustedIndex = index - centralIndex;
            var startPerc = adjustedIndex / seqLength;
            var degrees = startPerc * 360;
            return "rotate(".concat(degrees || 0, ", ").concat(center.x, ", ").concat(center.y, ")");
        };
        /**
         * Given an index along the plasmid and its radius, find the coordinate
         * will be used in many of the child components
         *
         * In general, this is for lines and labels
         */
        _this.findCoor = function (index, radius, rotate) {
            var center = _this.props.center;
            var seqLength = _this.state.seqLength;
            var rotatedIndex = rotate ? index - _this.context.circular : index;
            var lengthPerc = rotatedIndex / seqLength;
            var lengthPercCentered = lengthPerc - 0.25;
            var radians = lengthPercCentered * Math.PI * 2;
            var xAdjust = Math.cos(radians) * radius;
            var yAdjust = Math.sin(radians) * radius;
            return {
                x: center.x + xAdjust,
                y: center.y + yAdjust,
            };
        };
        /**
         * Given a coordinate, and the degrees to rotate it, find the new coordinate
         * (assuming that the rotation is around the center)
         *
         * in general this is for text and arcs
         */
        _this.rotateCoor = function (coor, degrees) {
            var center = _this.props.center;
            // find coordinate's current angle
            var angle = degrees * (Math.PI / 180); // degrees to radians
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);
            // find the new coordinate
            var xDiff = coor.x - center.x;
            var yDiff = coor.y - center.y;
            var cosX = cos * xDiff;
            var cosY = cos * yDiff;
            var sinX = sin * xDiff;
            var sinY = sin * yDiff;
            var xAdjust = cosX - sinY;
            var yAdjust = sinX + cosY;
            return {
                x: center.x + xAdjust,
                y: center.y + yAdjust,
            };
        };
        /**
         * Given an inner and outer radius, and the length of the element, return the
         * path for an arc that circles the plasmid. The optional paramters sweepFWD and sweepREV
         * are needed for selection arcs (where the direction of the arc isn't known beforehand)
         * and arrowFWD and arrowREV are needed for annotations, where there may be directionality
         */
        _this.genArc = function (args) {
            var arrowFWD = args.arrowFWD, arrowREV = args.arrowREV, innerRadius = args.innerRadius, largeArc = args.largeArc, length = args.length, outerRadius = args.outerRadius, sweepFWD = args.sweepFWD;
            var radius = _this.props.radius;
            var _a = _this.state, lineHeight = _a.lineHeight, seqLength = _a.seqLength;
            var offset = args.offset === undefined ? 0 : args.offset;
            // build up the six default coordinates
            var leftBottom = _this.findCoor(offset, innerRadius);
            var leftTop = _this.findCoor(offset, outerRadius);
            var rightBottom = _this.findCoor(length + offset, innerRadius);
            var rightTop = _this.findCoor(length + offset, outerRadius);
            var leftArrow = "";
            var rightArrow = "";
            // create arrows by making a midpoint along edge and shifting corners inwards
            if (arrowREV || arrowFWD) {
                // one quarter of lineHeight in px is the shift inward for arrows
                var inwardShift = lineHeight / 4;
                // given the arc length (inwardShift) and the radius (from SeqViewer),
                // we can find the degrees to rotate the corners
                var centralAngle = inwardShift / radius;
                // Math.min here is to make sure the arrow it's larger than the element
                var centralAnglePerc = Math.min(centralAngle / 2, length / seqLength);
                var centralAngleDeg = centralAnglePerc * 360;
                if (arrowREV) {
                    leftBottom = _this.rotateCoor(leftBottom, centralAngleDeg);
                    leftTop = _this.rotateCoor(leftTop, centralAngleDeg);
                    var lArrowC = _this.findCoor(0, (innerRadius + outerRadius) / 2);
                    leftArrow = "L ".concat(lArrowC.x, " ").concat(lArrowC.y);
                }
                else {
                    rightBottom = _this.rotateCoor(rightBottom, -centralAngleDeg);
                    rightTop = _this.rotateCoor(rightTop, -centralAngleDeg);
                    var rArrowC = _this.findCoor(length, (innerRadius + outerRadius) / 2);
                    rightArrow = "L ".concat(rArrowC.x, " ").concat(rArrowC.y);
                }
            }
            var lArc = largeArc ? 1 : 0;
            var sFlagF = sweepFWD ? 1 : 0;
            var sFlagR = sweepFWD ? 0 : 1;
            return "M ".concat(rightBottom.x, " ").concat(rightBottom.y, "\n      A ").concat(innerRadius, " ").concat(innerRadius, ", 0, ").concat(lArc, ", ").concat(sFlagR, ", ").concat(leftBottom.x, " ").concat(leftBottom.y, "\n      L ").concat(leftBottom.x, " ").concat(leftBottom.y, "\n      ").concat(leftArrow, "\n      L ").concat(leftTop.x, " ").concat(leftTop.y, "\n      A ").concat(outerRadius, " ").concat(outerRadius, ", 0, ").concat(lArc, ", ").concat(sFlagF, ", ").concat(rightTop.x, " ").concat(rightTop.y, "\n      ").concat(rightArrow, "\n      Z");
        };
        /**
         * handle a scroll event and, if it's a CIRCULAR viewer, update the
         * current central index
         */
        _this.handleScrollEvent = function (e) {
            var _a = _this.props, rotateOnScroll = _a.rotateOnScroll, seq = _a.seq;
            if (!rotateOnScroll)
                return;
            // a "large scroll" (1000) should rotate through 20% of the plasmid
            var delta = seq.length * (e.deltaY / 5000);
            delta = Math.floor(delta);
            // must scroll by *some* amount (only matters for very small plasmids)
            if (delta === 0) {
                if (e.deltaY > 0)
                    delta = 1;
                else
                    delta = -1;
            }
            var newCentralIndex = _this.context.circular + delta;
            newCentralIndex = (newCentralIndex + seq.length) % seq.length;
            _this.context.setCentralIndex("CIRCULAR", newCentralIndex);
        };
        _this.state = {
            annotationsInRows: [],
            inlinedLabels: [],
            lineHeight: 0,
            outerLabels: [],
            seqLength: 0,
        };
        return _this;
    }
    Circular.prototype.render = function () {
        var _a = this.props, center = _a.center, compSeq = _a.compSeq, cutSites = _a.cutSites, handleMouseEvent = _a.handleMouseEvent, inputRef = _a.inputRef, name = _a.name, radius = _a.radius, search = _a.search, seq = _a.seq, showIndex = _a.showIndex, size = _a.size, yDiff = _a.yDiff;
        var _b = this.state, annotationsInRows = _b.annotationsInRows, inlinedLabels = _b.inlinedLabels, lineHeight = _b.lineHeight, outerLabels = _b.outerLabels, seqLength = _b.seqLength;
        var _c = this, findCoor = _c.findCoor, genArc = _c.genArc, getRotation = _c.getRotation, rotateCoor = _c.rotateCoor;
        // props contains props used in many/all children
        var props = {
            center: center,
            findCoor: findCoor,
            genArc: genArc,
            getRotation: getRotation,
            inputRef: inputRef,
            lineHeight: lineHeight,
            radius: radius,
            rotateCoor: rotateCoor,
            seqLength: seqLength,
        };
        // calculate the selection row height based on number of annotation
        var totalRows = 4 + annotationsInRows.length;
        var plasmidId = "la-vz-".concat(name, "-viewer-circular");
        if (!size.height)
            return null;
        return (React.createElement("svg", { ref: inputRef(plasmidId, { type: "SEQ", viewer: "CIRCULAR" }), className: "la-vz-viewer-circular", "data-testid": "la-vz-viewer-circular", height: size.height, id: plasmidId, width: size.width >= 0 ? size.width : 0, onMouseDown: handleMouseEvent, onMouseMove: handleMouseEvent, onMouseUp: handleMouseEvent, onWheel: this.handleScrollEvent },
            React.createElement("g", { className: "la-vz-circular-root", transform: "translate(0, ".concat(yDiff, ")") },
                React.createElement(Selection_1.Selection, __assign({}, props, { seq: seq, totalRows: totalRows })),
                React.createElement(CutSites_1.CutSites, __assign({}, props, { cutSites: cutSites, selectionRows: 4 })),
                React.createElement(Index_1.Index, __assign({}, props, { compSeq: compSeq, name: name, seq: seq, showIndex: showIndex, size: size, totalRows: totalRows, yDiff: yDiff })),
                React.createElement(Find_1.Find, { genArc: props.genArc, getRotation: props.getRotation, highlights: this.props.highlights, inputRef: props.inputRef, lineHeight: props.lineHeight, radius: props.radius, search: search, seqLength: props.seqLength }),
                React.createElement(Annotations_1.Annotations, __assign({}, props, { annotations: annotationsInRows, inlinedAnnotations: inlinedLabels, rowsToSkip: 0 })),
                React.createElement(Labels_1.Labels, __assign({}, props, { labels: outerLabels, size: size, yDiff: yDiff })))));
    };
    Circular.contextType = centralIndexContext_1.default;
    Circular.getDerivedStateFromProps = function (nextProps) {
        var lineHeight = 14;
        var annotationsInRows = (0, elementsToRows_1.stackElements)(nextProps.annotations, nextProps.seq.length);
        /**
         * find the element labels that need to be rendered outside the plasmid. This is done for
         * annotation names/etc for element titles that don't fit within the width of the element
         * they represent. For example, an annotation might be named "Transcription Factor XYZ"
         * but be only 20bps long on a plasmid that's 20k bps. Obviously that name doesn't fit.
         * But, a gene that's 15k on the same plasmid shouldn't have it's label outside the plasmid
         * when it can easily fit on top of the annotation itself
         */
        var seqLength = nextProps.seq.length;
        var cutSiteLabels = nextProps.cutSites;
        var radius = nextProps.radius;
        var innerRadius = radius - 3 * lineHeight;
        var inlinedLabels = [];
        var outerLabels = [];
        annotationsInRows.forEach(function (r) {
            var circumf = innerRadius * Math.PI;
            r.forEach(function (ann) {
                // how large is the name of the annotation horizontally (with two char padding)
                var annNameLengthPixels = (ann.name.length + 2) * SeqViewerContainer_1.CHAR_WIDTH;
                // how large would part be if it were wrapped around the plasmid
                var annLengthBases = ann.end - ann.start;
                if (ann.start >= ann.end)
                    annLengthBases += seqLength; // crosses zero-index
                var annLengthPixels = 2 * circumf * (annLengthBases / seqLength);
                if (annNameLengthPixels < annLengthPixels) {
                    inlinedLabels.push(ann.id);
                }
                else {
                    var end = ann.end, id = ann.id, name_1 = ann.name, start = ann.start;
                    var type = "annotation";
                    outerLabels.push({ end: end, id: id, name: name_1, start: start, type: type });
                }
            });
            innerRadius -= lineHeight;
        });
        cutSiteLabels.forEach(function (c) {
            return outerLabels.push(__assign(__assign(__assign({}, c.enzyme), c), { start: c.fcut, type: "enzyme" }));
        });
        // sort all the labels so they're in ascending order
        outerLabels.sort(function (a, b) { return Math.min(a.start, a.end) - Math.min(b.start, b.end); });
        return {
            annotationsInRows: annotationsInRows,
            inlinedLabels: inlinedLabels,
            lineHeight: lineHeight,
            outerLabels: outerLabels,
            seqLength: nextProps.seq.length,
        };
    };
    return Circular;
}(React.Component));
exports["default"] = Circular;
/**
 * Create an SVG arc around a single element in the Circular Viewer.
 */
var Arc = function (props) {
    var className = props.className, color = props.color, direction = props.direction, genArc = props.genArc, getRotation = props.getRotation, inputRef = props.inputRef, lineHeight = props.lineHeight, radius = props.radius, seqLength = props.seqLength, start = props.start;
    var end = props.end;
    // crosses the zero index
    if (end < start) {
        end += seqLength;
    }
    var resultLength = Math.abs(end - start);
    var findPath = genArc({
        innerRadius: radius - lineHeight / 2,
        largeArc: resultLength > seqLength / 2,
        length: resultLength,
        outerRadius: radius + lineHeight / 2,
        sweepFWD: true,
    });
    var id = "".concat(className, "-circular-").concat(start, "-").concat(end, "-").concat(direction);
    return (React.createElement("path", { key: id, ref: inputRef(id, {
            end: end,
            ref: id,
            start: start,
            type: "FIND",
            viewer: "CIRCULAR",
        }), className: className, cursor: "pointer", d: findPath, fill: color, id: id, shapeRendering: "auto", stroke: "rgba(0, 0, 0, 0.5)", strokeWidth: 1, transform: getRotation(start) }));
};
exports.Arc = Arc;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var React = __webpack_require__(1);
/** Default central index context object */
var defaultCentralIndex = {
    circular: 0,
    linear: 0,
    setCentralIndex: function (_, __) {
        // do nothing
    },
};
/** The "central index" is used to scroll the linear or circular viewer when you click on an annotation */
var CentralIndexContext = React.createContext(defaultCentralIndex);
CentralIndexContext.displayName = "CentralIndexContext";
exports["default"] = CentralIndexContext;


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports) {


var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createSingleRows = exports.createMultiRows = exports.stackElements = void 0;
// utility funcs for stackElements
var last = function (arr) { return arr[arr.length - 1]; };
var first = function (arr) { return arr[0]; };
/**
 * Take an array of elements and create a 2D array where non-overlapping elements are in
 * the same row. Example:
 *
 * input (`T[]`):
 * ```
 * 		[ ---Ann---	---Ann3---
 * 			 ---Ann2--- ]
 * ```
 *
 * output (`T[][]`):
 * ```
 * 		[ ---Ann--- ---Ann3---]
 * 		[		---Ann2---    ]
 * ```
 */
var stackElements = function (elements, seqL) {
    return __spreadArray([], elements, true).sort(function (a, b) { return a.end - b.end; })
        .sort(function (a, b) { return a.start - b.start; })
        .reduce(function (acc, a) {
        var insertIndex = acc.findIndex(function (elements) {
            if (a.end === a.start) {
                // the element has the same start and end index and therefore the whole
                // plasmid (so it shouldn't fit into any existing row)
                return false;
            }
            if (last(elements).end <= last(elements).start) {
                // the last element in this row crosses zero index
                return last(elements).end + seqL <= a.start;
            }
            if (a.end > a.start) {
                // this element doesn't cross the zero index and the last in row doesn't
                return last(elements).end <= a.start;
            }
            // both this curr element and the last in the row cross the zero index
            return last(elements).end < a.start && a.end < first(elements).start;
        });
        if (insertIndex > -1) {
            // insert in the row where it's the new highest
            acc[insertIndex].push(a);
        }
        else {
            // create a new row for this entry
            acc.push([a]);
        }
        return acc;
    }, []);
};
exports.stackElements = stackElements;
/**
 * given an array of arrays of an element, fragment the element into seq blocks
 *
 * this is needed in the Linear sequence viewer because it's easier to send only the
 * relevant elements to the child SeqBlocks, rather to send every SeqBlock everything
 * and have the block figure out whether element is included within it
 *
 * NOTE: if an element has a start and end index that are the same, it's assumed to
 * cover the entire plasmid
 */
var createMultiRows = function (elements, rowLength, rowCount) {
    var newArr = new Array(rowCount);
    // initialize the nested rows in each block
    for (var i = 0; i < rowCount; i += 1) {
        newArr[i] = [];
        for (var j = 0; j < elements.length; j += 1) {
            newArr[i][j] = [];
        }
    }
    // for each row of input
    for (var i = 0; i < elements.length; i += 1) {
        // for each element in that row
        for (var j = 0; j < elements[i].length; j += 1) {
            // if the element doesn't cross the zero index
            if (elements[i][j].start < elements[i][j].end) {
                // between the elements start and end, add to every seqBlock
                // within its range
                // this element doesn't cross the zero index and doesn't cover
                // the whole plasmid
                var k = Math.max(0, Math.floor(elements[i][j].start / rowLength));
                var end = Math.floor((elements[i][j].end - 1) / rowLength);
                while (k <= end && k < rowCount) {
                    newArr[k][i].push(elements[i][j]);
                    k += 1;
                }
            }
            else if (elements[i][j].end < elements[i][j].start) {
                // the element crosses the zero index and doesn't cover the whole plasmid
                // first, push onto all arrays from the end down to the zero
                var e = Math.floor((elements[i][j].end - 1) / rowLength);
                if (elements[i][j].end === 0) {
                    // handle an edge case where element ends at 0-index
                    e = -1; // skip adding to rows
                }
                while (e >= 0 && e < newArr.length) {
                    newArr[e][i].push(elements[i][j]);
                    e -= 1;
                }
                // then push onto all arrays from the start to the end
                var s = Math.floor(elements[i][j].start / rowLength);
                while (s < rowCount) {
                    newArr[s][i].push(elements[i][j]);
                    s += 1;
                }
            }
            else if (elements[i][j].end === elements[i][j].start) {
                // the element circles the entire plasmid and, therefore, fills every
                // SeqBlock. start === end is signal for covering whole plasmid
                for (var a = 0; a < newArr.length; a += 1) {
                    newArr[a][i].push(elements[i][j]);
                }
                // edge case where starts and ends at 0
                if (elements[i][j].end === 0) {
                    continue;
                }
                // and add again for the block that the element starts in
                var s = Math.floor(elements[i][j].start / rowLength);
                newArr[s][i].push(elements[i][j]);
            }
        }
    }
    // filter out the empty rows in each block
    for (var i = 0; i < rowCount; i += 1) {
        newArr[i] = newArr[i].filter(function (a) { return a[0]; });
    }
    return newArr;
};
exports.createMultiRows = createMultiRows;
/**
 * Given an array of elements and an interval (`rowLength`), bin elements into rows.
 *
 * This is used by the Linear viewer for CutSites and Highlights where it's okay for
 * elements to overlap one another.
 */
var createSingleRows = function (elements, rowLength, rowCount, duplicateIdsAllowed) {
    if (duplicateIdsAllowed === void 0) { duplicateIdsAllowed = true; }
    var newArr = new Array(rowCount);
    // initialize the nested rows in each block
    for (var i = 0; i < rowCount; i += 1) {
        newArr[i] = [];
    }
    var _loop_1 = function (i) {
        var _a = elements[i], end = _a.end, start = _a.start;
        // special case for enzymes that have cut-sites away from recog (BsaI)
        // @ts-expect-error this is some hack for cut-sites
        if (elements[i].fcut !== undefined) {
            // @ts-expect-error this is some hack for cut-sites
            var _b = elements[i], fcut = _b.fcut, rcut = _b.rcut;
            start = fcut > end || fcut < start ? fcut : start;
            end = rcut > end || rcut < start ? rcut : end;
        }
        if (start < end) {
            var k = Math.floor(start / rowLength);
            var rowEnd = Math.floor((end - 1) / rowLength);
            while (k <= rowEnd && k < rowCount) {
                newArr[k].push(elements[i]);
                k += 1;
            }
        }
        else {
            // the element crosses the zero index
            // first, push onto all arrays from the end down to the zero
            var e = Math.floor(end / rowLength);
            while (e >= 0) {
                newArr[e].push(elements[i]);
                e -= 1;
            }
            // then push onto all arrays from the start to the end
            var s = Math.floor(start / rowLength);
            while (s < rowCount) {
                // only add to the array if the user is okay with having duplicates by id.
                // for example, this shouldn't be allowed if multiple translation rows have
                // the same ID
                if (duplicateIdsAllowed || newArr[s].every(function (el) { return el.id !== elements[i].id; })) {
                    newArr[s].push(elements[i]);
                }
                s += 1;
            }
        }
    };
    // assign each element to its respective array
    for (var i = 0; i < elements.length; i += 1) {
        _loop_1(i);
    }
    return newArr;
};
exports.createSingleRows = createSingleRows;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isEqual = void 0;
/**
 * Deep equality comparison between two objects
 *
 * copy-paste from StackOverflow: https://stackoverflow.com/a/25456134
 *
 */
var isEqual = function (x, y) {
    if (x === y) {
        return true;
    }
    else if (typeof x === "object" && x !== null && typeof y === "object" && y !== null) {
        if (Object.keys(x).length !== Object.keys(y).length)
            return false;
        for (var prop in x) {
            if (Object.prototype.hasOwnProperty.call(y, prop)) {
                if (!(0, exports.isEqual)(x[prop], y[prop]))
                    return false;
            }
            else
                return false;
        }
        return true;
    }
    return false;
};
exports.isEqual = isEqual;


/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Annotations = void 0;
var React = __webpack_require__(1);
var centralIndexContext_1 = __webpack_require__(9);
var colors_1 = __webpack_require__(13);
/**
 * Used to build up all the path elements. Does not include a display
 * of the annotation name or a line connecting name to annotation
 *
 * Annotations might overlap with one another. To avoid that, annotations are first moved into rows -- non-overlapping
 * arrays or annotation arrays -- and then used to create the array of array of annotation paths.
 */
var Annotations = /** @class */ (function (_super) {
    __extends(Annotations, _super);
    function Annotations() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** during an annotation hover event, darken all other pieces of the same annotation */
        _this.hoverAnnotation = function (className, opacity) {
            if (!document)
                return;
            var elements = document.getElementsByClassName(className);
            for (var i = 0; i < elements.length; i += 1) {
                elements[i].style.fillOpacity = opacity;
            }
        };
        return _this;
    }
    Annotations.prototype.render = function () {
        var _this = this;
        var _a = this.props, annotations = _a.annotations, lineHeight = _a.lineHeight, radius = _a.radius, rowsToSkip = _a.rowsToSkip;
        // at least 3 rows inward from default radius (ie index row)
        var rowShiftHeight = lineHeight * rowsToSkip;
        var radiusAdjust = lineHeight * 2 + 3;
        var currBRadius = radius - radiusAdjust - rowShiftHeight;
        var currTRadius = currBRadius - lineHeight; // top radius
        return (React.createElement(centralIndexContext_1.default.Consumer, null, function (_a) {
            var circular = _a.circular;
            return (React.createElement("g", { className: "la-vz-circular-annotations" }, annotations.reduce(function (acc, anns, i) {
                if (i) {
                    // increment the annRow radii on every loop after first
                    currBRadius -= lineHeight + 3;
                    currTRadius -= lineHeight + 3;
                }
                return acc.concat(anns.map(function (ann) { return (React.createElement(SingleAnnotation, { key: "la-vz-".concat(ann.id, "-annotation-circular-row"), annotation: ann, calcBorderColor: colors_1.darkerColor, centralIndex: circular, currBRadius: currBRadius, currTRadius: currTRadius, genArc: _this.props.genArc, getRotation: _this.props.getRotation, hoverAnnotation: _this.hoverAnnotation, id: "la-vz-".concat(ann.id, "-annotation-circular-row"), inlinedAnnotations: _this.props.inlinedAnnotations, inputRef: _this.props.inputRef, lineHeight: lineHeight, seqLength: _this.props.seqLength })); }));
            }, [])));
        }));
    };
    return Annotations;
}(React.PureComponent));
exports.Annotations = Annotations;
/**
 * SingleAnnotation renders a single annotation within the Circular Viewer
 */
var SingleAnnotation = function (props) {
    var a = props.annotation, calcBorderColor = props.calcBorderColor, centralIndex = props.centralIndex, currBRadius = props.currBRadius, currTRadius = props.currTRadius, genArc = props.genArc, getRotation = props.getRotation, hoverAnnotation = props.hoverAnnotation, inlinedAnnotations = props.inlinedAnnotations, inputRef = props.inputRef, lineHeight = props.lineHeight, seqLength = props.seqLength;
    // if it crosses the zero index, correct for actual length
    var annLength = a.end >= a.start ? a.end - a.start : seqLength - a.start + a.end;
    // can't make an arc from a full circle
    annLength = annLength === 0 ? seqLength - 0.1 : annLength;
    // how many degrees should it be rotated?
    var rotation = getRotation(a.start);
    if (currBRadius < 0 || currTRadius < 0) {
        return null;
    }
    // is the name in top or bottom half?
    var mid = (annLength / 2 + a.start + seqLength - centralIndex) % seqLength;
    var bottomHalf = mid > seqLength * 0.25 && mid < seqLength * 0.75;
    var path = genArc({
        arrowFWD: a.direction === 1,
        arrowREV: a.direction === -1,
        innerRadius: currBRadius,
        largeArc: annLength > seqLength / 2,
        length: annLength,
        outerRadius: currTRadius,
        sweepFWD: true,
    });
    var namePath = genArc({
        arrowFWD: false,
        arrowREV: false,
        innerRadius: bottomHalf ? currBRadius : currTRadius,
        largeArc: annLength > seqLength / 2,
        length: annLength,
        outerRadius: bottomHalf ? currBRadius : currTRadius,
        sweepFWD: true,
    });
    var circAnnID = "la-vz-".concat(a.id, "-circular");
    return (React.createElement("g", { id: "la-vz-".concat(a.id, "-annotation-circular"), transform: rotation },
        React.createElement("path", { d: namePath, fill: "transparent", id: circAnnID, stroke: "transparent" }),
        React.createElement("path", { ref: inputRef(a.id, {
                direction: a.direction,
                end: a.end,
                name: a.name,
                ref: a.id,
                start: a.start,
                type: "ANNOTATION",
                viewer: "CIRCULAR",
            }), className: "".concat(a.id, " la-vz-annotation"), cursor: "pointer", d: path, fill: a.color, id: a.id, stroke: a.color ? colors_1.COLOR_BORDER_MAP[a.color] || calcBorderColor(a.color) : "gray", onBlur: function () {
                // do nothing
            }, onFocus: function () {
                // do nothing
            }, onMouseOut: function () { return hoverAnnotation(a.id, "0.7"); }, onMouseOver: function () { return hoverAnnotation(a.id, "1.0"); } }),
        inlinedAnnotations.includes(a.id) && (React.createElement("text", { dy: -0.4 * lineHeight, id: a.id, onBlur: function () {
                // do nothing
            }, onFocus: function () {
                // do nothing
            }, onMouseOut: function () { return hoverAnnotation(a.id, "0.7"); }, onMouseOver: function () { return hoverAnnotation(a.id, "1.0"); } },
            React.createElement("textPath", { className: "la-vz-annotation-label", cursor: "pointer", dominantBaseline: "middle", fontSize: 12, id: a.id, startOffset: bottomHalf ? "25%" : "75%", textAnchor: "middle", xlinkHref: "#".concat(circAnnID) }, a.name)))));
};


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.darkerColor = exports.borderColorByIndex = exports.colorByIndex = exports.chooseRandomColor = exports.COLOR_BORDER_MAP = exports.COLORS = void 0;
var pSBC_1 = __webpack_require__(14);
/**
 * a color pallete of colors (for LinearSeq right now)\
 * generated using:
 * https://material.io/color/#!/?view.left=0&view.right=0&primary.color=FFCC80
 */
exports.COLORS = [
    "#9DEAED",
    "#8FDE8C",
    "#CFF283",
    "#8CDEBD",
    "#F0A3CE",
    "#F7C672",
    "#F07F7F",
    "#FAA887",
    "#F099F7",
    "#C59CFF",
    "#6B81FF",
    "#85A6FF", // light blue
];
exports.COLOR_BORDER_MAP = {
    // purple
    "#6B81FF": "#2E3B85",
    // blue
    "#85A6FF": "#4C66AD",
    // light green
    "#8CDEBD": "#4CA17F",
    // cyan
    "#8FDE8C": "#5CA35A",
    "#9DEAED": "#5EB5B8",
    // magenta
    "#C59CFF": "#8A60C4",
    // green
    "#CFF283": "#8DB041",
    // orange
    "#F07F7F": "#AD4040",
    // red-orange
    "#F099F7": "#AB63B0",
    // teal
    "#F0A3CE": "#BD6295",
    // pink
    "#F7C672": "#BD872B",
    // red
    "#FAA887": "#B36446", // light blue
};
// color generator function
var chooseRandomColor = function (colors) {
    var choices = colors || exports.COLORS;
    var randIndex = Math.floor(Math.random() * choices.length);
    return choices[randIndex];
};
exports.chooseRandomColor = chooseRandomColor;
/** get an "indexed" color from the colors array */
var colorByIndex = function (i, colors) { return (colors || exports.COLORS)[i % (colors || exports.COLORS).length]; };
exports.colorByIndex = colorByIndex;
/** get an "indexed" color from the colors array */
var borderColorByIndex = function (i) { return exports.COLOR_BORDER_MAP[exports.COLORS[i % exports.COLORS.length]]; };
exports.borderColorByIndex = borderColorByIndex;
/** cache for input color to those 50% darker */
var darkerColorCache = {};
/** darken a HEX color by 50% */
var darkerColor = function (c) {
    if (darkerColorCache[c]) {
        return darkerColorCache[c];
    }
    var darkerColor = (0, pSBC_1.pSBC)(-0.5, c);
    darkerColorCache[c] = darkerColor;
    return darkerColor;
};
exports.darkerColor = darkerColor;


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pSBC = void 0;
// @ts-nocheck
// Version 4.0
// from: https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)
var pSBC = function (p, c0, c1, l) {
    var i = parseInt;
    var m = Math.round;
    var r, g, b, P, f, t, h, a = typeof c1 == "string";
    if (typeof p !== "number" ||
        p < -1 ||
        p > 1 ||
        typeof c0 !== "string" ||
        (c0[0] !== "r" && c0[0] !== "#") ||
        (c1 && !a)) {
        return null;
    }
    var pSBCr = function (d) {
        var _a;
        var n = d.length;
        var x = {};
        if (n > 9) {
            _a = d = d.split(","), r = _a[0], g = _a[1], b = _a[2], a = _a[3];
            n = d.length;
            if (n < 3 || n > 4)
                return null;
            x.r = i(r[3] === "a" ? r.slice(5) : r.slice(4));
            x.g = i(g);
            x.b = i(b);
            x.a = a ? parseFloat(a) : -1;
        }
        else {
            if (n === 8 || n === 6 || n < 4)
                return null;
            if (n < 6) {
                d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : "");
            }
            d = i(d.slice(1), 16);
            if (n === 9 || n === 5) {
                x.r = (d >> 24) & 255;
                x.g = (d >> 16) & 255;
                x.b = (d >> 8) & 255;
                x.a = m((d & 255) / 0.255) / 1000;
            }
            else {
                x.r = d >> 16;
                x.g = (d >> 8) & 255;
                x.b = d & 255;
                x.a = -1;
            }
        }
        return x;
    };
    h = c0.length > 9;
    h = a ? (c1.length > 9 ? true : c1 === "c" ? !h : false) : h;
    f = pSBCr(c0);
    P = p < 0;
    t = c1 && c1 !== "c" ? pSBCr(c1) : P ? { a: -1, b: 0, g: 0, r: 0 } : { a: -1, b: 255, g: 255, r: 255 };
    p = P ? p * -1 : p;
    P = 1 - p;
    if (!f || !t)
        return null;
    if (l) {
        r = m(P * f.r + p * t.r);
        g = m(P * f.g + p * t.g);
        b = m(P * f.b + p * t.b);
    }
    else {
        r = m(Math.pow((P * Math.pow(f.r, 2) + p * Math.pow(t.r, 2)), 0.5));
        g = m(Math.pow((P * Math.pow(f.g, 2) + p * Math.pow(t.g, 2)), 0.5));
        b = m(Math.pow((P * Math.pow(f.b, 2) + p * Math.pow(t.b, 2)), 0.5));
    }
    a = f.a;
    t = t.a;
    f = a >= 0 || t >= 0;
    a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0;
    if (h) {
        return "rgb" + (f ? "a(" : "(") + r + "," + g + "," + b + (f ? "," + m(a * 1000) / 1000 : "") + ")";
    }
    else {
        return ("#" +
            (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2));
    }
};
exports.pSBC = pSBC;


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CutSites = void 0;
var React = __webpack_require__(1);
var Circular_1 = __webpack_require__(8);
var CutSites = function (props) {
    var cutSites = props.cutSites;
    if (!cutSites.length)
        return null;
    cutSites = cutSites.filter(function (c) { return c.end > c.start; });
    var calculateLinePath = function (index, startRadius, endRadius) {
        var findCoor = props.findCoor;
        var lineStart = findCoor(index, startRadius);
        var lineEnd = findCoor(index, endRadius);
        return "M ".concat(lineEnd.x, " ").concat(lineEnd.y, " L ").concat(lineStart.x, " ").concat(lineStart.y);
    };
    return (React.createElement("g", { className: "la-vz-circular-cutsites" }, cutSites.map(function (c) { return (React.createElement(SingleCutSite, __assign({ key: "circular-cut-site-".concat(c.id) }, props, { calculateLinePath: calculateLinePath, cutSite: c }))); })));
};
exports.CutSites = CutSites;
var SingleCutSite = function (props) {
    var calculateLinePath = props.calculateLinePath, cutSite = props.cutSite, genArc = props.genArc, getRotation = props.getRotation, inputRef = props.inputRef, lineHeight = props.lineHeight, radius = props.radius, seqLength = props.seqLength;
    var id = cutSite.id, start = cutSite.start;
    var end = cutSite.end, fcut = cutSite.fcut, rcut = cutSite.rcut;
    // crosses the zero index
    if (start + fcut > end + rcut) {
        end = start > end ? end + seqLength : end;
        if (fcut > rcut) {
            rcut += seqLength;
        }
        else {
            fcut += seqLength;
        }
    }
    // length for highlighted recog area
    var cutSiteLength = Math.abs(end - start);
    // const calc the size of the recog area radii
    var botR = radius;
    var midR = radius + 0.5 * lineHeight; // mid radius
    var topR = radius + lineHeight; // outer radius
    if (seqLength < Circular_1.RENDER_SEQ_LENGTH_CUTOFF) {
        midR += lineHeight + 1.5;
        topR += 2 * lineHeight + 1.5;
    }
    return (React.createElement("g", { key: "la-vz-circular-cutsite-".concat(id), id: "la-vz-circular-cutsite-".concat(id), transform: getRotation(start) },
        React.createElement("path", { ref: inputRef(id, {
                end: end,
                ref: id,
                start: start,
                type: "ENZYME",
                viewer: "CIRCULAR",
            }), className: "la-vz-cut-site", cursor: "pointer", d: genArc({
                innerRadius: botR,
                largeArc: cutSiteLength > seqLength / 2,
                length: cutSiteLength,
                outerRadius: topR,
                sweepFWD: true,
            }), style: cutSite.enzyme.color ? { fill: cutSite.enzyme.color } : {} }),
        React.createElement("path", { className: "la-vz-cut-site", d: calculateLinePath(fcut - start, topR, midR) }),
        React.createElement("path", { className: "la-vz-cut-site", d: genArc({
                innerRadius: midR,
                largeArc: Math.abs(fcut - rcut) > seqLength / 2,
                length: Math.abs(fcut - rcut),
                offset: Math.min(fcut, rcut) - start,
                outerRadius: midR,
                sweepFWD: true,
            }) }),
        React.createElement("path", { className: "la-vz-cut-site", d: calculateLinePath(rcut - start, midR, botR) })));
};


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Find = void 0;
var React = __webpack_require__(1);
var Circular_1 = __webpack_require__(8);
var Find = function (props) {
    var genArc = props.genArc, getRotation = props.getRotation, highlights = props.highlights, inputRef = props.inputRef, lineHeight = props.lineHeight, radius = props.radius, search = props.search, seqLength = props.seqLength;
    var threshold = seqLength > Circular_1.RENDER_SEQ_LENGTH_CUTOFF ? search.length / seqLength <= 0.02 : true;
    return (React.createElement("g", { className: "la-vz-circular-search" },
        threshold &&
            search.map(function (s) { return (React.createElement(Circular_1.Arc, { key: JSON.stringify(s), className: "la-vz-search", direction: s.direction || 1, end: s.end, genArc: genArc, getRotation: getRotation, inputRef: inputRef, lineHeight: lineHeight, radius: radius, seqLength: seqLength, start: s.start })); }),
        highlights.map(function (_a) {
            var color = _a.color, end = _a.end, start = _a.start;
            return (React.createElement(Circular_1.Arc, { key: "la-vz-highlight-".concat(start, "-").concat(end), className: "la-vz-highlight", color: color, direction: 1, end: end, genArc: genArc, getRotation: getRotation, inputRef: inputRef, lineHeight: lineHeight, radius: radius, seqLength: seqLength, start: start }));
        })));
};
exports.Find = Find;


/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Index = void 0;
var React = __webpack_require__(1);
var centralIndexContext_1 = __webpack_require__(9);
var Circular_1 = __webpack_require__(8);
/**
 * The Index component renders the plasmid's:
 * 		1. name (center or bottom)
 * 		2. number of bps (center or bottom)
 * 		3. index circle
 * 		4. index ticks and numbers along the plasmid circle
 *
 * The center or bottom here refers to the fact that the name/bps of the
 * part need to be pushed to the bottom of the circular viewer if there
 * are too many elements in the circular viewer and the name won't fit
 */
var Index = /** @class */ (function (_super) {
    __extends(Index, _super);
    function Index() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            indexInc: 10,
            ticks: [],
        };
        /**
         * return a react element for the basepairs along the surface of the plasmid viewer
         */
        _this.renderBasepairs = function () {
            var _b = _this.props, compSeq = _b.compSeq, findCoor = _b.findCoor, getRotation = _b.getRotation, lineHeight = _b.lineHeight, radius = _b.radius, seq = _b.seq, seqLength = _b.seqLength;
            var indexInc = _this.state.indexInc;
            var centralIndex = _this.context.circular;
            // we should show all basepairs, with only 4 ticks
            var seqForCircular = seq + seq;
            var compSeqForCircular = compSeq + compSeq;
            var firstBase = centralIndex - indexInc * 5;
            var lastBase = centralIndex + indexInc * 5;
            if (centralIndex < seqLength / 2) {
                firstBase += seqLength;
                lastBase += seqLength;
            }
            var basepairsToRender = [];
            for (var i = firstBase; i <= lastBase; i += 1) {
                basepairsToRender.push(React.createElement("text", __assign({ key: "la-vz-base-".concat(i) }, findCoor(0, radius + 2 * lineHeight), { dominantBaseline: "middle", transform: getRotation(i) }), seqForCircular.charAt(i)), React.createElement("text", __assign({ key: "la-vz-base-comp-".concat(i) }, findCoor(0, radius + lineHeight), { dominantBaseline: "middle", transform: getRotation(i) }), compSeqForCircular.charAt(i)));
            }
            return basepairsToRender;
        };
        return _this;
    }
    Index.prototype.render = function () {
        var _b = this.props, center = _b.center, findCoor = _b.findCoor, genArc = _b.genArc, getRotation = _b.getRotation, lineHeight = _b.lineHeight, name = _b.name, radius = _b.radius, seq = _b.seq, seqLength = _b.seqLength, showIndex = _b.showIndex, size = _b.size, totalRows = _b.totalRows, yDiff = _b.yDiff;
        var ticks = this.state.ticks;
        if (!showIndex) {
            return null; // don't waste time, don't show
        }
        // split up the name so it fits within spans in the center
        // 30 letters is arbitrary. would be better to first search for "cleaveable characters"
        // like "|" or "," and revert to all chars if those aren't found. Or to decrease
        // name size first before cleaving, etc
        var mostInwardElementRadius = radius - totalRows * lineHeight;
        var cutoff = 30;
        var nameSpans = [];
        var nameIndex = 0;
        // TODO: react freaks out when the circ viewer is small and each line is one char
        // bc there are shared keys (also it's just not a good look)
        while (nameIndex < name.length) {
            nameSpans.push(name.substring(nameIndex, nameIndex + cutoff).trim());
            nameIndex += cutoff;
        }
        // generate the name text for the middle of the plasmid
        var spanCountAdjust = 20 * nameSpans.length; // adjust for each tspan off name
        var nameYAdjust = 14 + spanCountAdjust; // correct for both
        var nameCoorRadius = nameSpans.length ? (nameSpans[0].length / 2) * 12 : 0; // 12 px per character
        // if the elements will begin to overlap with the
        // name, move the name downward to the bottom of the viewer
        var nameCoor = nameCoorRadius > mostInwardElementRadius
            ? {
                x: center.x,
                y: size.height - nameYAdjust - yDiff,
            }
            : {
                x: center.x,
                y: center.y - ((nameSpans.length - 1) / 2) * 25, // shift the name up for >1 rows of text
            };
        // these are just created once, but are rotated to each position along the plasmid
        var tickCoorStart = findCoor(0, radius);
        var tickCoorEnd = findCoor(0, radius - 7);
        // create tick and text style
        var subtitleStyle = {
            fill: "gray",
            fontSize: 12,
            textAnchor: "middle",
        };
        // generate the full circle around the edge of the plasmid
        var indexCurve = genArc({
            innerRadius: radius,
            largeArc: true,
            length: seqLength / 2,
            outerRadius: radius,
        });
        return (React.createElement("g", null,
            React.createElement("text", { fontSize: 20, fontWeight: 500, textAnchor: "middle" }, nameSpans.map(function (n, i) { return (React.createElement("tspan", { key: n, x: nameCoor.x, y: nameCoor.y + i * 25 }, n)); })),
            React.createElement("text", __assign({ x: nameCoor.x, y: nameCoor.y + 14 + 25 * (nameSpans.length - 1) }, subtitleStyle), "".concat(seqLength, " bp")),
            seq.length <= Circular_1.RENDER_SEQ_LENGTH_CUTOFF && React.createElement("g", { className: "la-vz-circular-bps" }, this.renderBasepairs()),
            ticks.map(function (t) { return (React.createElement("g", { key: "la-vz-tick-".concat(t), transform: getRotation(t - 0.5) },
                React.createElement("path", { className: "la-vz-index-tick", d: "M ".concat(tickCoorStart.x, " ").concat(tickCoorStart.y, " L ").concat(tickCoorEnd.x, " ").concat(tickCoorEnd.y) }),
                React.createElement("text", { className: "la-vz-index-tick-label", fontSize: 12, textAnchor: "middle", x: tickCoorEnd.x, y: tickCoorEnd.y + lineHeight }, t))); }),
            React.createElement("g", null,
                React.createElement("path", { className: "la-vz-index-line", d: indexCurve, transform: getRotation(seqLength * 0.75) }),
                React.createElement("path", { className: "la-vz-index-line", d: indexCurve, transform: getRotation(seqLength * 0.25) }))));
    };
    var _a;
    _a = Index;
    Index.contextType = centralIndexContext_1.default;
    Index.getDerivedStateFromProps = function (nextProps) {
        var seqLength = nextProps.seqLength;
        var centralIndex = 0;
        if (_a.context) {
            centralIndex = _a.context.circular;
        }
        var tickCount = 6;
        // make each increment a multiple of 10 with two sig figs
        var increments = Math.floor(seqLength / tickCount);
        var indexInc = Math.max(+increments.toPrecision(2), 10);
        while (indexInc % 10 !== 0)
            indexInc += 1;
        // make all the ticks. Also, only keep ticks that are +/- 6 tick incremenets from the top
        // centralIndex, as the others won't be shown/rendered anyway
        var ticks = [];
        for (var i = 0; i <= seqLength - indexInc / 2; i += indexInc) {
            ticks.push(i === 0 ? 1 : i);
        }
        var tickTolerance = indexInc * 6;
        ticks = ticks.filter(function (t) {
            return Math.abs(centralIndex - t) < tickTolerance ||
                Math.abs(centralIndex + seqLength - t) < tickTolerance ||
                Math.abs(centralIndex - seqLength - t) < tickTolerance;
        });
        return { indexInc: indexInc, ticks: ticks };
    };
    return Index;
}(React.PureComponent));
exports.Index = Index;


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Labels = void 0;
var React = __webpack_require__(1);
var SeqViewerContainer_1 = __webpack_require__(6);
var Circular_1 = __webpack_require__(8);
var WrappedGroupLabel_1 = __webpack_require__(19);
/**
 * used to build up all plasmid labels, for annotations, enzymes, etc
 *
 * a caveat to take into account here is that the names, outside the
 * map, might also overlap with one another. There will need to be a check, given
 * the dimensions of each name, calculated by the font, and the size
 * of the viewer, for scaling these names and positioning in the Y-direction
 * to avoid this overlap problem
 */
var Labels = /** @class */ (function (_super) {
    __extends(Labels, _super);
    function Labels(props) {
        var _this = _super.call(this, props) || this;
        // set the currently hovered group
        _this.setHoveredGroup = function (hoveredGroup) {
            if (hoveredGroup !== _this.state.hoveredGroup) {
                _this.setState({ hoveredGroup: hoveredGroup });
            }
        };
        _this.state = {
            hoveredGroup: "",
            labelGroups: [],
        };
        return _this;
    }
    Labels.prototype.render = function () {
        var _this = this;
        var _a = this.state, hoveredGroup = _a.hoveredGroup, labelGroups = _a.labelGroups;
        var _b = this.props, lineHeight = _b.lineHeight, size = _b.size;
        // find the currently hovered group
        var hovered = labelGroups.find(function (g) { return g.labels[0].id === hoveredGroup; });
        return (React.createElement("g", { className: "la-vz-circular-labels", onMouseLeave: function () { return _this.setHoveredGroup(""); } },
            labelGroups.map(function (g) {
                var first = g.labels[0];
                // generate the line between the name and plasmid surface
                var fC = g.forkCoor || g.textCoor;
                var labelLines = (React.createElement(React.Fragment, null,
                    React.createElement("path", { className: "la-vz-label-line", d: "M".concat(g.lineCoor.x, " ").concat(g.lineCoor.y, " L").concat(fC.x, " ").concat(fC.y) }),
                    g.forkCoor && (React.createElement("path", { className: "la-vz-label-line", d: "M".concat(fC.x, " ").concat(fC.y, " L").concat(g.textCoor.x, " ").concat(g.textCoor.y) }))));
                if (!g.grouped) {
                    // just a single name in this position
                    return (React.createElement("g", { key: first.id },
                        labelLines,
                        React.createElement("text", __assign({ className: "la-vz-circular-label", id: first.id }, g.textCoor, { dominantBaseline: "middle", textAnchor: g.textAnchor }), g.name)));
                }
                else if (first.id === hoveredGroup) {
                    // return nothing, this group block needs to be rendered last to be on top of the other elements in the SVG
                    return null;
                }
                // a group of names which should render an overlap block
                return (React.createElement("g", { key: "".concat(first.id, "-listener"), id: "".concat(first.id, "-label") },
                    labelLines,
                    React.createElement("text", __assign({ className: "la-vz-circular-label", dominantBaseline: "middle", id: first.id, textAnchor: g.textAnchor, onMouseEnter: function () { return _this.setHoveredGroup(first.id || ""); } }, g.textCoor), g.name)));
            }),
            hovered && (React.createElement(WrappedGroupLabel_1.WrappedGroupLabel, { group: hovered, lineHeight: lineHeight, setHoveredGroup: this.setHoveredGroup, size: size }))));
    };
    Labels.getDerivedStateFromProps = function (nextProps, prevState) {
        // I'm storing the name position groups in state because hovering and
        // leaving a hover both trigger a change in whether to render and show
        // the annotation block, it would be expensive to regroup labels
        // on every hover event
        return {
            hoveredGroup: prevState.hoveredGroup,
            labelGroups: Labels.groupOverlappingLabels(nextProps),
        };
    };
    /**
     * need to avoid having overlapping names. if names
     * overlap with one another, they should be grouped together and
     * just show the first name of the group. Ex: "M13-rev,GTP,+3"
     *
     * On hover over this group, all the other names should be shown
     *
     * this should return all the informaiton needed to render the
     * name by itself or in a grouping
     */
    Labels.groupOverlappingLabels = function (props) {
        var center = props.center, findCoor = props.findCoor, labels = props.labels, lineHeight = props.lineHeight, radius = props.radius, seqLength = props.seqLength, size = props.size, yDiff = props.yDiff;
        // create a radius outside the plasmid map for placing the names
        var textRadiusAdjust = seqLength > Circular_1.RENDER_SEQ_LENGTH_CUTOFF ? lineHeight * 2 : lineHeight * 3.5;
        var textRadius = radius + textRadiusAdjust;
        /**
         * Add positional information to each label. This includes:
         * - textCoor: point next to the text
         * - lineCoor: point next to the plasmid arc/circle
         * - textAnchor: alignment
         */
        var labelsWithCoordinates = labels
            .reduce(function (acc, labelRow) { return acc.concat(labelRow); }, [])
            .map(function (a) {
            // find the mid-point, vertically, for the label, correcting for elements
            // that cross the zero-index
            var annCenter;
            if (a.type === "enzyme") {
                annCenter = a.start;
            }
            else if (a.end > a.start) {
                annCenter = (a.end + a.start) / 2;
            }
            else {
                var annStart = a.start - seqLength;
                var annMidSum = annStart + a.end;
                annCenter = annMidSum / 2;
            }
            // connect the label to the plasmid's index unless we're showing bases. If we're showing
            // bases, keep it just outside those.
            var lineCoorRadius = seqLength > Circular_1.RENDER_SEQ_LENGTH_CUTOFF ? radius : textRadius - lineHeight / 2;
            // find the seed-points
            var lineCoor = findCoor(annCenter, lineCoorRadius, true);
            var textCoor = findCoor(annCenter, textRadius, true);
            // find the textAnchor, based on which side of plasmid it's on
            var textAnchor = textCoor.x <= center.x ? "end" : "start";
            var label = a;
            return { label: label, lineCoor: lineCoor, textAnchor: textAnchor, textCoor: textCoor };
        });
        // a utility function for checking whether a label and textCoor will overflow
        var groupOverflows = function (label, textCoor) {
            var nameLength = (label.name.length + 4) * SeqViewerContainer_1.CHAR_WIDTH; // +4 for ",+#" and padding
            var overflow = false;
            var heightYPos = textCoor.y + yDiff;
            if (heightYPos < 0 || heightYPos > size.height) {
                overflow = true; // vertical overflow
            }
            else if (textCoor.x - nameLength < 0 || textCoor.x + nameLength > size.width) {
                overflow = true; // horizontal overflow
            }
            return overflow;
        };
        /**
         * merge overlapping names into groupings. If multiple of the labels
         * will overlap with one another, create an array of them and generate an
         * overview name to show for all of them (ex above)
         */
        var labelsGrouped = labelsWithCoordinates.reduce(function (acc, n) {
            // search through the other names and check whether any would overlap
            var overlapIndex = acc.findIndex(function (g) {
                // first check whether the two labels are on the same side of the plasmid
                if (g.textAnchor === n.textAnchor) {
                    // characters are 13px high, this is creating 2px of padding
                    return Math.abs(g.textCoor.y - n.textCoor.y) < 15;
                }
                return false;
            });
            if (overlapIndex > -1) {
                // add this label to an already existing group
                acc[overlapIndex].labels.push(n.label);
                acc[overlapIndex].grouped = true;
                return acc;
            }
            // this name doesn't overlap with any others
            // check whether the its name overflows the side of the viewer
            var overflow = groupOverflows(n.label, n.textCoor);
            // create a new "group" from this single label
            return acc.concat({
                forkCoor: null,
                grouped: overflow,
                labels: [n.label],
                lineCoor: n.lineCoor,
                name: n.label.name,
                overflow: overflow,
                textAnchor: n.textAnchor,
                textCoor: n.textCoor,
            });
        }, []);
        /**
         * we now want to *ungroup* labels that we can do overlap avoidance for by doing small vertical
         * adjustments. So for every group that is grouped but doesn't overlap (ie, the labels
         * overlap but the group doesn't overflow the viewer's edge), try to spread out the
         * labels so the user can see all of them at once and by default
         *
         * to do this we need to create a forkCoor, where the textCoors of the constituent
         * labels will connect. That forkCoor, in turn, will be what connects to the edge of
         * the plasmid
         */
        labelsGrouped = labelsGrouped.reduce(function (acc, g, i) {
            // wasn't grouped or overflows the side of viewer or too many labels to try and help
            if (!g.grouped || g.overflow || g.labels.length > 4)
                return acc.concat(g);
            // since the labels are sorted (see circular.filterOutsideLabels), we can just check the
            // coordinate of this group's neighbors to see whether we can spread out
            var leftNeighbor = acc[acc.length - 1];
            var rightNeighbor = labelsGrouped[i + 1];
            if (leftNeighbor && leftNeighbor.textAnchor !== g.textAnchor) {
                leftNeighbor = undefined;
            }
            if (rightNeighbor && rightNeighbor.textAnchor !== g.textAnchor) {
                rightNeighbor = undefined;
            }
            // try and split/shift labels horizontally
            var newLabels = g.labels.map(function (l, i2) {
                // if on right side of the viewer, shfit rightward
                var xDelta = i2 * (3 * SeqViewerContainer_1.CHAR_WIDTH);
                if (g.textAnchor === "end")
                    xDelta = -xDelta; // otherwise shift leftward
                var yDelta = (g.labels.length - i2) * -15; // start off by shifting upwards 15px if on top half
                if (g.textCoor.y > center.y)
                    yDelta = (g.labels.length - i2) * 15; // otherwise shift down
                var newTextCoor = {
                    x: g.textCoor.x + xDelta,
                    y: g.textCoor.y + yDelta, // try ot make the adjustment to the top/bottom
                };
                var overflow = groupOverflows(l, newTextCoor);
                return __assign(__assign({}, g), { forkCoor: g.textCoor, grouped: overflow, labels: [l], overflow: overflow, textCoor: newTextCoor });
            });
            // check whether any of these attempted new labels overlaps with the neighbors
            var overlapWithNeighbors = newLabels.some(function (l) {
                return [leftNeighbor, rightNeighbor].some(function (n) { return n && Math.abs(n.textCoor.y - l.textCoor.y) < 15; });
            });
            if (overlapWithNeighbors)
                return acc.concat(g); // just bail and return the original grouping
            return acc.concat.apply(acc, newLabels); // add the newly created labels
        }, []);
        /**
         * give actual names. this is in a separate loop because the group name
         * is going to indicate how many other sub labels are in a block/grouping
         * and it's easier to make them once than to update continually in the reduce above
         */
        labelsGrouped = labelsGrouped.map(function (a) {
            var firstName = a.labels[0].name;
            var restLength = a.labels.length - 1;
            if (a.overflow) {
                // would extend outside the viewer if we included the group name
                return __assign(__assign({}, a), { name: "+".concat(restLength + 1) });
            }
            else if (a.grouped) {
                // does not extend outside width/height of the viewer with group name
                return __assign(__assign({}, a), { name: "".concat(firstName, ",+").concat(restLength) });
            }
            // didn't have to be grouped at all
            return __assign(__assign({}, a), { name: firstName });
        });
        /**
         * prevent the labels from overflowing the side of the viewer
         * even the small "+1" labels can overflow the sides if the viewer is small enough
         * this pushes their textCoors inward to prevent that
         */
        return labelsGrouped.map(function (g) {
            var _a = g.textCoor, x = _a.x, y = _a.y;
            // prevent the text label from overflowing the sides (w/ one char padding)
            x = Math.max(SeqViewerContainer_1.CHAR_WIDTH * (g.name.length + 1), x);
            x = Math.min(size.width - (g.name.length + 1) * SeqViewerContainer_1.CHAR_WIDTH, x);
            y = Math.max(SeqViewerContainer_1.CHAR_WIDTH, y);
            y = Math.min(size.height - SeqViewerContainer_1.CHAR_WIDTH - 12, y); // assuming 12px font-size w/ padding
            return __assign(__assign({}, g), { textCoor: { x: x, y: y } });
        });
    };
    return Labels;
}(React.Component));
exports.Labels = Labels;


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WrappedGroupLabel = void 0;
var React = __webpack_require__(1);
var SeqViewerContainer_1 = __webpack_require__(6);
/**
 * a component that groups several other labels together so they're all viewable at once
 *
 * given the currently active annotation block, with multiple annotations and enzymes,
 * render each in a single "block", which is a g element with a rect "containing" the
 * names. This is slightly tricky because we can't put the text elements inside
 * the rect as though it were a div and have them fill it. instead, we must calculate
 * the height and width of the resulting annotaiton block
 */
var WrappedGroupLabel = function (props) {
    var group = props.group, lineHeight = props.lineHeight, setHoveredGroup = props.setHoveredGroup, _a = props.size, height = _a.height, width = _a.width;
    // utility function for calculating the width of the last row before this one
    // the +1 after name.length is for a comma
    var calcRowWidth = function (row) { return row.reduce(function (acc, label) { return acc + (label.name.length + 1) * SeqViewerContainer_1.CHAR_WIDTH; }, 0); };
    // group the labels into rows with a preference with widths less than 200px
    var lastRow = function (acc) { return acc[acc.length - 1]; };
    var labelRows = group.labels.reduce(function (acc, l) {
        var nameWidth = l.name.length * SeqViewerContainer_1.CHAR_WIDTH;
        if (nameWidth > width) {
            // handle an edge case where the annotation name is MASSIVE and
            // greater than the width of the sequence viewer
            // split the name into separate rows so it's at max 75% of the
            // seq viewer's width, but each still referencing the original label
            var maxCharPerRow = Math.floor((width * 0.75) / SeqViewerContainer_1.CHAR_WIDTH);
            var splitRegex = new RegExp(".{1,".concat(maxCharPerRow, "}"), "g");
            var splitLabelNameRows = l.name.match(splitRegex) || [];
            if (splitLabelNameRows.length) {
                splitLabelNameRows.forEach(function (splitLabel) {
                    acc.push([__assign(__assign({}, l), { name: splitLabel.trim() })]);
                });
                return acc;
            }
        }
        if (lastRow(acc)) {
            // this isn't the first element, check width of last label row
            var lastRowWidth = calcRowWidth(lastRow(acc));
            if (lastRowWidth + nameWidth <= 200) {
                // there's space in the last row for this label as well
                acc[acc.length - 1].push(l);
                return acc;
            }
        }
        acc.push([l]); // need to make a new row for this label
        return acc;
    }, []);
    // find the grouping's height and width (max row width)
    var groupHeight = labelRows.length * lineHeight;
    var groupWidth = labelRows.reduce(function (max, row, i) { return Math.max(max, calcRowWidth(row) - (i === labelRows.length - 1 ? SeqViewerContainer_1.CHAR_WIDTH : 0)); }, // no comma on last row, correct
    0);
    // add one CHAR_WIDTH padding to all sides of label box
    var _b = [groupHeight, groupWidth].map(function (x) { return x + 2 * SeqViewerContainer_1.CHAR_WIDTH; }), rectHeight = _b[0], rectWidth = _b[1];
    // generate the line between the name and plasmid surface
    var forkCoor = group.forkCoor || group.textCoor;
    var linePath = group.forkCoor
        ? "M".concat(group.textCoor.x, " ").concat(group.textCoor.y, " L").concat(forkCoor.x, " ").concat(forkCoor.y)
        : "M".concat(group.lineCoor.x, " ").concat(group.lineCoor.y, " L").concat(forkCoor.x, " ").concat(forkCoor.y);
    // find the upper left coordinate for the group. if this is on the right
    // side of the plasmid, this is upper left. if it's on the left side of
    // the plasmid, it should be upper right
    var _c = group.textCoor, x = _c.x, y = _c.y;
    x = group.textAnchor === "end" ? x - (group.labels[0].name.length + 3) * SeqViewerContainer_1.CHAR_WIDTH : x; // the +3) is for ",+#"
    y -= SeqViewerContainer_1.CHAR_WIDTH;
    x = Math.max(x, 2 * SeqViewerContainer_1.CHAR_WIDTH); // prevent overflow of left or right side
    x = Math.min(x, width - 2 * SeqViewerContainer_1.CHAR_WIDTH - groupWidth);
    y = Math.max(y, 2 * SeqViewerContainer_1.CHAR_WIDTH); // prevent overflow of top and bottom
    y = Math.min(y, height - 2 * SeqViewerContainer_1.CHAR_WIDTH - groupHeight);
    // add padding to the box by adding/subbing a CHAR_WIDTH from edges
    var groupCoor = { x: x, y: y };
    var rectCoor = { x: x - SeqViewerContainer_1.CHAR_WIDTH, y: y - SeqViewerContainer_1.CHAR_WIDTH - 2 };
    var key = "".concat(group.labels[0].id, "_overlay");
    return (React.createElement("g", { key: key, onMouseLeave: function () { return setHoveredGroup(""); } },
        React.createElement("path", { className: "la-vz-label-line", d: linePath }),
        React.createElement("rect", __assign({ fill: "white", height: rectHeight, stroke: "none", width: rectWidth }, rectCoor)),
        React.createElement("text", __assign({}, groupCoor), labelRows.map(function (r, i) { return (
        // turn each group of label rows into a text span
        // that's vertically spaced from the row above it
        // add a comma to all but the last label
        React.createElement("tspan", { key: "".concat(key, "_").concat(i), dominantBaseline: "middle", x: groupCoor.x, y: groupCoor.y + (i + 0.5) * lineHeight }, r.map(function (l, i2) { return (
        // every label should have its own id (used by selection
        // handler) and trigger the hoverCutSite function
        // if it's an enzyme
        React.createElement(React.Fragment, { key: l.id },
            React.createElement("tspan", { className: "la-vz-circular-label", dominantBaseline: "middle", id: l.id, tabIndex: -1, y: groupCoor.y + (i + 0.5) * lineHeight }, l.name),
            i2 < r.length - 1 || i !== labelRows.length - 1 ? "," : "")); }))); })),
        React.createElement("rect", __assign({ fill: "none", height: rectHeight, stroke: "black", strokeWidth: 1.5, width: rectWidth }, rectCoor))));
};
exports.WrappedGroupLabel = WrappedGroupLabel;


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Selection = void 0;
var React = __webpack_require__(1);
var selectionContext_1 = __webpack_require__(21);
var Circular_1 = __webpack_require__(8);
/**
 * renders the selection range of the plasmid viewer
 * consists of three parts (during an active selection):
 * 		left sidebar, right sidebar and the middle selection region
 *
 * if nothing is selected, it should just be the single cursor
 * without a middle highlighted region
 */
var Selection = /** @class */ (function (_super) {
    __extends(Selection, _super);
    function Selection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Selection.prototype.render = function () {
        var _a = this.props, findCoor = _a.findCoor, genArc = _a.genArc, getRotation = _a.getRotation, lineHeight = _a.lineHeight, radius = _a.radius, seq = _a.seq, seqLength = _a.seqLength, totalRows = _a.totalRows;
        var _b = this.context, clockwise = _b.clockwise, end = _b.end, ref = _b.ref, start = _b.start;
        if (typeof start === "undefined" || typeof end === "undefined") {
            return;
        }
        // calculate the length of the current selection region
        var selLength = 0;
        // start and end is the same, and something has been selected
        if (start === end && ref === "ALL") {
            selLength = seqLength;
        }
        else if (start > end) {
            selLength = clockwise !== false ? Math.abs(end - start + seqLength) : -Math.abs(start - end);
        }
        else if (start < end) {
            selLength = clockwise !== false ? Math.abs(end - start) : -Math.abs(start - end + seqLength);
        }
        // for all cases when the entire circle is selected
        if (Math.abs(selLength) === seqLength) {
            var adjust = selLength > 0 ? -0.1 : 0.1;
            selLength += adjust; // can't make an arc from a full circle
        }
        // const calc the size of the selection radii
        var topR = radius + lineHeight; // outer radius
        if (seq.length <= Circular_1.RENDER_SEQ_LENGTH_CUTOFF) {
            topR += 2 * lineHeight + 3;
        }
        var bAdjust = lineHeight * (totalRows - 1); // adjust bottom radius
        var bottomR = radius - bAdjust; // inner radius
        if (bottomR < 0 || topR < 0) {
            bottomR = 0;
            topR = radius;
        }
        // find start and stop coordinates to created edges
        var lineTop = findCoor(0, topR);
        var lineBottom = findCoor(0, bottomR);
        var edgePath = "M ".concat(lineBottom.x, " ").concat(lineBottom.y, "\n\t\t\tL ").concat(lineTop.x, " ").concat(lineTop.y);
        // !== false is needed because it can be undefined
        var sFlagF = clockwise !== false || ref === "ALL" ? true : false; // sweep flag of first arc
        var lArc = false;
        if (clockwise !== false && selLength > seqLength / 2) {
            lArc = true;
        }
        else if (clockwise === false && Math.abs(selLength) > seqLength / 2) {
            lArc = true;
        }
        return (React.createElement("g", null,
            selLength && (React.createElement("path", { className: "la-vz-selection", d: genArc({
                    innerRadius: bottomR,
                    largeArc: lArc,
                    length: selLength,
                    outerRadius: topR,
                    sweepFWD: sFlagF,
                }), shapeRendering: "auto", stroke: "none", transform: getRotation(start) })),
            React.createElement("path", { className: "la-vz-selection-edge", d: edgePath, shapeRendering: "geometricPrecision", strokeWidth: 1, transform: getRotation(start) }),
            selLength && (React.createElement("path", { className: "la-vz-selection-edge", d: edgePath, shapeRendering: "geometricPrecision", strokeWidth: 1, transform: getRotation(end) }))));
    };
    Selection.contextType = selectionContext_1.default;
    return Selection;
}(React.PureComponent));
exports.Selection = Selection;


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultSelection = void 0;
var React = __webpack_require__(1);
/** Initial/default selection */
exports.defaultSelection = {
    clockwise: true,
    end: 0,
    length: 0,
    name: "",
    ref: null,
    start: 0,
    type: "",
};
/** Default context object */
var SelectionContext = React.createContext(exports.defaultSelection);
SelectionContext.displayName = "SelectionContext";
exports["default"] = SelectionContext;


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventHandler = void 0;
var FloatingMenu_1 = __webpack_require__(23);
var centralIndexContext_1 = __webpack_require__(9);
var debounce_1 = __webpack_require__(25);
var React = __webpack_require__(1);
/**
 * EventHandler handles the routing of all events, including keypresses, mouse clicks, etc.
 */
var EventHandler = /** @class */ (function (_super) {
    __extends(EventHandler, _super);
    function EventHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.clickedOnce = null;
        _this.clickedTwice = null;
        _this.state = { rightClickMenu: false, xFloatingMenu: 0, yFloatingMenu: 0 };
        /**
         * action handler for a keyboard keypresses.
         */
        _this.handleKeyPress = function (e) {
            var keyType = _this.keypressMap(e);
            if (!keyType) {
                return; // not recognized key
            }
            _this.handleSeqInteraction(keyType);
        };
        /**
         * maps a keypress to an interaction (String)
         *
         * ["All", "Copy", "Up", "Right", "Down", "Left"]
         */
        _this.keypressMap = function (e) {
            var copyEvent = _this.props.copyEvent;
            if (copyEvent && copyEvent(e)) {
                return 'Copy';
            }
            var key = e.key, shiftKey = e.shiftKey;
            switch (key) {
                case 'ArrowLeft':
                case 'ArrowRight':
                case 'ArrowUp':
                case 'ArrowDown':
                    return shiftKey ? "Shift".concat(key) : key;
                default:
                    return null;
            }
        };
        /**
         * Respond to any of:
         * 	All: cmd + A, select all
         * 	Copy: cmd + C, copy
         * 	Up, Right, Down, Left: some directional movement of the cursor
         */
        _this.handleSeqInteraction = function (type) { return __awaiter(_this, void 0, void 0, function () {
            var seq, seqLength, bpsPerBlock, _a, selection, setSelection, end, start, clockwise, newPos, selLength;
            return __generator(this, function (_b) {
                seq = this.props.seq;
                seqLength = seq.length;
                bpsPerBlock = this.props.bpsPerBlock || 1;
                switch (type) {
                    case 'SelectAll': {
                        this.selectAllHotkey();
                        break;
                    }
                    case 'Copy': {
                        this.handleCopy();
                        break;
                    }
                    case 'ArrowUp':
                    case 'ArrowRight':
                    case 'ArrowDown':
                    case 'ArrowLeft':
                    case 'ShiftArrowUp':
                    case 'ShiftArrowRight':
                    case 'ShiftArrowDown':
                    case 'ShiftArrowLeft': {
                        _a = this.props, selection = _a.selection, setSelection = _a.setSelection;
                        end = selection.end, start = selection.start;
                        if (typeof start === 'undefined' || typeof end === 'undefined') {
                            return [2 /*return*/];
                        }
                        clockwise = selection.clockwise;
                        newPos = end;
                        if (type === 'ArrowUp' || type === 'ShiftArrowUp') {
                            // if there are multiple blocks or just one. If one, just inc by one
                            if (seqLength / bpsPerBlock > 1) {
                                newPos -= bpsPerBlock;
                            }
                            else {
                                newPos -= 1;
                            }
                        }
                        else if (type === 'ArrowRight' || type === 'ShiftArrowRight') {
                            newPos += 1;
                        }
                        else if (type === 'ArrowDown' || type === 'ShiftArrowDown') {
                            // if there are multiple blocks or just one. If one, just inc by one
                            if (seqLength / bpsPerBlock > 1) {
                                newPos += bpsPerBlock;
                            }
                            else {
                                newPos += 1;
                            }
                        }
                        else if (type === 'ArrowLeft' || type === 'ShiftArrowLeft') {
                            newPos -= 1;
                        }
                        if (newPos <= -1) {
                            newPos = seqLength + newPos;
                        }
                        if (newPos >= seqLength + 1) {
                            newPos -= seqLength;
                        }
                        selLength = Math.abs(start - end);
                        clockwise = selLength === 0 ? type === 'ArrowRight' || type === 'ShiftArrowRight' || type === 'ArrowDown' || type === 'ShiftArrowDown' : clockwise;
                        if (newPos !== start && !type.startsWith('Shift')) {
                            setSelection({
                                clockwise: true,
                                end: newPos,
                                start: newPos,
                                type: 'SEQ',
                            });
                        }
                        else if (type.startsWith('Shift')) {
                            setSelection({
                                clockwise: clockwise,
                                end: newPos,
                                start: start,
                                type: 'SEQ',
                            });
                        }
                        break;
                    }
                    default: {
                        break;
                    }
                }
                return [2 /*return*/];
            });
        }); };
        /**
         * Copy the current sequence selection to the user's clipboard
         */
        _this.handleCopy = function () {
            var _a = _this.props, _b = _a.selection, end = _b.end, ref = _b.ref, start = _b.start, seq = _a.seq;
            if (!document)
                return;
            var formerFocus = document.activeElement;
            var tempNode = document.createElement('textarea');
            if (ref === 'ALL') {
                tempNode.innerText = seq;
            }
            else {
                tempNode.innerText = seq.substring(start || 0, end);
            }
            if (document.body) {
                document.body.appendChild(tempNode);
            }
            tempNode.select();
            document.execCommand('copy');
            tempNode.remove();
            if (formerFocus) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'focus' does not exist on type 'Element'.
                formerFocus.focus();
            }
        };
        /**
         * select all of the sequence
         */
        _this.selectAllHotkey = function () {
            var _a = _this.props, selection = _a.selection, start = _a.selection.start, setSelection = _a.setSelection;
            var newSelection = __assign(__assign({}, selection), { clockwise: true, end: start, ref: 'ALL', start: start });
            setSelection(newSelection);
        };
        _this.handleTripleClick = function () {
            _this.selectAllHotkey();
        };
        _this.resetClicked = (0, debounce_1.default)(function () {
            _this.clickedOnce = null;
            _this.clickedTwice = null;
        }, 250);
        /**
         * if the contextMenu button is clicked, check whether it was clicked
         * over a noteworthy element, for which db mutations have been written.
         *
         * if it is, mutate the contextMenu to account for those potential interactions
         * and pass on the click. Otherwise, do nothing
         *
         * if it is a regular click, pass on as normal
         */
        _this.handleMouseEvent = function (e) {
            var handleMouseEvent = _this.props.handleMouseEvent;
            // If the right click is performed
            if (e.button === 2 && e.type === "contextmenu") {
                e.preventDefault();
                _this.setState({ rightClickMenu: true });
                // Box position (under the mouse)
                _this.setState({ xFloatingMenu: e.clientX });
                _this.setState({ yFloatingMenu: e.clientY });
                console.log(_this.props);
                return;
            }
            // Close the context menu if a left click is performed on the screen and the target is not a button 
            if (e.button !== 2 && _this.state.rightClickMenu && !(e.target instanceof HTMLButtonElement))
                _this.setState({ rightClickMenu: false });
            if (e.type === 'mouseup') {
                _this.resetClicked();
                if (_this.clickedOnce === e.target && _this.clickedTwice === e.target) {
                    _this.handleTripleClick();
                    _this.resetClicked();
                }
                else if (_this.clickedOnce === e.target && _this.clickedTwice === null) {
                    _this.clickedOnce = e.target;
                    _this.clickedTwice = e.target;
                    _this.resetClicked();
                }
                else {
                    _this.clickedOnce = e.target;
                    _this.resetClicked();
                }
            }
            var button = e.button, ctrlKey = e.ctrlKey, type = e.type;
            var ctxMenuClick = type === 'mousedown' && button === 0 && ctrlKey;
            if (e.button === 0 && !ctxMenuClick) {
                // it's a mouse drag event or an element was clicked
                handleMouseEvent(e);
            }
        };
        _this.closeMenu = function () {
            _this.setState({ rightClickMenu: false });
        };
        _this.getSelectionValue = function (key) {
            var _a;
            var children = _this.props.children;
            var nestedChilds = children.find(function (c) { return c !== false; }).props;
            if (nestedChilds.hasOwnProperty('children') && nestedChilds.children !== null) {
                nestedChilds = ((_a = nestedChilds.children.find(function (el) { return el.type.name === 'Linear'; })) === null || _a === void 0 ? void 0 : _a.props) || nestedChilds.children[0].props;
            }
            if (nestedChilds.hasOwnProperty('selection')) {
                return nestedChilds.selection[key];
            }
            return { start: 0, end: nestedChilds.seq.length }[key];
        };
        _this.render = function () { return (React.createElement("div", { className: "la-vz-viewer-event-router", id: "la-vz-event-router", role: "presentation", tabIndex: -1, onContextMenu: _this.handleMouseEvent, onKeyDown: _this.handleKeyPress, onMouseDown: _this.handleMouseEvent, onMouseMove: _this.props.handleMouseEvent, onMouseUp: _this.handleMouseEvent },
            _this.state.rightClickMenu && React.createElement(FloatingMenu_1.default, { close: _this.closeMenu, seq: _this.props.seq, start: _this.getSelectionValue('start'), end: _this.getSelectionValue('end'), top: _this.state.yFloatingMenu, left: _this.state.xFloatingMenu }),
            _this.props.children)); };
        return _this;
    }
    EventHandler.contextType = centralIndexContext_1.default;
    return EventHandler;
}(React.PureComponent));
exports.EventHandler = EventHandler;


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var React = __webpack_require__(1);
var sequence_1 = __webpack_require__(24);
var sequence_2 = __webpack_require__(24);
function FloatingMenu(_a) {
    var close = _a.close, seq = _a.seq, start = _a.start, end = _a.end, top = _a.top, left = _a.left, _b = _a.seqComp, seqComp = _b === void 0 ? '' : _b;
    var Dna = function (e) {
        e.preventDefault();
        copyOnClipboard(seq, start, end);
        close();
    };
    var DnaCompare = function (e) {
        e.preventDefault();
        copyOnClipboard(seqComp, start, end);
        close();
    };
    var ComplementDna = function (e) {
        e.preventDefault();
        var val = (0, sequence_1.complement)(seq, 'dna');
        copyOnClipboard(val.compSeq, start, end);
        close();
    };
    var ReverseDna = function (e) {
        e.preventDefault();
        var val = (0, sequence_1.reverseComplement)(seq, 'dna');
        copyOnClipboard(val, seq.length - end, seq.length - start);
        close();
    };
    var Translation = function (e) {
        e.preventDefault();
        if (!(start % 3 === 0 && (end - 1) % 3 === 2)) {
            alert('You are selecting a sequence with blocks other than multiples of 3, the translation will not be the same as that of the entire sequence');
        }
        var val = (0, sequence_1.translate)(seq.substring(start || 0, end), 'dna');
        copyOnClipboard(val, 0, val.length);
        close();
    };
    var copyOnClipboard = function (text, start, end) {
        if (!document)
            return;
        var tempNode = document.createElement('textarea');
        tempNode.innerText = text.substring(start || 0, end);
        if (document.body) {
            document.body.appendChild(tempNode);
        }
        tempNode.select();
        document.execCommand('copy');
        tempNode.remove();
    };
    return (
    // TODO: change guess method to include - symbol
    React.createElement("div", { className: "la-fm-container", style: { top: top - 50, left: left } },
        seqComp !== '' &&
            React.createElement(React.Fragment, null,
                React.createElement("button", { onClick: Dna }, "Copy sequence one"),
                React.createElement("button", { onClick: DnaCompare }, "Copy sequence two")),
        seqComp === '' && (0, sequence_2.guessType)(seq) === 'aa' && React.createElement("button", { onClick: Dna }, "Copy protein sequence"),
        seqComp === '' && (0, sequence_2.guessType)(seq) === 'dna' && React.createElement("button", { onClick: Dna }, "Copy DNA sequence"),
        seqComp === '' && (0, sequence_2.guessType)(seq) === 'dna' && React.createElement("button", { onClick: ComplementDna }, "Copy complement"),
        seqComp === '' && (0, sequence_2.guessType)(seq) === 'dna' && React.createElement("button", { onClick: ReverseDna }, "Copy reverse complement"),
        seqComp === '' && (0, sequence_2.guessType)(seq) === 'dna' && React.createElement("button", { onClick: Translation }, "Copy translation")));
}
exports["default"] = FloatingMenu;


/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.randomID = exports.createTranslations = exports.translate = exports.directionality = exports.reverseComplement = exports.complement = exports.reverse = exports.guessType = exports.getAlphabet = exports.nucleotides = void 0;
/**
 * Map of nucleotide bases
 */
exports.nucleotides = { a: "a", c: "c", g: "g", t: "t", u: "u" };
/**
 * Map of DNA basepairs to all the bases encoded by that character in the DNA alphabet.
 *
 * https://meme-suite.org/meme/doc/alphabets.html
 */
var dnaAlphabet = {
    // ".": { a: "a", c: "c", g: "g", t: "t" },
    b: { c: "c", g: "g", t: "t" },
    d: { a: "a", g: "g", t: "t" },
    h: { a: "a", c: "c", t: "t" },
    k: { g: "g", t: "t" },
    m: { a: "a", c: "c" },
    n: { a: "a", c: "c", g: "g", t: "t" },
    r: { a: "a", g: "g" },
    s: { c: "c", g: "g" },
    v: { a: "a", c: "c", g: "g" },
    w: { a: "a", t: "t" },
    x: { a: "a", c: "c", g: "g", t: "t" },
    y: { c: "c", t: "t" },
};
/**
 * Map of RNA basepairs to all the bases encoded by that character in the RNA alphabet.
 *
 * https://meme-suite.org/meme/doc/alphabets.html
 */
var rnaAlphabet = {
    // ".": { c: "c", g: "g", u: "u" },
    b: { c: "c", g: "g", u: "u" },
    d: { a: "a", g: "g", u: "u" },
    h: { a: "a", c: "c", u: "u" },
    k: { g: "g", u: "u" },
    m: { a: "a", c: "c" },
    n: { a: "a", c: "c", g: "g", u: "u" },
    r: { a: "a", g: "g" },
    s: { c: "c", g: "g" },
    v: { a: "a", c: "c", g: "g" },
    w: { a: "a", u: "u" },
    x: { a: "a", c: "c", g: "g", u: "u" },
    y: { c: "c", u: "u" },
};
/**
 * mapping the 64 standard codons to amino acids
 *
 * adapted from: "https://github.com/keithwhor/NtSeq/blob/master/lib/nt.js
 */
var dnaCodonToAminoAcid = {
    AAA: "K",
    AAC: "N",
    AAG: "K",
    AAT: "N",
    ACA: "T",
    ACC: "T",
    ACG: "T",
    ACT: "T",
    AGA: "R",
    AGC: "S",
    AGG: "R",
    AGT: "S",
    ATA: "I",
    ATC: "I",
    ATG: "M",
    ATT: "I",
    CAA: "Q",
    CAC: "H",
    CAG: "Q",
    CAT: "H",
    CCA: "P",
    CCC: "P",
    CCG: "P",
    CCT: "P",
    CGA: "R",
    CGC: "R",
    CGG: "R",
    CGT: "R",
    CTA: "L",
    CTC: "L",
    CTG: "L",
    CTT: "L",
    GAA: "E",
    GAC: "D",
    GAG: "E",
    GAT: "D",
    GCA: "A",
    GCC: "A",
    GCG: "A",
    GCT: "A",
    GGA: "G",
    GGC: "G",
    GGG: "G",
    GGT: "G",
    GTA: "V",
    GTC: "V",
    GTG: "V",
    GTT: "V",
    TAA: "*",
    TAC: "Y",
    TAG: "*",
    TAT: "Y",
    TCA: "S",
    TCC: "S",
    TCG: "S",
    TCT: "S",
    TGA: "*",
    TGC: "C",
    TGG: "W",
    TGT: "C",
    TTA: "L",
    TTC: "F",
    TTG: "L",
    TTT: "F",
};
var aminoAcids = Array.from(new Set(Object.values(dnaCodonToAminoAcid)).values()).join("");
var aminoAcidsMap = aminoAcids
    .toLowerCase()
    .split("")
    .filter(function (aa) { return aa !== "*"; }) // TODO
    .reduce(function (acc, aa) {
    var _a;
    return (__assign(__assign({}, acc), (_a = {}, _a[aa] = aa, _a)));
}, {});
/**
 * Map of amino acids alphabet characters to what each matches.
 *
 * https://meme-suite.org/meme/doc/alphabets.html
 */
var aaAlphabet = {
    b: { d: "d", n: "n" },
    j: { i: "i", l: "l" },
    x: aminoAcidsMap,
    z: { e: "e", q: "q" },
};
/** Given a seq type, return the associated symbol alphabet */
var getAlphabet = function (seqType) {
    return {
        aa: aaAlphabet,
        dna: dnaAlphabet,
        rna: rnaAlphabet,
        unknown: dnaAlphabet,
    }[seqType];
};
exports.getAlphabet = getAlphabet;
var aminoAcidRegex = new RegExp("^[".concat(aminoAcids, "BJXZ,-]+$"), "i");
/**
 * Infer the type of a sequence. This is *without* any ambiguous symbols, so maybe wrong by being overly strict.
 */
var guessType = function (seq) {
    seq = seq.substring(0, 1000);
    if (/^[atgcn,-.]+$/i.test(seq)) {
        return "dna";
    }
    else if (/^[augcn,-.]+$/i.test(seq)) {
        return "rna";
    }
    else if (aminoAcidRegex.test(seq)) {
        return "aa";
    }
    return "unknown";
};
exports.guessType = guessType;
/**
 * Reverses a string sequence
 */
var reverse = function (seq) { return seq.split("").reverse().join(""); };
exports.reverse = reverse;
// from http://arep.med.harvard.edu/labgc/adnan/projects/Utilities/revcomp.html
var dnaComp = {
    "|": "|",
    ".": ".",
    "-": "-",
    a: "t",
    b: "v",
    c: "g",
    d: "h",
    g: "c",
    h: "d",
    k: "m",
    m: "k",
    n: "n",
    r: "y",
    s: "s",
    t: "a",
    u: "a",
    v: "b",
    w: "w",
    x: "x",
    y: "r",
};
dnaComp = __assign(__assign({}, dnaComp), Object.keys(dnaComp).reduce(function (acc, k) {
    var _a;
    return (__assign(__assign({}, acc), (_a = {}, _a[k.toUpperCase()] = dnaComp[k].toUpperCase(), _a)));
}, {}));
/**
 * A map from each basepair to its complement
 */
var typeToCompMap = {
    aa: Object.keys(aminoAcidsMap).reduce(function (acc, k) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[k.toUpperCase()] = "", _a[k.toLowerCase()] = "", _a)));
    }, {
        B: "",
        J: "",
        Z: "",
        b: "",
        j: "",
        z: "",
    }),
    dna: dnaComp,
    rna: __assign(__assign({}, dnaComp), { A: "U", a: "u" }),
    unknown: dnaComp,
    undefined: dnaComp
};
/**
 * Return the filtered sequence and its complement if its an empty string, return the same for both.
 */
var complement = function (origSeq, seqType) {
    if (!origSeq) {
        return { compSeq: "", seq: "" };
    }
    var compMap = typeToCompMap[seqType];
    // filter out unrecognized base pairs and build up the complement
    var seq = "";
    var compSeq = "";
    for (var i = 0, origLength = origSeq.length; i < origLength; i += 1) {
        if (origSeq[i] in compMap) {
            seq += origSeq[i];
            compSeq += compMap[origSeq[i]];
        }
    }
    return { compSeq: compSeq, seq: seq };
};
exports.complement = complement;
/**
 * Return the reverse complement of a DNA sequence
 */
var reverseComplement = function (inputSeq, seqType) {
    var compSeq = (0, exports.complement)(inputSeq, seqType).compSeq;
    return compSeq.split("").reverse().join("");
};
exports.reverseComplement = reverseComplement;
var fwd = new Set(["FWD", "fwd", "FORWARD", "forward", "FOR", "for", "TOP", "top", "1", 1]);
var rev = new Set(["REV", "rev", "REVERSE", "reverse", "BOTTOM", "bottom", "-1", -1]);
/**
 * Parse the user defined direction, estimate the direction of the element
 *
 * ```js
 * directionality("FWD") => 1
 * directionality("FORWARD") => 1
 * ```
 */
var directionality = function (direction) {
    if (!direction) {
        return 0;
    }
    if (fwd.has(direction)) {
        return 1;
    }
    if (rev.has(direction)) {
        return -1;
    }
    return 0;
};
exports.directionality = directionality;
var rnaCodonToAminoAcid = Object.keys(dnaCodonToAminoAcid).reduce(function (acc, k) {
    var _a;
    return (__assign(__assign({}, acc), (_a = {}, _a[k.replace(/T/gi, "U")] = dnaCodonToAminoAcid[k], _a)));
}, {});
/**
 * Given a sequence, translate it into an Amino Acid sequence
 */
var translate = function (seqInput, seqType) {
    if (seqType === "aa") {
        return seqInput;
    }
    var codonMap = dnaCodonToAminoAcid;
    if (seqType === "rna") {
        codonMap = rnaCodonToAminoAcid;
    }
    var seq = seqInput.toUpperCase();
    var seqLength = seq.length;
    var aaSeq = "";
    for (var i = 0; i < seqLength; i += 3) {
        if (i + 2 < seqLength) {
            aaSeq += codonMap[seq[i] + seq[i + 1] + seq[i + 2]] || "?";
        }
    }
    return aaSeq;
};
exports.translate = translate;
/**
 * for each translation (range + direction) and the input sequence, convert it to a translation and amino acid sequence
 */
var createTranslations = function (translations, seq, seqType) {
    // elongate the original sequence to account for translations that cross the zero index
    var seqDoubled = seq + seq;
    var bpPerBlock = seqType === "aa" ? 1 : 3;
    return translations.map(function (t) {
        var direction = t.direction, start = t.start;
        var end = t.end;
        if (start > end)
            end += seq.length;
        // TODO: below will fail on an "aa" type sequence if direction = -1. At the time of writing, this won't be reached, anyway
        // get the subsequence
        var subSeq = direction === 1 ? seqDoubled.substring(start, end) : (0, exports.reverseComplement)(seqDoubled.substring(start, end), seqType);
        // translate the subsequence
        var aaSeq = direction === 1 ? (0, exports.translate)(subSeq, seqType) : (0, exports.translate)(subSeq, seqType).split("").reverse().join(""); // translate
        // the starting point for the translation, reading left to right (regardless of translation
        // direction). this is later needed to calculate the number of bps needed in the first
        // and last codons
        var tStart = direction === 1 ? start : end - aaSeq.length * bpPerBlock;
        var tEnd = direction === 1 ? (start + aaSeq.length * bpPerBlock) % seq.length : end % seq.length;
        // treating one particular edge case where the start at zero doesn't make sense
        if (tEnd === 0) {
            tEnd += seq.length;
        }
        return __assign(__assign({ id: (0, exports.randomID)(), name: "translation" }, t), { AAseq: aaSeq, end: tEnd, start: tStart });
    });
};
exports.createTranslations = createTranslations;
/**
 * Create a random 10 digit string ID
 *
 * Lazily copied from StackOverflow: https://stackoverflow.com/a/57355127
 */
var randomID = function (n) {
    if (n === void 0) { n = 10; }
    var add = 1;
    var max = 12 - add;
    max = Math.pow(10, n + add);
    var min = max / 10; // Math.pow(10, n) basically
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
    return String(number).substring(add);
};
exports.randomID = randomID;


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * from: https://davidwalsh.name/javascript-debounce-function
 */
exports["default"] = (function (func, wait, immediate) {
    if (immediate === void 0) { immediate = true; }
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var later = function () {
            timeout = null;
            if (!immediate)
                func.apply(this, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(this, args);
        }
    };
});


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MultipleEventHandler = void 0;
var FloatingMenu_1 = __webpack_require__(23);
var centralIndexContext_1 = __webpack_require__(9);
var AlignmentStatistics_1 = __webpack_require__(27);
var debounce_1 = __webpack_require__(25);
var React = __webpack_require__(1);
var sequence_1 = __webpack_require__(24);
/**
 * EventHandler handles the routing of all events, including keypresses, mouse clicks, etc.
 */
var MultipleEventHandler = /** @class */ (function (_super) {
    __extends(MultipleEventHandler, _super);
    function MultipleEventHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.clickedOnce = null;
        _this.clickedTwice = null;
        _this.state = { rightClickMenu: false, xFloatingMenu: 0, yFloatingMenu: 0 };
        /**
         * action handler for a keyboard keypresses.
         */
        _this.handleKeyPress = function (e) {
            var keyType = _this.keypressMap(e);
            if (!keyType) {
                return; // not recognized key
            }
            _this.handleSeqInteraction(keyType);
        };
        /**
         * maps a keypress to an interaction (String)
         *
         * ["All", "Copy", "Up", "Right", "Down", "Left"]
         */
        _this.keypressMap = function (e) {
            var copyEvent = _this.props.copyEvent;
            if (copyEvent && copyEvent(e)) {
                return 'Copy';
            }
            var key = e.key, shiftKey = e.shiftKey;
            switch (key) {
                case 'ArrowLeft':
                case 'ArrowRight':
                case 'ArrowUp':
                case 'ArrowDown':
                    return shiftKey ? "Shift".concat(key) : key;
                default:
                    return null;
            }
        };
        /**
         * Respond to any of:
         * 	All: cmd + A, select all
         * 	Copy: cmd + C, copy
         * 	Up, Right, Down, Left: some directional movement of the cursor
         */
        _this.handleSeqInteraction = function (type) { return __awaiter(_this, void 0, void 0, function () {
            var seq, seqLength, bpsPerBlock, _a, selection, setSelection, end, start, clockwise, newPos, selLength;
            return __generator(this, function (_b) {
                seq = this.props.seq;
                seqLength = seq.length;
                bpsPerBlock = this.props.bpsPerBlock || 1;
                switch (type) {
                    case 'SelectAll': {
                        this.selectAllHotkey();
                        break;
                    }
                    case 'Copy': {
                        this.handleCopy();
                        break;
                    }
                    case 'ArrowUp':
                    case 'ArrowRight':
                    case 'ArrowDown':
                    case 'ArrowLeft':
                    case 'ShiftArrowUp':
                    case 'ShiftArrowRight':
                    case 'ShiftArrowDown':
                    case 'ShiftArrowLeft': {
                        _a = this.props, selection = _a.selection, setSelection = _a.setSelection;
                        end = selection.end, start = selection.start;
                        if (typeof start === 'undefined' || typeof end === 'undefined') {
                            return [2 /*return*/];
                        }
                        clockwise = selection.clockwise;
                        newPos = end;
                        if (type === 'ArrowUp' || type === 'ShiftArrowUp') {
                            // if there are multiple blocks or just one. If one, just inc by one
                            if (seqLength / bpsPerBlock > 1) {
                                newPos -= bpsPerBlock;
                            }
                            else {
                                newPos -= 1;
                            }
                        }
                        else if (type === 'ArrowRight' || type === 'ShiftArrowRight') {
                            newPos += 1;
                        }
                        else if (type === 'ArrowDown' || type === 'ShiftArrowDown') {
                            // if there are multiple blocks or just one. If one, just inc by one
                            if (seqLength / bpsPerBlock > 1) {
                                newPos += bpsPerBlock;
                            }
                            else {
                                newPos += 1;
                            }
                        }
                        else if (type === 'ArrowLeft' || type === 'ShiftArrowLeft') {
                            newPos -= 1;
                        }
                        if (newPos <= -1) {
                            newPos = seqLength + newPos;
                        }
                        if (newPos >= seqLength + 1) {
                            newPos -= seqLength;
                        }
                        selLength = Math.abs(start - end);
                        clockwise = selLength === 0 ? type === 'ArrowRight' || type === 'ShiftArrowRight' || type === 'ArrowDown' || type === 'ShiftArrowDown' : clockwise;
                        if (newPos !== start && !type.startsWith('Shift')) {
                            setSelection({
                                clockwise: true,
                                end: newPos,
                                start: newPos,
                                type: 'SEQ',
                            });
                        }
                        else if (type.startsWith('Shift')) {
                            setSelection({
                                clockwise: clockwise,
                                end: newPos,
                                start: start,
                                type: 'SEQ',
                            });
                        }
                        break;
                    }
                    default: {
                        break;
                    }
                }
                return [2 /*return*/];
            });
        }); };
        /**
         * Copy the current sequence selection to the user's clipboard
         */
        _this.handleCopy = function () {
            var _a = _this.props, _b = _a.selection, end = _b.end, ref = _b.ref, start = _b.start, seq = _a.seq;
            if (!document)
                return;
            var formerFocus = document.activeElement;
            var tempNode = document.createElement('textarea');
            if (ref === 'ALL') {
                tempNode.innerText = seq[0];
            }
            else {
                tempNode.innerText = seq[0].substring(start || 0, end);
            }
            if (document.body) {
                document.body.appendChild(tempNode);
            }
            tempNode.select();
            document.execCommand('copy');
            tempNode.remove();
            if (formerFocus) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'focus' does not exist on type 'Element'.
                formerFocus.focus();
            }
        };
        /**
         * select all of the sequence
         */
        _this.selectAllHotkey = function () {
            var _a = _this.props, selection = _a.selection, start = _a.selection.start, setSelection = _a.setSelection;
            var newSelection = __assign(__assign({}, selection), { clockwise: true, end: start, ref: 'ALL', start: start });
            setSelection(newSelection);
        };
        _this.handleTripleClick = function () {
            _this.selectAllHotkey();
        };
        _this.resetClicked = (0, debounce_1.default)(function () {
            _this.clickedOnce = null;
            _this.clickedTwice = null;
        }, 250);
        /**
         * if the contextMenu button is clicked, check whether it was clicked
         * over a noteworthy element, for which db mutations have been written.
         *
         * if it is, mutate the contextMenu to account for those potential interactions
         * and pass on the click. Otherwise, do nothing
         *
         * if it is a regular click, pass on as normal
         */
        _this.handleMouseEvent = function (e) {
            var handleMouseEvent = _this.props.handleMouseEvent;
            // If the right click is performed
            if (e.button === 2 && e.type === "contextmenu") {
                e.preventDefault();
                _this.setState({ rightClickMenu: true });
                // Box position (under the mouse)
                _this.setState({ xFloatingMenu: e.clientX });
                _this.setState({ yFloatingMenu: e.clientY });
                return;
            }
            // Close the context menu if a left click is performed on the screen and the target is not a button 
            if (e.button !== 2 && _this.state.rightClickMenu && !(e.target instanceof HTMLButtonElement))
                _this.setState({ rightClickMenu: false });
            if (e.type === 'mouseup') {
                _this.resetClicked();
                if (_this.clickedOnce === e.target && _this.clickedTwice === e.target) {
                    _this.handleTripleClick();
                    _this.resetClicked();
                }
                else if (_this.clickedOnce === e.target && _this.clickedTwice === null) {
                    _this.clickedOnce = e.target;
                    _this.clickedTwice = e.target;
                    _this.resetClicked();
                }
                else {
                    _this.clickedOnce = e.target;
                    _this.resetClicked();
                }
            }
            var button = e.button, ctrlKey = e.ctrlKey, type = e.type;
            var ctxMenuClick = type === 'mousedown' && button === 0 && ctrlKey;
            if (e.button === 0 && !ctxMenuClick) {
                // it's a mouse drag event or an element was clicked
                handleMouseEvent(e);
            }
        };
        _this.closeMenu = function () {
            _this.setState({ rightClickMenu: false });
        };
        _this.render = function () { return (React.createElement("div", { className: "la-vz-viewer-event-router", id: "la-vz-event-router", role: "presentation", tabIndex: -1, style: { display: "flex", flexDirection: "column" }, onContextMenu: _this.handleMouseEvent, onKeyDown: _this.handleKeyPress, onMouseDown: _this.handleMouseEvent, onMouseMove: _this.props.handleMouseEvent, onMouseUp: _this.handleMouseEvent },
            React.createElement(AlignmentStatistics_1.default, { seq: _this.props.seq[0], seqToCompare: _this.props.seq[1], seqType: (0, sequence_1.guessType)(_this.props.seq[0]) }),
            _this.state.rightClickMenu && React.createElement(FloatingMenu_1.default, { close: _this.closeMenu, seq: _this.props.seq[0], start: _this.props.children.props.selection.start, end: _this.props.children.props.selection.end, seqComp: _this.props.seq[1], top: _this.state.yFloatingMenu, left: _this.state.xFloatingMenu }),
            _this.props.children)); };
        return _this;
    }
    MultipleEventHandler.contextType = centralIndexContext_1.default;
    return MultipleEventHandler;
}(React.PureComponent));
exports.MultipleEventHandler = MultipleEventHandler;


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var React = __webpack_require__(1);
function AlignmentStatistics(_a) {
    var seq = _a.seq, seqToCompare = _a.seqToCompare, seqType = _a.seqType;
    var generateFunctionSymbol = function () {
        var blossom_block = [
            ['c'],
            ['s', 't', 'a', 'g', 'p'],
            ['d', 'e', 'q', 'n'],
            ['k', 'r', 'h'],
            ['m', 'i', 'l', 'v'],
            ['f', 'y', 'w']
        ];
        var seqSymbols = '';
        if (seqType === 'aa') {
            seqToCompare.split('').forEach(function (c, i) { return seqSymbols += (blossom_block.find(function (block) { return block.includes(c.toLowerCase()); }) || []).includes(seq[i].toLowerCase()) ? (seq[i] === c) ? '|' : '.' : (seq[i] === '-' || c === '-') ? '-' : '*'; });
        }
        else {
            seqToCompare.split('').forEach(function (c, i) { return seqSymbols += [c, seq[i]].includes('-') ? ' ' : c === seq[i] ? '|' : '.'; });
        }
        return "".concat(seqSymbols);
    };
    return (React.createElement("div", { style: { border: '1px solid grey', margin: '10px', borderRadius: '1rem' } },
        React.createElement("div", { style: { margin: '10px', fontFamily: 'sans-serif' } },
            React.createElement("b", null, "Seq1 Length (Length of seq without \u201C-\u201C)"),
            ":",
            seq.split("").filter(function (el) { return el !== '-'; }).length),
        React.createElement("div", { style: { margin: '10px', fontFamily: 'sans-serif' } },
            React.createElement("b", null, "Seq2 Length (Length of seq without \u201C-\u201C)"),
            ":",
            seqToCompare.split("").filter(function (el) { return el !== '-'; }).length),
        React.createElement("div", { style: { margin: '10px', fontFamily: 'sans-serif' } },
            React.createElement("b", null, "Number of mismatches (All non-gap position that are not \u201C|\u201D or \u201C.\u201D)"),
            ": ",
            generateFunctionSymbol().split('').reduce(function (a, c) { if (c === '*')
                return a += 1; return a; }, 0),
            " "),
        React.createElement("div", { style: { margin: '10px', fontFamily: 'sans-serif' } },
            React.createElement("b", null, "Seq1 Fraction Identical(Number of non-gap (no \u201C-\u201C) identical (\u201C|\u201D) / Number of non-gap (no \u201C-\u201C))"),
            ": ",
            (generateFunctionSymbol().split('').reduce(function (a, c) { if (c === '|')
                return a += 1; return a; }, 0) / seq.split("").filter(function (el) { return el !== '-'; }).length).toFixed(2)),
        React.createElement("div", { style: { margin: '10px', fontFamily: 'sans-serif' } },
            React.createElement("b", null, "Seq2 Fraction Identical(Same as above, but for Seq2)"),
            ": ",
            (generateFunctionSymbol().split('').reduce(function (a, c) { if (c === '|')
                return a += 1; return a; }, 0) / seqToCompare.split("").filter(function (el) { return el !== '-'; }).length).toFixed(2)),
        React.createElement("div", { style: { margin: '10px', fontFamily: 'sans-serif' } },
            React.createElement("b", null, "Seq1 Coverage(Number of aligned positions (\u201C|\u201D or \u201C.\u201D) / Seq1 Length (without gaps))"),
            ": ",
            (generateFunctionSymbol().split('').reduce(function (a, c) { if (['|', '.'].includes(c))
                return a += 1; return a; }, 0) / seq.split("").filter(function (el) { return el !== '-'; }).length).toFixed(2)),
        React.createElement("div", { style: { margin: '10px', fontFamily: 'sans-serif' } },
            React.createElement("b", null, "Seq2 Coverage"),
            ": ",
            (generateFunctionSymbol().split('').reduce(function (a, c) { if (['|', '.'].includes(c))
                return a += 1; return a; }, 0) / seqToCompare.split("").filter(function (el) { return el !== '-'; }).length).toFixed(2))));
}
exports["default"] = AlignmentStatistics;


/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var React = __webpack_require__(1);
var elementsToRows_1 = __webpack_require__(10);
var isEqual_1 = __webpack_require__(11);
var sequence_1 = __webpack_require__(24);
var InfiniteScroll_1 = __webpack_require__(29);
var SeqBlock_1 = __webpack_require__(30);
/**
 * A linear sequence viewer.
 *
 * Comprised of SeqBlock(s), which are themselves comprised of:
 * 	text (seq)
 * 	Index (axis)
 * 	Annotations
 *  Finds
 *  Translations
 *  Selections
 */
var Linear = /** @class */ (function (_super) {
    __extends(Linear, _super);
    function Linear() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Deep equality comparison
         */
        _this.shouldComponentUpdate = function (nextProps) { return !(0, isEqual_1.isEqual)(nextProps, _this.props); };
        return _this;
    }
    /**
     * given all the information needed to render all the seqblocks (ie, sequence, compSeq
     * list of annotations), cut up all that information into an array.
     * Each element in that array pertaining to one SeqBlock
     *
     * For example, if each seqblock has 2 bps, and the seq is "ATGCAG", this should first
     * make an array of ["AT", "GC", "AG"], and then pass "AT" to the first SeqBlock, "GC" to
     * the second seqBlock, and "AG" to the third seqBlock.
     */
    Linear.prototype.render = function () {
        var _a = this.props, annotations = _a.annotations, bpsPerBlock = _a.bpsPerBlock, compSeq = _a.compSeq, cutSites = _a.cutSites, elementHeight = _a.elementHeight, highlights = _a.highlights, lineHeight = _a.lineHeight, onUnmount = _a.onUnmount, search = _a.search, seq = _a.seq, seqType = _a.seqType, showComplement = _a.showComplement, showIndex = _a.showIndex, size = _a.size, translations = _a.translations, zoom = _a.zoom;
        // un-official definition for being zoomed in. Being over 10 seems like a decent cut-off
        var zoomed = zoom.linear > 10;
        // the actual fragmenting of the sequence into subblocks. generates all info that will be needed
        // including sequence blocks, complement blocks, annotations, blockHeights
        var seqLength = seq.length;
        var arrSize = Math.round(Math.ceil(seqLength / bpsPerBlock));
        if (arrSize === Number.POSITIVE_INFINITY)
            arrSize = 1;
        var ids = new Array(arrSize); // array of SeqBlock ids
        var seqs = new Array(arrSize); // arrays for sequences...
        var compSeqs = new Array(arrSize); // complements...
        var blockHeights = new Array(arrSize); // block heights...
        var cutSiteRows = cutSites.length
            ? (0, elementsToRows_1.createSingleRows)(cutSites, bpsPerBlock, arrSize)
            : new Array(arrSize).fill([]);
        /**
         * Vet the annotations for starts and ends at zero index
         */
        var vetAnnotations = function (annotations) {
            annotations.forEach(function (ann) {
                if (ann.end === 0 && ann.start > ann.end)
                    ann.end = seqLength;
                if (ann.start === seqLength && ann.end < ann.start)
                    ann.start = 0;
            });
            return annotations;
        };
        var annotationRows = (0, elementsToRows_1.createMultiRows)((0, elementsToRows_1.stackElements)(vetAnnotations(annotations), seq.length), bpsPerBlock, arrSize);
        var searchRows = search && search.length ? (0, elementsToRows_1.createSingleRows)(search, bpsPerBlock, arrSize) : new Array(arrSize).fill([]);
        var highlightRows = (0, elementsToRows_1.createSingleRows)(highlights, bpsPerBlock, arrSize);
        var translationRows = translations.length
            ? (0, elementsToRows_1.createSingleRows)((0, sequence_1.createTranslations)(translations, seq, seqType), bpsPerBlock, arrSize)
            : new Array(arrSize).fill([]);
        for (var i = 0; i < arrSize; i += 1) {
            var firstBase = i * bpsPerBlock;
            var lastBase = firstBase + bpsPerBlock;
            // cut the new sequence and, if also looking for complement, the complement as well
            seqs[i] = seq.substring(firstBase, lastBase);
            compSeqs[i] = compSeq.substring(firstBase, lastBase);
            // store a unique id from the block
            ids[i] = seqs[i] + String(i);
            // find the line height for the seq block based on how many rows need to be shown
            var blockHeight = lineHeight * 1.1; // this is for padding between the SeqBlocks
            if (seqType != "aa") {
                blockHeight += lineHeight; // for sequence row
            }
            if (zoomed) {
                blockHeight += showComplement ? lineHeight : 0; // double for complement + 2px margin
            }
            if (showIndex) {
                blockHeight += lineHeight; // another for index row
            }
            if (translationRows[i].length) {
                blockHeight += translationRows[i].length * elementHeight;
            }
            if (annotationRows[i].length) {
                blockHeight += annotationRows[i].length * elementHeight;
            }
            if (cutSiteRows[i].length) {
                blockHeight += lineHeight; // space for cutsite name
            }
            blockHeights[i] = blockHeight;
        }
        var seqBlocks = [];
        var yDiff = 0;
        for (var i = 0; i < arrSize; i += 1) {
            var firstBase = i * bpsPerBlock;
            seqBlocks.push(React.createElement(SeqBlock_1.SeqBlock, { key: ids[i], annotationRows: annotationRows[i], blockHeight: blockHeights[i], bpColors: this.props.bpColors, bpsPerBlock: bpsPerBlock, charWidth: this.props.charWidth, compSeq: compSeqs[i], cutSiteRows: cutSiteRows[i], elementHeight: elementHeight, firstBase: firstBase, fullSeq: seq, handleMouseEvent: this.props.handleMouseEvent, highlights: highlightRows[i], id: ids[i], inputRef: this.props.inputRef, colorized: this.props.colorized, lineHeight: lineHeight, searchRows: searchRows[i], seq: seqs[i], seqFontSize: this.props.seqFontSize, seqType: seqType, showComplement: showComplement, showIndex: showIndex, size: size, translations: translationRows[i], y: yDiff, zoom: zoom, zoomed: zoomed, onUnmount: onUnmount }));
            yDiff += blockHeights[i];
        }
        return (seqBlocks.length && (React.createElement(InfiniteScroll_1.InfiniteScroll, { blockHeights: blockHeights, bpsPerBlock: bpsPerBlock, seqBlocks: seqBlocks, seqBlocksCompare: seqBlocks, seqBlocksSymbols: seqBlocks, alignment: false, size: size, totalHeight: blockHeights.reduce(function (acc, h) { return acc + h; }, 0) })));
    };
    return Linear;
}(React.Component));
exports["default"] = Linear;


/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InfiniteScroll = void 0;
var centralIndexContext_1 = __webpack_require__(9);
var isEqual_1 = __webpack_require__(11);
var React = __webpack_require__(1);
/**
 * InfiniteScroll is a wrapper around the seqBlocks. Renders only the seqBlocks that are
 * within the range of the current dom viewerport
 *
 * This component should sense scroll events and, during one, recheck which sequences are shown.
 */
var InfiniteScroll = /** @class */ (function (_super) {
    __extends(InfiniteScroll, _super);
    function InfiniteScroll(props) {
        var _this = _super.call(this, props) || this;
        _this.scroller = React.createRef(); // ref to a div for scrolling
        _this.insideDOM = React.createRef(); // ref to a div inside the scroller div
        _this.componentDidMount = function () {
            _this.handleScrollOrResize(); // ref should now be set
            window.addEventListener('resize', _this.handleScrollOrResize);
        };
        _this.componentDidUpdate = function (prevProps, prevState, snapshot) {
            if (!_this.scroller.current) {
                // scroller not mounted yet
                return;
            }
            var _a = _this.props, seqBlocks = _a.seqBlocks, size = _a.size;
            var _b = _this.state, centralIndex = _b.centralIndex, visibleBlocks = _b.visibleBlocks;
            if (_this.context && centralIndex !== _this.context.linear) {
                _this.scrollToCentralIndex();
            }
            else if (!(0, isEqual_1.isEqual)(prevProps.size, size) || seqBlocks.length !== prevProps.seqBlocks.length) {
                _this.handleScrollOrResize(); // reset
            }
            else if ((0, isEqual_1.isEqual)(prevState.visibleBlocks, visibleBlocks)) {
                _this.restoreSnapshot(snapshot); // something, like ORFs or index view, has changed
            }
        };
        _this.componentWillUnmount = function () {
            window.removeEventListener('resize', _this.handleScrollOrResize);
        };
        /**
         * more info at: https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate
         */
        _this.getSnapshotBeforeUpdate = function (prevProps) {
            // find the current top block
            var top = _this.scroller.current ? _this.scroller.current.scrollTop : 0;
            // find out 1) which block this is at the edge of the top
            // and 2) how far from the top of that block we are right now
            var blockHeights = prevProps.blockHeights;
            var blockIndex = 0;
            var accumulatedY = 0;
            do {
                accumulatedY += blockHeights[blockIndex];
                blockIndex += 1;
            } while (accumulatedY + blockHeights[blockIndex] < top && blockIndex < blockHeights.length);
            var blockY = top - accumulatedY; // last extra distance
            return { blockIndex: blockIndex, blockY: blockY };
        };
        /**
         * Scroll to centralIndex. Likely from circular clicking on an element
         * that should then be scrolled to in linear
         */
        _this.scrollToCentralIndex = function () {
            if (!_this.scroller.current) {
                return;
            }
            var _a = _this.props, blockHeights = _a.blockHeights, bpsPerBlock = _a.bpsPerBlock, seqBlocks = _a.seqBlocks, height = _a.size.height, totalHeight = _a.totalHeight;
            var visibleBlocks = _this.state.visibleBlocks;
            var _b = _this.scroller.current, clientHeight = _b.clientHeight, scrollHeight = _b.scrollHeight;
            var centralIndex = _this.context.linear;
            // find the first block that contains the new central index
            var centerBlockIndex = seqBlocks.findIndex(function (block) { return block.props.firstBase <= centralIndex && block.props.firstBase + bpsPerBlock >= centralIndex; });
            // build up the list of blocks that are visible just beneath this first block
            var newVisibleBlocks = [];
            if (scrollHeight <= clientHeight) {
                newVisibleBlocks = visibleBlocks;
            }
            else if (centerBlockIndex > -1) {
                var centerBlock = seqBlocks[centerBlockIndex];
                // create some padding above the new center block
                var topAdjust = centerBlockIndex > 0 ? blockHeights[centerBlockIndex - 1] : 0;
                var top_1 = centerBlock.props.y - topAdjust;
                var bottom_1 = top_1 + height;
                if (bottom_1 > totalHeight) {
                    bottom_1 = totalHeight;
                    top_1 = totalHeight - height;
                }
                blockHeights.reduce(function (total, h, i) {
                    if (total >= top_1 && total <= bottom_1) {
                        newVisibleBlocks.push(i);
                    }
                    return total + h;
                }, 0);
                // Don't scroll exactly to centralIndex because most of the time
                // item of interest is at centralIndex and if this is at the top
                // it can be obscured by things like the search box
                _this.scroller.current.scrollTop = centerBlock.props.y - blockHeights[0] / 2;
            }
            if (!(0, isEqual_1.isEqual)(newVisibleBlocks, visibleBlocks)) {
                _this.setState({
                    centralIndex: centralIndex,
                    visibleBlocks: newVisibleBlocks,
                });
            }
        };
        /**
         * the component has mounted to the DOM or updated, and the window should be scrolled downwards
         * so that the central index is visible
         */
        _this.restoreSnapshot = function (snapshot) {
            if (!_this.scroller.current) {
                return;
            }
            var blockHeights = _this.props.blockHeights;
            var blockIndex = snapshot.blockIndex, blockY = snapshot.blockY;
            var scrollTop = blockHeights.slice(0, blockIndex).reduce(function (acc, h) { return acc + h; }, 0) + blockY;
            _this.scroller.current.scrollTop = scrollTop;
        };
        /**
         * check whether the blocks that should be visible have changed from what's in state,
         * update if so
         */
        _this.handleScrollOrResize = function () {
            if (!_this.scroller.current || !_this.insideDOM.current) {
                return;
            }
            var _a = _this.props, blockHeights = _a.blockHeights, height = _a.size.height, totalHeight = _a.totalHeight;
            var visibleBlocks = _this.state.visibleBlocks;
            var newVisibleBlocks = [];
            var top = 0;
            if (_this.scroller && _this.insideDOM) {
                var parentTop = _this.scroller.current.getBoundingClientRect().top;
                var childTop = _this.insideDOM.current.getBoundingClientRect().top;
                top = childTop - parentTop;
            }
            top = -top + 35;
            top = Math.max(0, top); // don't go too high
            top = Math.min(totalHeight - height, top); // don't go too low
            var bottom = top + height;
            top -= 2 * blockHeights[0]; // add two blocks padding on top
            blockHeights.reduce(function (total, h, i) {
                if (total >= top && total <= bottom) {
                    newVisibleBlocks.push(i);
                }
                return total + h;
            }, 0);
            if (!(0, isEqual_1.isEqual)(newVisibleBlocks, visibleBlocks)) {
                _this.setState({ visibleBlocks: newVisibleBlocks });
            }
        };
        _this.incrementScroller = function (incAmount) {
            _this.stopIncrementingScroller();
            _this.timeoutID = setTimeout(function () {
                if (!_this.scroller.current) {
                    return;
                }
                _this.scroller.current.scrollTop += incAmount;
                _this.incrementScroller(incAmount);
            }, 5);
        };
        _this.stopIncrementingScroller = function () {
            if (_this.timeoutID) {
                clearTimeout(_this.timeoutID);
                _this.timeoutID = null;
            }
        };
        /**
         * handleMouseOver is for detecting when the user is performing a drag event
         * at the very top or the very bottom of DIV. If they are, this starts
         * a incrementing the div's scrollTop (ie an upward or downward scroll event) that's
         * terminated by the user leaving the scroll area
         *
         * The rate of the scrollTop is proportional to how far from the top or the
         * bottom the user is (within [-40, 0] for top, and [0, 40] for bottom)
         */
        _this.handleMouseOver = function (e) {
            if (!_this.scroller.current) {
                return;
            }
            // not relevant, some other type of event, not a selection drag
            if (e.buttons !== 1) {
                if (_this.timeoutID) {
                    _this.stopIncrementingScroller();
                }
                return;
            }
            // check whether the current drag position is near the bottom or the
            // top of the viewer and, if it is, try and increment the current
            // centralIndex (triggering a downward scroll event)
            var scrollerBlock = _this.scroller.current.getBoundingClientRect();
            var scrollRatio = (e.clientY - scrollerBlock.top) / scrollerBlock.height;
            if (scrollRatio > 0.9) {
                scrollRatio = Math.min(1, scrollRatio);
                var scalingRatio = scrollRatio - 0.9;
                scalingRatio *= 10;
                var scaledScroll = 15 * scalingRatio;
                _this.incrementScroller(scaledScroll);
            }
            else if (scrollRatio < 0.1) {
                scrollRatio = 0.1 - Math.max(0, scrollRatio);
                var scalingRatio = 10 * scrollRatio;
                var scaledScroll = -15 * scalingRatio;
                _this.incrementScroller(scaledScroll);
            }
            else {
                _this.stopIncrementingScroller();
            }
        };
        _this.state = {
            centralIndex: 0,
            // start off with first 5 blocks shown
            visibleBlocks: new Array(Math.min((5), props.seqBlocks.length)).fill(null).map(function (_, i) { return i; }),
        };
        return _this;
    }
    InfiniteScroll.prototype.render = function () {
        var _a = this.props, blockHeights = _a.blockHeights, seqBlocks = _a.seqBlocks, seqBlocksCompare = _a.seqBlocksCompare, seqBlocksSymbols = _a.seqBlocksSymbols, width = _a.size.width, alignment = _a.alignment, height = _a.totalHeight;
        var visibleBlocks = this.state.visibleBlocks;
        // find the height of the empty div needed to correctly position the rest
        var firstRendered = visibleBlocks[0];
        var spaceAbove = blockHeights.slice(0, firstRendered).reduce(function (acc, h) { return acc + h; }, 0);
        return (React.createElement("div", { ref: this.scroller, className: "la-vz-linear-scroller", "data-testid": "la-vz-viewer-linear", onFocus: function () {
                // do nothing
            }, onMouseOver: this.handleMouseOver, onScroll: this.handleScrollOrResize },
            React.createElement("div", { ref: this.insideDOM, className: "la-vz-seqblock-container", style: { height: height } },
                React.createElement("div", { className: "la-vz-seqblock-padding-top", style: { height: spaceAbove, width: width || 0 } }),
                !alignment && visibleBlocks.map(function (i) { return seqBlocks[i]; }),
                alignment && visibleBlocks.map(function (i) { return [seqBlocks[i], seqBlocksSymbols[i], seqBlocksCompare[i]]; }))));
    };
    InfiniteScroll.contextType = centralIndexContext_1.default;
    return InfiniteScroll;
}(React.PureComponent));
exports.InfiniteScroll = InfiniteScroll;


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeqBlock = void 0;
var React = __webpack_require__(1);
var Annotations_1 = __webpack_require__(31);
var CutSites_1 = __webpack_require__(32);
var Find_1 = __webpack_require__(33);
var Highlights_1 = __webpack_require__(34);
var Index_1 = __webpack_require__(35);
var Selection_1 = __webpack_require__(36);
var Translations_1 = __webpack_require__(37);
/**
 * SeqBlock
 *
 * Comprised of:
 * 	   IndexRow (the x axis basepair index)
 * 	   AnnotationRows (annotations)
 * 	   Selection (cursor selection range)
 * 	   Find (regions that match the users current find search)
 *     CutSites (cut sites)
 *     Translations
 *
 * a single block of linear sequence. Essentially a row that holds
 * the sequence, and flair around it including the
 * complementary sequence, sequence index, and anotations *
 */
var SeqBlock = /** @class */ (function (_super) {
    __extends(SeqBlock, _super);
    function SeqBlock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.componentWillUnmount = function () {
            var _a = _this.props, id = _a.id, onUnmount = _a.onUnmount;
            onUnmount(id);
        };
        /**
         * For elements in arrays, check whether it wraps around the zero index.
         */
        _this.findXAndWidthElement = function (i, element, elements) {
            var _a, _b, _c, _d;
            var _e = _this.props, bpsPerBlock = _e.bpsPerBlock, firstBase = _e.firstBase, fullSeq = _e.fullSeq, seq = _e.seq;
            var lastBase = firstBase + seq.length;
            var end = element.end, start = element.start;
            var _f = _this.findXAndWidth(start, end), width = _f.width, x = _f.x;
            // does the element overflow to the left or the right of this seqBlock?
            var overflowLeft = start < firstBase;
            var overflowRight = end > lastBase || (start === end && fullSeq.length > bpsPerBlock); // start === end means covers whole plasmid
            // if the element starts and ends in a SeqBlock, by circling all the way around,
            // it will be rendered twice (once from the firstBase to start and another from end to lastBase)
            // eg: https://user-images.githubusercontent.com/13923102/35816281-54571e70-0a68-11e8-92eb-ab56884337ac.png
            var split = elements.reduce(function (acc, el) { return (el.id === element.id ? acc + 1 : acc); }, 0) > 1; // is this element in two pieces?
            if (split) {
                if (elements.findIndex(function (el) { return el.id === element.id; }) === i) {
                    // we're in the first half of the split element
                    (_a = _this.findXAndWidth(firstBase, end), width = _a.width, x = _a.x);
                    overflowLeft = true;
                    overflowRight = false;
                }
                else {
                    // we're in the second half of the split element
                    (_b = _this.findXAndWidth(start, lastBase), width = _b.width, x = _b.x);
                    overflowLeft = false;
                    overflowRight = true;
                }
            }
            else if (start > end) {
                // the element crosses over the zero index and this needs to be accounted for
                // this is very similar to the Block rendering logic in ../Selection/Selection.jsx
                (_c = _this.findXAndWidth(start > lastBase ? firstBase : Math.max(firstBase, start), end < firstBase ? lastBase : Math.min(lastBase, end)), width = _c.width, x = _c.x);
                // if this is the first part of element that crosses the zero index
                if (start > firstBase) {
                    overflowLeft = true;
                    overflowRight = end > lastBase;
                }
                // if this is the second part of an element, check if it overflows
                if (end < firstBase) {
                    overflowLeft = start < firstBase;
                    overflowRight = true;
                }
            }
            else if (start === end) {
                // the element circles the entire plasmid and we aren't currently in a SeqBlock
                // where the element starts or ends
                (_d = _this.findXAndWidth(start, end + fullSeq.length), width = _d.width, x = _d.x);
            }
            return { overflowLeft: overflowLeft, overflowRight: overflowRight, width: width, x: x };
        };
        /**
         * A helper used in child components to position elements on rows. Given first and last base, how far from the left
         * and how wide should it be?
         *
         * If an element and elements are provided, it also factors in whether the element circles around the 0-index.
         */
        _this.findXAndWidth = function (firstIndex, lastIndex) {
            if (firstIndex === void 0) { firstIndex = 0; }
            if (lastIndex === void 0) { lastIndex = 0; }
            var _a = _this.props, bpsPerBlock = _a.bpsPerBlock, charWidth = _a.charWidth, firstBase = _a.firstBase, seqLength = _a.fullSeq.length, size = _a.size;
            firstIndex |= 0;
            lastIndex |= 0;
            var lastBase = Math.min(firstBase + bpsPerBlock, seqLength);
            var multiBlock = seqLength >= bpsPerBlock;
            var x = 0;
            if (firstIndex >= firstBase) {
                x = (firstIndex - firstBase) * charWidth;
                x = Math.max(x, 0) || 0;
            }
            // find the width for the current element
            var width = size.width;
            if (firstIndex === lastIndex) {
                // it starts on the last bp
                width = 0;
            }
            else if (firstIndex >= firstBase || lastIndex < lastBase) {
                // it starts or ends in this SeqBlock
                var start = Math.max(firstIndex, firstBase);
                var end = Math.min(lastIndex, lastBase);
                width = size.width * ((end - start) / bpsPerBlock);
                width = Math.abs(width) || 0;
            }
            else if (firstBase + bpsPerBlock > seqLength && multiBlock) {
                // it's an element in the last SeqBlock, that doesn't span the whole width
                width = size.width * ((seqLength % bpsPerBlock) / bpsPerBlock);
            }
            return { width: width, x: x };
        };
        /**
         * Given a bp, return either the bp as was or a text span if it should have a color.
         *
         * We're looking up each bp in the props.bpColors map to see if it should be shaded and, if so,
         * wrapping it in a textSpan with that color as a fill
         */
        _this.seqTextSpan = function (bp, i) {
            var _a = _this.props, bpColors = _a.bpColors, charWidth = _a.charWidth, firstBase = _a.firstBase, id = _a.id;
            var color;
            if (bpColors) {
                color =
                    bpColors[bp] ||
                        bpColors[bp.toUpperCase()] ||
                        bpColors[bp.toLowerCase()] ||
                        bpColors[i + firstBase] ||
                        undefined;
            }
            return (
            // the +0.2 here and above is to offset the characters they're not right on the left edge. When they are,
            // other elements look like they're shifted too far to the right.
            React.createElement("tspan", { key: i + bp + id, fill: color || undefined, x: charWidth * i + charWidth * 0.2 }, bp));
        };
        return _this;
    }
    SeqBlock.prototype.render = function () {
        var _a = this.props, annotationRows = _a.annotationRows, blockHeight = _a.blockHeight, bpsPerBlock = _a.bpsPerBlock, charWidth = _a.charWidth, compSeq = _a.compSeq, cutSiteRows = _a.cutSiteRows, elementHeight = _a.elementHeight, firstBase = _a.firstBase, fullSeq = _a.fullSeq, handleMouseEvent = _a.handleMouseEvent, highlights = _a.highlights, id = _a.id, inputRef = _a.inputRef, lineHeight = _a.lineHeight, onUnmount = _a.onUnmount, colorized = _a.colorized, searchRows = _a.searchRows, seq = _a.seq, seqFontSize = _a.seqFontSize, seqType = _a.seqType, showComplement = _a.showComplement, showIndex = _a.showIndex, size = _a.size, translations = _a.translations, zoom = _a.zoom, zoomed = _a.zoomed;
        if (!size.width || !size.height)
            return null;
        var textProps = {
            fontSize: seqFontSize,
            lengthAdjust: "spacing",
            textAnchor: "start",
            textLength: size.width >= 0 ? size.width : 1,
            textRendering: "optimizeLegibility",
        };
        var lastBase = firstBase + seq.length;
        // height and yDiff of cut sites
        var cutSiteYDiff = 0; // spacing for cutSite names
        var cutSiteHeight = zoomed && cutSiteRows.length ? lineHeight : 0;
        // height and yDiff of the sequence strand
        var indexYDiff = cutSiteYDiff + cutSiteHeight;
        var indexHeight = seqType === "aa" ? 0 : lineHeight; // if aa, no seq row is shown
        // height and yDiff of the complement strand
        var compYDiff = indexYDiff + indexHeight;
        var compHeight = zoomed && showComplement ? lineHeight : 0;
        // height and yDiff of translations
        var translationYDiff = compYDiff + compHeight;
        var translationHeight = elementHeight * translations.length;
        // height and yDiff of annotations
        var annYDiff = translationYDiff + translationHeight;
        var annHeight = elementHeight * annotationRows.length;
        // height and ydiff of the index row.
        var elementGap = annotationRows.length + translations.length ? 3 : 0;
        var indexRowYDiff = annYDiff + annHeight + elementGap;
        // calc the height necessary for the sequence selection
        // it starts 5 above the top of the SeqBlock
        var selectHeight = cutSiteHeight + indexHeight + compHeight + translationHeight + annHeight + elementGap + 5;
        var selectEdgeHeight = selectHeight + 9; // +9 is the height of a tick + index row
        // needed because otherwise the selection height is very small
        if (!zoomed && selectHeight <= elementHeight) {
            selectEdgeHeight = elementHeight;
        }
        return (React.createElement(React.Fragment, null,
            React.createElement("svg", { ref: inputRef(id, {
                    end: lastBase,
                    ref: id,
                    start: firstBase,
                    type: "SEQ",
                    viewer: "LINEAR",
                }), className: "la-vz-seqblock", cursor: "text", "data-testid": "la-vz-seqblock", display: "block", height: blockHeight, id: id, width: size.width >= 0 ? size.width : 0, onMouseDown: handleMouseEvent, onMouseMove: handleMouseEvent, onMouseUp: handleMouseEvent },
                showIndex && (React.createElement(Index_1.default, { charWidth: charWidth, findXAndWidth: this.findXAndWidth, firstBase: firstBase, lastBase: lastBase, seq: seq, seqType: seqType, showIndex: showIndex, size: size, yDiff: indexRowYDiff, zoom: zoom })),
                React.createElement(Selection_1.default.Block, { findXAndWidth: this.findXAndWidth, firstBase: firstBase, fullSeq: fullSeq, lastBase: lastBase, selectHeight: selectHeight, onUnmount: onUnmount }),
                React.createElement(Highlights_1.default, { compYDiff: compYDiff - 3, findXAndWidth: this.findXAndWidthElement, firstBase: firstBase, highlights: highlights, indexYDiff: indexYDiff - 3, inputRef: inputRef, lastBase: lastBase, lineHeight: lineHeight, listenerOnly: false, seqBlockRef: this }),
                React.createElement(Selection_1.default.Edges, { findXAndWidth: this.findXAndWidth, firstBase: firstBase, fullSeq: fullSeq, lastBase: lastBase, selectEdgeHeight: selectEdgeHeight }),
                React.createElement(Find_1.default, { compYDiff: compYDiff - 3, filteredRows: showComplement ? searchRows : searchRows.filter(function (r) { return r.direction === 1; }), findXAndWidth: this.findXAndWidth, firstBase: firstBase, indexYDiff: indexYDiff - 3, inputRef: inputRef, lastBase: lastBase, lineHeight: lineHeight, listenerOnly: false, zoomed: zoomed }),
                colorized && translations.length && (React.createElement(Translations_1.TranslationRows, { bpsPerBlock: bpsPerBlock, charWidth: charWidth, elementHeight: elementHeight, findXAndWidth: this.findXAndWidth, firstBase: firstBase, fullSeq: fullSeq, inputRef: inputRef, lastBase: lastBase, seqType: seqType, translations: translations, yDiff: translationYDiff, onUnmount: onUnmount })),
                annotationRows.length && (React.createElement(Annotations_1.default, { annotationRows: annotationRows, bpsPerBlock: bpsPerBlock, elementHeight: elementHeight, findXAndWidth: this.findXAndWidthElement, firstBase: firstBase, fullSeq: fullSeq, inputRef: inputRef, lastBase: lastBase, seqBlockRef: this, width: size.width, yDiff: annYDiff })),
                zoomed && (seqType !== "aa" || !colorized) ? (React.createElement("text", __assign({}, textProps, { className: "la-vz-seq", "data-testid": "la-vz-seq", id: id, transform: "translate(0, ".concat(indexYDiff + lineHeight / 2, ")") }), seq.split("").map(this.seqTextSpan))) : null,
                compSeq && zoomed && showComplement && seqType !== "aa" ? (React.createElement("text", __assign({}, textProps, { className: "la-vz-comp-seq", "data-testid": "la-vz-comp-seq", id: id, transform: "translate(0, ".concat(compYDiff + lineHeight / 2, ")") }), compSeq.split("").map(this.seqTextSpan))) : null,
                zoomed && (React.createElement(CutSites_1.CutSites, { cutSites: cutSiteRows, findXAndWidth: this.findXAndWidth, firstBase: firstBase, inputRef: inputRef, lastBase: lastBase, lineHeight: lineHeight, size: size, yDiff: cutSiteYDiff - 3, zoom: zoom })),
                React.createElement(Find_1.default, { compYDiff: compYDiff - 3, filteredRows: showComplement ? searchRows : searchRows.filter(function (r) { return r.direction === 1; }), findXAndWidth: this.findXAndWidth, firstBase: firstBase, indexYDiff: indexYDiff - 3, inputRef: inputRef, lastBase: lastBase, lineHeight: lineHeight, listenerOnly: true, zoomed: zoomed }),
                React.createElement(Highlights_1.default, { compYDiff: compYDiff - 3, findXAndWidth: this.findXAndWidthElement, firstBase: firstBase, highlights: highlights, indexYDiff: indexYDiff - 3, inputRef: inputRef, lastBase: lastBase, lineHeight: lineHeight, listenerOnly: true, seqBlockRef: this }))));
    };
    SeqBlock.defaultProps = {};
    return SeqBlock;
}(React.PureComponent));
exports.SeqBlock = SeqBlock;


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var React = __webpack_require__(1);
var colors_1 = __webpack_require__(13);
var hoverOtherAnnotationRows = function (className, opacity) {
    if (!document)
        return;
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i += 1) {
        elements[i].style.fillOpacity = "".concat(opacity);
    }
};
/**
 * Render each row of annotations into its own row.
 * This is not a default export for sake of the React component displayName.
 */
var AnnotationRows = function (props) { return (React.createElement("g", null, props.annotationRows.map(function (anns, i) { return (React.createElement(AnnotationRow, { key: "annotation-linear-row-".concat(anns[0].id, "-").concat(props.firstBase, "-").concat(props.lastBase), annotations: anns, bpsPerBlock: props.bpsPerBlock, findXAndWidth: props.findXAndWidth, firstBase: props.firstBase, fullSeq: props.fullSeq, height: props.elementHeight, inputRef: props.inputRef, lastBase: props.lastBase, seqBlockRef: props.seqBlockRef, width: props.width, y: props.yDiff + props.elementHeight * i })); }))); };
exports["default"] = AnnotationRows;
/**
 * A single row of annotations. Multiple of these may be in one seqBlock
 * vertically stacked on top of one another in non-overlapping arrays.
 */
var AnnotationRow = function (props) { return (React.createElement("g", { className: "la-vz-linear-annotation-row", height: props.height * 0.8, transform: "translate(0, ".concat(props.y, ")"), width: props.width }, props.annotations.map(function (a, i) { return (React.createElement(SingleNamedElement, __assign({}, props, { key: "annotation-linear-".concat(a.id, "-").concat(i, "-").concat(props.firstBase, "-").concat(props.lastBase), element: a, elements: props.annotations, index: i }))); }))); };
/**
 * SingleNamedElement is a single rectangular element in the SeqBlock.
 * It does a bunch of stuff to avoid edge-cases from wrapping around the 0-index,
 * edge of blocks, etc.
 */
var SingleNamedElement = function (props) {
    var element = props.element, elements = props.elements, findXAndWidth = props.findXAndWidth, firstBase = props.firstBase, index = props.index, inputRef = props.inputRef, lastBase = props.lastBase;
    var color = element.color, direction = element.direction, end = element.end, name = element.name, start = element.start;
    var forward = direction === 1;
    var reverse = direction === -1;
    var _a = findXAndWidth(index, element, elements), overflowLeft = _a.overflowLeft, overflowRight = _a.overflowRight, width = _a.width, origX = _a.x;
    var crossZero = start > end && end < firstBase;
    // does the element begin or end within this seqBlock with a directionality?
    var endFWD = forward && end > firstBase && end <= lastBase;
    var endREV = reverse && start >= firstBase && start <= lastBase;
    // create padding on either side, vertically, of an element
    var height = props.height * 0.8;
    var cW = 4; // jagged cutoff width
    var cH = height / 4; // jagged cutoff height
    var _b = [origX, width], x = _b[0], w = _b[1];
    // create the SVG path, starting at the topLeft and working clockwise
    // there is additional logic here for if the element overflows
    // to the left or right of this seqBlock, where a "jagged edge" is created
    var topLeft = endREV ? "M ".concat(2 * cW, " 0") : "M 0 0";
    var topRight = endFWD ? "L ".concat(width - 2 * cW, " 0") : "L ".concat(width, " 0");
    var linePath = "";
    var bottomRight = "L ".concat(width, " ").concat(height); // flat right edge
    if ((overflowRight && width > 2 * cW) || crossZero) {
        bottomRight = "\n        L ".concat(width - cW, " ").concat(cH, "\n        L ").concat(width, " ").concat(2 * cH, "\n        L ").concat(width - cW, " ").concat(3 * cH, "\n        L ").concat(width, " ").concat(4 * cH); // jagged right edge
    }
    else if (endFWD) {
        bottomRight = "\n        L ".concat(width, " ").concat(height / 2, "\n        L ").concat(width - Math.min(2 * cW, w), " ").concat(height); // arrow forward
    }
    var bottomLeft = "L 0 ".concat(height, " L 0 0"); // flat left edge
    if (overflowLeft && width > 2 * cW) {
        bottomLeft = "\n        L 0 ".concat(height, "\n        L ").concat(cW, " ").concat(3 * cH, "\n        L 0 ").concat(2 * cH, "\n        L ").concat(cW, " ").concat(cH, "\n        L 0 0"); // jagged left edge
    }
    else if (endREV) {
        bottomLeft = "\n        L ".concat(Math.min(2 * cW, w), " ").concat(height, "\n        L 0 ").concat(height / 2, "\n        L ").concat(Math.min(2 * cW, w), " 0"); // arrow reverse
    }
    linePath = "".concat(topLeft, " ").concat(topRight, " ").concat(bottomRight, " ").concat(bottomLeft);
    if ((forward && overflowRight) || (forward && crossZero)) {
        // If it's less than 15 pixels the double arrow barely fits
        if (width > 15) {
            linePath += "\n        M ".concat(width - 3 * cW, " ").concat(cH, "\n        L ").concat(width - 2 * cW, " ").concat(2 * cH, "\n        L ").concat(width - 3 * cW, " ").concat(3 * cH, "\n        M ").concat(width - 4 * cW, " ").concat(cH, "\n        L ").concat(width - 3 * cW, " ").concat(2 * cH, "\n        L ").concat(width - 4 * cW, " ").concat(3 * cH); // add double arrow forward
        }
    }
    else if ((reverse && overflowLeft) || (reverse && crossZero)) {
        // If it's less than 15 pixels the double arrow barely fits
        if (width > 15) {
            linePath += "\n        M ".concat(3 * cW, " ").concat(3 * cH, "\n        L ").concat(2 * cW, " ").concat(cH * 2, "\n        L ").concat(3 * cW, " ").concat(cH, "\n        M ").concat(4 * cW, " ").concat(3 * cH, "\n        L ").concat(3 * cW, " ").concat(cH * 2, "\n        L ").concat(4 * cW, " ").concat(cH); // add double forward reverse
        }
    }
    // determine whether the element name fits within the width of the element
    var nameLength = name.length * 6.75; // aspect ratio of roboto mono is ~0.66
    var nameFits = nameLength < width - 15;
    return (React.createElement("g", { id: element.id, transform: "translate(".concat(x, ", ").concat(0.1 * height, ")") },
        React.createElement("path", { ref: inputRef(element.id, {
                end: end,
                name: element.name,
                ref: element.id,
                start: start,
                type: "ANNOTATION",
                viewer: "LINEAR",
            }), className: "".concat(element.id, " la-vz-annotation"), cursor: "pointer", d: linePath, fill: color, id: element.id, stroke: color ? colors_1.COLOR_BORDER_MAP[color] || (0, colors_1.darkerColor)(color) : "gray", onBlur: function () {
                // do nothing
            }, onFocus: function () {
                // do nothing
            }, onMouseOut: function () { return hoverOtherAnnotationRows(element.id, 0.7); }, onMouseOver: function () { return hoverOtherAnnotationRows(element.id, 1.0); } }),
        nameFits && (React.createElement("text", { className: "la-vz-annotation-label", cursor: "pointer", dominantBaseline: "middle", fontSize: 12, id: element.id, textAnchor: "middle", x: width / 2, y: height / 2 + 1, onBlur: function () {
                // do nothing
            }, onFocus: function () {
                // do nothing
            }, onMouseOut: function () { return hoverOtherAnnotationRows(element.id, 0.7); }, onMouseOver: function () { return hoverOtherAnnotationRows(element.id, 1.0); } }, name))));
};


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CutSites = void 0;
var React = __webpack_require__(1);
var SeqViewerContainer_1 = __webpack_require__(6);
/**
 * Renders enzyme cut sites on the linear viewer. This includes a few things:
 * - the cut site itself (some lines for the cut site on top and bottom sequences)
 * - an outline of the total recognition site (can span SeqBlocks)
 * - a label above the cut-site
 */
var CutSites = function (props) {
    var cutSites = props.cutSites, findXAndWidth = props.findXAndWidth, firstBase = props.firstBase, inputRef = props.inputRef, lastBase = props.lastBase, lineHeight = props.lineHeight, size = props.size, yDiff = props.yDiff, zoom = props.zoom.linear;
    // Calc x/width of highlight region, top/bottom cut lines, etc
    var enhancedCutSites = enhanceCutSites(
    // TODO: remove this exclusion of cut-sites that cross the zero index after even more
    // zero-index accounting. This file is already hairy enough, so not in a rush to add zero-index
    // accounting here, yet.
    cutSites.filter(function (c) { return c.end > c.start; }), firstBase, lastBase, findXAndWidth);
    if (!enhancedCutSites.length)
        return null;
    // Set cut-site label positions
    var labelledCutSites = withLabels(enhancedCutSites, size);
    var lineYDiff = yDiff + lineHeight;
    return (React.createElement("g", { className: "la-vz-cut-sites" }, labelledCutSites.map(function (c) {
        var _a;
        return (React.createElement("g", { key: "cut-site-".concat(c.c.id, "-").concat(firstBase) },
            c.label.render && (React.createElement("text", { className: "la-vz-cut-site-text ".concat(c.c.id, "-label"), dominantBaseline: "hanging", id: c.c.id, textAnchor: "start", x: c.label.x, y: yDiff, onBlur: function () { return 0; }, onFocus: function () { return 0; }, onMouseOut: function () { return onCutSiteHover(c.c.id, false); }, onMouseOver: function () { return onCutSiteHover(c.c.id, true); } }, c.label.text)),
            zoom > 10 && (React.createElement("path", { ref: inputRef(c.c.id, {
                    clockwise: true,
                    end: c.c.end,
                    id: c.c.id,
                    start: c.c.start,
                    type: "ENZYME",
                    viewer: "LINEAR",
                }), className: "la-vz-cut-site-highlight ".concat(c.c.id), d: "M ".concat(c.highlight.x, " ").concat(lineYDiff, "\n                    L ").concat(c.highlight.x + c.highlight.width, " ").concat(lineYDiff, "\n                    L ").concat(c.highlight.x + c.highlight.width, " ").concat(lineYDiff + 2 * lineHeight, "\n                    L ").concat(c.highlight.x, " ").concat(lineYDiff + 2 * lineHeight, " Z"), style: ((_a = c.c.color) === null || _a === void 0 ? void 0 : _a.length) ? { fill: c.c.color } : {}, onMouseOut: function () { return onCutSiteHover(c.c.id, false); }, onMouseOver: function () { return onCutSiteHover(c.c.id, true); } })),
            c.top.render && (React.createElement("path", { className: "la-vz-cut-site ".concat(c.c.id), d: "M ".concat(c.top.x, " ").concat(lineYDiff, " L ").concat(c.top.x, " ").concat(lineYDiff + lineHeight) })),
            c.connector.render && zoom > 10 && (React.createElement("path", { className: "la-vz-cut-site ".concat(c.c.id), d: "M ".concat(c.connector.x, " ").concat(lineYDiff + lineHeight, "\n                    L ").concat(c.connector.x + c.connector.width, " ").concat(lineYDiff + lineHeight) })),
            c.bottom.render && zoom > 10 && (React.createElement("path", { className: "la-vz-cut-site ".concat(c.c.id), d: "M ".concat(c.bottom.x, " ").concat(lineYDiff + lineHeight, " L ").concat(c.bottom.x, " ").concat(lineYDiff + 2 * lineHeight) }))));
    })));
};
exports.CutSites = CutSites;
/**
 * This takes cut-sites and does some piecemeal calculations to add meta about:
 * - top (x position of the top line and whether to render)
 * - connector (x position and width of the connector and whether to render)
 * - bottom (x position of the bottom line and whether to render)
 * - highlight (x/width/color of the highlight block)
 */
var enhanceCutSites = function (cutSites, firstBase, lastBase, findXAndWidth) {
    return cutSites.map(function (c) {
        var topX = findXAndWidth(c.fcut, c.fcut).x;
        var bottomX = findXAndWidth(c.rcut, c.rcut).x;
        // Prevent double rendering of cut-site lines across SeqBlocks. Without the shenanigans below,
        // if a cut site lands on the last or first base of a SeqBlock, it will also render at the end of a SeqBlock
        // and the start of the next. Below, we only show a cut if 1. it's wholly within this SeqBlock or
        // 2. the other cut is also within this block. If both the top and bottom cuts are on the last/first bases,
        // we render the cut in the first block (ie at the very end of the first block)
        var showTopLine = c.fcut > firstBase && c.fcut < lastBase;
        if (c.fcut === firstBase && c.rcut > firstBase && c.rcut <= lastBase) {
            showTopLine = true;
        }
        else if (c.fcut === lastBase && c.rcut >= firstBase && c.rcut <= lastBase) {
            showTopLine = true;
        }
        var showBottomLine = c.rcut > firstBase && c.rcut < lastBase;
        if (c.rcut === firstBase && c.fcut > firstBase && c.fcut <= lastBase) {
            showBottomLine = true;
        }
        else if (c.rcut === lastBase && c.fcut >= firstBase && c.fcut <= lastBase) {
            showBottomLine = true;
        }
        return {
            bottom: {
                render: showBottomLine,
                x: bottomX,
            },
            c: c,
            connector: calcConnector(c, topX, bottomX, firstBase, lastBase, showTopLine, showBottomLine, findXAndWidth),
            highlight: calcHighlight(c, firstBase, lastBase, findXAndWidth),
            top: {
                render: showTopLine,
                x: topX,
            },
        };
    });
};
/**
 * calcHighlight returns the x and width of the enzyme recognition site's highlight block.
 */
var calcHighlight = function (c, firstBase, lastBase, findXAndWidth) {
    if (isWithinSeqBlock(c.start, c.end, firstBase, lastBase)) {
        if (c.start > c.end) {
            return findXAndWidth(c.end < firstBase ? lastBase : Math.min(lastBase, c.end), c.start > lastBase ? firstBase : Math.max(firstBase, c.start));
        }
        return findXAndWidth(c.start < firstBase ? lastBase : Math.min(lastBase, c.start), c.end > lastBase ? firstBase : Math.max(firstBase, c.end));
    }
    return findXAndWidth(c.start, c.end);
};
/**
 * isWithinSeqBlock returns whether the cut site is entirely within this SeqBlock
 */
var isWithinSeqBlock = function (start, end, firstBase, lastBase) {
    if ((start < firstBase && end < firstBase) || (start > lastBase && end > lastBase)) {
        return true;
    }
    if (end >= start) {
        return end < lastBase && start > firstBase;
    }
    return start < lastBase && end > firstBase;
};
// This gets the x and width of the connector line that connects the forward and reverse cut sites
var calcConnector = function (c, topX, bottomX, firstBase, lastBase, showTopLine, showBottomLine, findXAndWidth) {
    if (showTopLine && showBottomLine) {
        return {
            render: true,
            width: Math.abs(bottomX - topX),
            x: Math.min(topX, bottomX),
        };
    }
    if (showTopLine) {
        if (c.start + topX > c.end + bottomX) {
            return __assign({ render: true }, findXAndWidth(firstBase, c.fcut));
        }
        if (c.fcut > c.rcut) {
            return __assign({ render: true }, findXAndWidth(firstBase, c.fcut));
        }
        return __assign({ render: true }, findXAndWidth(c.fcut, lastBase));
    }
    if (showBottomLine) {
        if (c.start + topX > c.end + bottomX) {
            return __assign({ render: true }, findXAndWidth(c.rcut, lastBase));
        }
        if (c.fcut > c.rcut) {
            return __assign({ render: true }, findXAndWidth(c.rcut, lastBase));
        }
        return __assign({ render: true }, findXAndWidth(firstBase, c.rcut));
    }
    return { render: false, width: 0, x: 0 };
};
/**
 * This tries to position the cut-site labels so they don't overlap.
 *
 * I'm doing something simple here where I shift the labels left/right. I don't try to
 * move the labels vertically or draw a line from the labels to the cut-sites (like on
 * the circular viewer).
 *
 * Steps:
 *   - move off the left/right side of the screen if the label is too close to the edge
 *   - if the label is too close to another label, move it left/right
 *   - if it's now all the way off the screen, don't render it
 *
 * context: https://github.com/Lattice-Automation/seqviz/issues/104
 */
var withLabels = function (cutSites, size) {
    var unlabelled = cutSites
        .filter(function (c) { return !c.top.render; })
        .map(function (c) { return (__assign(__assign({}, c), { label: { render: false, text: c.c.name, x: c.highlight.x } })); });
    var labelled = cutSites
        .filter(function (c) { return c.top.render; })
        .sort(function (a, b) { return a.top.x - b.top.x; })
        .map(function (c) { return (__assign(__assign({}, c), { label: { render: c.top.render, text: c.c.name, x: c.highlight.x } })); });
    // shift the labels left that will overflow to the right
    var overflow = function (c) {
        return c.label.x + c.label.text.length * SeqViewerContainer_1.CHAR_WIDTH > size.width;
    };
    labelled.forEach(function (c) {
        var width = c.label.text.length * SeqViewerContainer_1.CHAR_WIDTH;
        if (overflow(c)) {
            c.label.x = size.width - width;
        }
    });
    // if two labels overlap, shift the righter most one to the right
    var overlap = function (c1, c2) {
        return c1.label.x + c1.label.text.length * SeqViewerContainer_1.CHAR_WIDTH > c2.label.x;
    };
    labelled.forEach(function (c, i) {
        if (i == 0)
            return c;
        var last = labelled[i - 1];
        while (overlap(last, c)) {
            c.label.x += SeqViewerContainer_1.CHAR_WIDTH * 2;
        }
        return c;
    });
    // remove labels that now overflow the right of the screen
    labelled.forEach(function (c) {
        if (overflow(c)) {
            c.label.render = false;
        }
    });
    return unlabelled.concat(labelled);
};
/**
 * This changes the opacity of the enzyme recognition sequence.
 *
 * on hover, an enzyme recognition site should have an opacity of 0.5. 0 otherwise
 * on hover, an enzyme name should have opacity 1.0, 0 otherwise
 */
var onCutSiteHover = function (className, on) {
    if (on === void 0) { on = false; }
    if (!document)
        return;
    var elements = document.getElementsByClassName("".concat(className, "-label"));
    for (var i = 0; i < elements.length; i += 1) {
        elements[i].style.fillOpacity = on ? "1.0" : "0.8";
        elements[i].style.fontWeight = on ? "400" : "300";
    }
    elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i += 1) {
        elements[i].style.fillOpacity = on ? "0.25" : "0";
        elements[i].style.stroke = on ? "black" : "rgb(115, 119, 125)";
    }
};


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var React = __webpack_require__(1);
var sequence_1 = __webpack_require__(24);
/**
 * Render rectangles around Search results.
 */
var Find = function (_a) {
    var compYDiff = _a.compYDiff, searchRows = _a.filteredRows, findXAndWidth = _a.findXAndWidth, firstBase = _a.firstBase, indexYDiff = _a.indexYDiff, inputRef = _a.inputRef, lastBase = _a.lastBase, lineHeight = _a.lineHeight, listenerOnly = _a.listenerOnly, zoomed = _a.zoomed;
    return (React.createElement(React.Fragment, null, searchRows.map(function (s) { return (React.createElement(FindBlock, { key: JSON.stringify(s), compYDiff: compYDiff, direction: s.direction || 1, end: s.end, findXAndWidth: findXAndWidth, firstBase: firstBase, indexYDiff: indexYDiff, inputRef: inputRef, lastBase: lastBase, lineHeight: lineHeight, listenerOnly: listenerOnly, start: s.start, zoomed: zoomed })); })));
};
exports["default"] = Find;
var FindBlock = function (_a) {
    var _b;
    var compYDiff = _a.compYDiff, direction = _a.direction, end = _a.end, findXAndWidth = _a.findXAndWidth, firstBase = _a.firstBase, indexYDiff = _a.indexYDiff, inputRef = _a.inputRef, lastBase = _a.lastBase, lineHeight = _a.lineHeight, listenerOnly = _a.listenerOnly, start = _a.start, zoomed = _a.zoomed;
    var _c = findXAndWidth(start, end), width = _c.width, x = _c.x;
    if (start > end) {
        (_b = findXAndWidth(start > lastBase ? firstBase : Math.max(firstBase, start), end < firstBase ? lastBase : Math.min(lastBase, end)), width = _b.width, x = _b.x);
    }
    var id = (0, sequence_1.randomID)();
    var y = indexYDiff; // template row result
    if (direction < 0 || !zoomed) {
        y = compYDiff; // complement row result
    }
    return (React.createElement("rect", { key: id, ref: inputRef(id, {
            end: end,
            id: id,
            start: start,
            type: "FIND",
            viewer: "LINEAR",
        }), className: "la-vz-search", cursor: "pointer", height: lineHeight, id: id, shapeRendering: "crispEdges", stroke: listenerOnly ? "none" : "rgba(0, 0, 0, 0.5)", strokeWidth: 1, style: listenerOnly ? { fill: "transparent" } : {}, width: width, x: x, y: y }));
};


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var React = __webpack_require__(1);
/**
 * Render rectangles aroun highlighted ranges.
 */
var Highlights = function (props) { return (React.createElement(React.Fragment, null, props.highlights.map(function (h, i) { return (
// TODO: what's going on here, why does this lead to duplicates
React.createElement(SingleHighlight, __assign({ key: "linear-highlight-".concat(h.id, "-").concat(props.listenerOnly) }, props, { highlight: h, index: i }))); }))); };
exports["default"] = Highlights;
var SingleHighlight = function (props) {
    var _a = props.findXAndWidth(props.index, props.highlight, props.highlights), width = _a.width, x = _a.x;
    var highlightStyle = {};
    if (props.listenerOnly) {
        highlightStyle = { fill: "transparent" };
    }
    else if (props.highlight.color) {
        highlightStyle = { fill: props.highlight.color };
    }
    var rectProps = {
        className: "la-vz-highlight",
        cursor: "pointer",
        height: props.lineHeight,
        id: props.highlight.id,
        stroke: props.listenerOnly ? "none" : "rgba(0, 0, 0, 0.5)",
        strokeWidth: 1,
        style: highlightStyle,
        width: width,
        x: x,
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("rect", __assign({ key: "linear-highlight-".concat(props.highlight.id, "-top"), ref: props.inputRef(props.highlight.id, __assign(__assign({ ref: props.highlight.id }, props.highlight), { type: "HIGHLIGHT", viewer: "LINEAR" })) }, rectProps, { y: props.indexYDiff })),
        React.createElement("rect", __assign({ key: "linear-highlight-".concat(props.highlight.id, "-bottom"), ref: props.inputRef(props.highlight.id, __assign(__assign({ ref: props.highlight.id }, props.highlight), { type: "HIGHLIGHT", viewer: "LINEAR" })) }, rectProps, { y: props.compYDiff }))));
};


/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var React = __webpack_require__(1);
/**
 * Index is a row with numbers showing the indexes of base pairs in the sequence.
 */
var Index = /** @class */ (function (_super) {
    __extends(Index, _super);
    function Index() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // given each basepair in the sequence, go through each and find whether 1) it is divisible
        // by the number set for tally thresholding and, if it is, 2) add its location to the list
        // of positions for tickInc
        _this.genTicks = function () {
            var _a = _this.props, charWidth = _a.charWidth, findXAndWidth = _a.findXAndWidth, firstBase = _a.firstBase, seq = _a.seq, seqType = _a.seqType, size = _a.size, zoom = _a.zoom;
            var seqLength = seq.length;
            // the tally's distance on the x-axis is zoom dependent:
            // (0, 10]: every 50
            // (10, 40]: every 20
            // (40, 70]: every 10
            // (70, 100] every 5
            var tickInc = 0;
            switch (true) {
                case zoom.linear > 85:
                    tickInc = 5;
                    break;
                case zoom.linear > 40:
                    tickInc = 10;
                    break;
                case zoom.linear > 10:
                    tickInc = 20;
                    break;
                case zoom.linear >= 0:
                    tickInc = 50;
                    break;
                default:
                    tickInc = 10;
            }
            // if rendering amino acids, double the tick frequency
            if (seqType === "aa") {
                tickInc = tickInc / 2;
            }
            // create the array that will hold all the indexes in the array
            var tickIndexes = [];
            if (firstBase === 0) {
                tickIndexes.push(1);
            }
            var i = 0;
            while ((i + firstBase) % tickInc !== 0) {
                i += 1;
            }
            while (i < seqLength) {
                if (i + firstBase !== 0) {
                    tickIndexes.push(i + firstBase);
                }
                i += tickInc;
            }
            return tickIndexes.map(function (p) {
                var tickFromLeft = findXAndWidth(p - 1, p - 1).x; // for midpoint
                tickFromLeft += charWidth / 2;
                var digits = Math.ceil(Math.log10(p + 1)); // digits in num
                digits -= 1; // don't shift for the middle digit
                var indexCharWidth = 7.7; // this is pretty stable, can calculate w/ a long number's width / char count
                var textWidth = digits * indexCharWidth;
                var textFromLeft = findXAndWidth(p - 1, p - 1).x;
                textFromLeft += charWidth / 2;
                textFromLeft -= textWidth / 2 + 3; // this +3 I cannot explain
                textFromLeft = Math.max(0, textFromLeft); // keep off left edge
                textFromLeft = Math.min(size.width - textWidth / 2, textFromLeft); // keep off right edge
                var transTick = "translate(".concat(tickFromLeft, ", 1)");
                var transText = "translate(".concat(textFromLeft, ", 10)");
                return (React.createElement(React.Fragment, { key: p },
                    React.createElement("path", { className: "la-vz-index-tick", d: "M 0 0 L 0 7", transform: transTick }),
                    React.createElement("text", { className: "la-vz-index-tick-label", dominantBaseline: "hanging", fontSize: 12, transform: transText }, p)));
            });
        };
        return _this;
    }
    Index.prototype.render = function () {
        var _a = this.props, findXAndWidth = _a.findXAndWidth, firstBase = _a.firstBase, lastBase = _a.lastBase, showIndex = _a.showIndex, yDiff = _a.yDiff;
        if (!showIndex)
            return null;
        var _b = findXAndWidth(firstBase, lastBase), width = _b.width, x = _b.x;
        return (React.createElement("g", { transform: "translate(0, ".concat(yDiff, ")") },
            React.createElement("path", { className: "la-vz-index-line", d: "M 0 1 L ".concat(x + width, " 1") }),
            this.genTicks()));
    };
    return Index;
}(React.PureComponent));
exports["default"] = Index;


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var React = __webpack_require__(1);
var selectionContext_1 = __webpack_require__(21);
var sequence_1 = __webpack_require__(24);
/**
 * Edges on the side of selections of the Selection Viewer
 *
 * Only shown at the selection's start and end, not intermediate blocks (if there are intermediate blocks)
 */
var Edges = /** @class */ (function (_super) {
    __extends(Edges, _super);
    function Edges() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = (0, sequence_1.randomID)();
        return _this;
    }
    Edges.prototype.render = function () {
        var _a;
        var _b = this.props, findXAndWidth = _b.findXAndWidth, firstBase = _b.firstBase, fullSeq = _b.fullSeq, lastBase = _b.lastBase, selectEdgeHeight = _b.selectEdgeHeight;
        var _c = this.context, clockwise = _c.clockwise, end = _c.end, ref = _c.ref, start = _c.start;
        if (typeof start === "undefined" || typeof end === "undefined") {
            return;
        }
        var startEdge = null;
        var lastEdge = null;
        if (clockwise) {
            // clockwise, ie forward drag event
            // the start or end edges are within this block
            if (start >= firstBase && start < lastBase)
                startEdge = start;
            if (end > firstBase && end <= lastBase)
                lastEdge = end;
        }
        else {
            // counterclockwise, ie reverse drag event
            if (start > firstBase && start <= lastBase)
                startEdge = start;
            if (end >= firstBase && end < lastBase)
                lastEdge = end;
        }
        // for cmd-a case
        if (ref === "ALL" || (start === 0 && end === fullSeq.length - 1)) {
            startEdge = null;
            lastEdge = null;
        }
        // the end of the selection edges are not in this SeqBlock and do not need to be rendered
        if (startEdge === null && lastEdge === null) {
            return null;
        }
        if (startEdge === null) {
            startEdge = lastEdge;
            lastEdge = null;
        }
        var _d = findXAndWidth(startEdge, lastEdge), width = _d.width, x = _d.x;
        // if drag event in counter clockwise direction and both of the edges are
        // within this range (if reverse but not both in one range, it'll be fine)
        if (clockwise === false && startEdge !== null && lastEdge !== null) {
            (_a = findXAndWidth(lastEdge, startEdge), width = _a.width, x = _a.x);
        }
        // the x position of the second edge
        var secondEdgeX = x + width;
        if (startEdge !== null && lastEdge !== null) {
            // in this scenario, the ending edge of the selection range is before the start
            if ((start > end && clockwise === true) || (end > start && clockwise === false)) {
                secondEdgeX = x - width;
            }
        }
        // for when it starts on the first bp of the next SeqBlock
        if (start === end && start === lastBase) {
            return null;
        }
        // handling case where cursor is rendered on each line
        if (startEdge === null && lastEdge === null) {
            return null;
        }
        // if the start and last edge are the same, exclude the second
        if (startEdge == lastEdge) {
            lastEdge = null;
        }
        return (React.createElement("g", null,
            startEdge !== null && (React.createElement("rect", { className: "la-vz-selection-edge", "data-testid": "la-vz-selection-edge", height: selectEdgeHeight, shapeRendering: "crispEdges", strokeWidth: 0, width: 1, x: x, y: -5 })),
            lastEdge !== null && (React.createElement("rect", { className: "la-vz-selection-edge", "data-testid": "la-vz-selection-edge", height: selectEdgeHeight, shapeRendering: "crispEdges", strokeWidth: 0, width: 1, x: secondEdgeX, y: -5 }))));
    };
    Edges.contextType = selectionContext_1.default;
    return Edges;
}(React.PureComponent));
/**
 * A Block is a single range of selected bases. Usually shown as a light blue box. Can span a single or multiple blocks.
 */
var Block = /** @class */ (function (_super) {
    __extends(Block, _super);
    function Block() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = (0, sequence_1.randomID)();
        return _this;
    }
    Block.prototype.render = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        var _h = this.props, findXAndWidth = _h.findXAndWidth, firstBase = _h.firstBase, fullSeq = _h.fullSeq, lastBase = _h.lastBase, selectHeight = _h.selectHeight;
        var _j = this.context, clockwise = _j.clockwise, ref = _j.ref;
        var _k = this.context, end = _k.end, start = _k.start;
        if (typeof start === "undefined" || typeof end === "undefined") {
            return;
        }
        // there's no need to render a selection block (rect) if just one point has been selected
        if (start === end && ref !== "ALL")
            return null;
        if (ref === "ALL" || (start === 0 && end === fullSeq.length)) {
            // it's not "ALL" or some element's id
            start = 0;
            end = 0;
        }
        // props shared between all 3 possible components.
        var blockProps = {
            className: "la-vz-selection",
            "data-testid": "la-vz-selection-block",
            height: selectHeight,
            shapeRendering: "auto",
            y: -5,
        };
        var x = null;
        var width = null;
        var secondBlock = null;
        if (clockwise && end > start) {
            // does not cross the zero index, FWD direction
            if (start <= lastBase && end > firstBase) {
                (_a = findXAndWidth(Math.max(firstBase, start), Math.min(lastBase, end)), width = _a.width, x = _a.x);
            }
        }
        else if (clockwise && start > end) {
            // crosses the zero index in FWD direction
            if (!(start > lastBase && end < firstBase)) {
                // is this seq block relevant
                if (start < lastBase && end > firstBase) {
                    // the selection range both starts and ends in this seqblock, but wraps
                    // all the way around the rest of the plasmid
                    // ex: https://user-images.githubusercontent.com/13923102/34791431-f56df23a-f612-11e7-94b4-e302ede155a0.png
                    var _l = findXAndWidth(start, lastBase), secBlockWidth = _l.width, secBlockX = _l.x;
                    secondBlock = React.createElement("rect", __assign({}, blockProps, { width: secBlockWidth, x: secBlockX }));
                    (_b = findXAndWidth(firstBase, end), width = _b.width, x = _b.x);
                }
                else {
                    (_c = findXAndWidth(start > lastBase ? firstBase : Math.max(firstBase, start), end < firstBase ? lastBase : Math.min(lastBase, end)), width = _c.width, x = _c.x);
                }
            }
        }
        else if (!clockwise && start > end) {
            // does not cross zero index but is in reverse direction
            if (end <= lastBase && start >= firstBase) {
                (_d = findXAndWidth(Math.max(firstBase, end), Math.min(lastBase, start)), width = _d.width, x = _d.x);
            }
        }
        else if (!clockwise && end > start) {
            // crosses zero index and is in reverse direction
            if (start > firstBase || end < lastBase) {
                if (start > firstBase && start < lastBase && end > firstBase) {
                    // the selection range both starts and ends in this seqblock, but wraps
                    // all the way around the rest of the plasmid
                    // ex: https://user-images.githubusercontent.com/13923102/34791431-f56df23a-f612-11e7-94b4-e302ede155a0.png
                    var _m = findXAndWidth(end, lastBase), secBlockWidth = _m.width, secBlockX = _m.x;
                    secondBlock = React.createElement("rect", __assign({}, blockProps, { width: secBlockWidth, x: secBlockX }));
                    (_e = findXAndWidth(firstBase, start), width = _e.width, x = _e.x);
                }
                else {
                    (_f = findXAndWidth(start < firstBase ? end : firstBase, end > lastBase ? start : lastBase), width = _f.width, x = _f.x);
                }
            }
        }
        // sreflect
        if (ref === "ALL" || start === end) {
            (_g = findXAndWidth(Math.max(firstBase, 0), Math.min(lastBase, fullSeq.length + 1)), width = _g.width, x = _g.x);
        }
        // nothing was set for this selection block
        if (!x && !width) {
            return null;
        }
        return (React.createElement(React.Fragment, null,
            React.createElement("rect", __assign({}, blockProps, { width: width ? width + 1 : undefined, x: x || undefined })),
            secondBlock));
    };
    Block.contextType = selectionContext_1.default;
    return Block;
}(React.PureComponent));
exports["default"] = { Block: Block, Edges: Edges };


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationRows = void 0;
var colors_1 = __webpack_require__(13);
var sequence_1 = __webpack_require__(24);
var React = __webpack_require__(1);
/** Rows of translations */
var TranslationRows = function (_a) {
    var bpsPerBlock = _a.bpsPerBlock, charWidth = _a.charWidth, elementHeight = _a.elementHeight, findXAndWidth = _a.findXAndWidth, firstBase = _a.firstBase, fullSeq = _a.fullSeq, inputRef = _a.inputRef, lastBase = _a.lastBase, onUnmount = _a.onUnmount, seqType = _a.seqType, translations = _a.translations, yDiff = _a.yDiff;
    return (React.createElement("g", { className: "la-vz-linear-translation", "data-testid": "la-vz-linear-translation", onContextMenu: function (e) {
            e.preventDefault();
        } }, translations.map(function (t, i) { return (React.createElement(TranslationRow, { key: "".concat(t.id, "-").concat(firstBase), bpsPerBlock: bpsPerBlock, charWidth: charWidth, findXAndWidth: findXAndWidth, firstBase: firstBase, fullSeq: fullSeq, height: elementHeight * 0.9, id: t.id, inputRef: inputRef, lastBase: lastBase, seqType: seqType, translation: t, y: yDiff + elementHeight * i, onUnmount: onUnmount })); })));
};
exports.TranslationRows = TranslationRows;
/**
 * A single row for translations of DNA into Amino Acid sequences so a user can
 * see the resulting protein or peptide sequence in the viewer
 */
var TranslationRow = /** @class */ (function (_super) {
    __extends(TranslationRow, _super);
    function TranslationRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.AAs = [];
        // on unmount, clear all AA references.
        _this.componentWillUnmount = function () {
            var onUnmount = _this.props.onUnmount;
            _this.AAs.forEach(function (a) { return onUnmount(a); });
        };
        /**
         * make the actual path string
         */
        _this.genPath = function (count, multiplier) {
            var _a = _this.props, charWidth = _a.charWidth, h = _a.height; // width adjust
            var nW = count * charWidth;
            var wA = multiplier * 3;
            return "M 0 0\n\t\t\tL ".concat(nW, " 0\n\t\t\tL ").concat(nW + wA, " ").concat(h / 2, "\n\t\t\tL ").concat(nW, " ").concat(h, "\n\t\t\tL 0 ").concat(h, "\n\t\t\tL ").concat(wA, " ").concat(h / 2, "\n\t\t\tZ");
        };
        return _this;
    }
    TranslationRow.prototype.render = function () {
        var _this = this;
        var _a = this.props, bpsPerBlock = _a.bpsPerBlock, charWidth = _a.charWidth, findXAndWidth = _a.findXAndWidth, firstBase = _a.firstBase, fullSeq = _a.fullSeq, h = _a.height, inputRef = _a.inputRef, lastBase = _a.lastBase, seqType = _a.seqType, translation = _a.translation, y = _a.y;
        var AAseq = translation.AAseq, direction = translation.direction, end = translation.end, id = translation.id, start = translation.start;
        // if rendering an amino-acid sequence directly, each amino acid block is 1:1 with a "base pair".
        // otherwise, each amino-acid covers three bases.
        var bpPerBlockCount = seqType === 'aa' ? 1 : 3;
        // substring and split only the amino acids that are relevant to this
        // particular sequence block
        var AAs = AAseq.split('');
        return (React.createElement("g", { ref: inputRef(id, {
                end: end,
                name: 'translation',
                parent: __assign(__assign({}, translation), { type: 'TRANSLATION' }),
                start: start,
                type: 'AMINOACID',
                viewer: 'LINEAR',
            }), id: id, transform: "translate(0, ".concat(y, ")") }, AAs.map(function (a, i) {
            // generate and store an id reference (that's used for selection)
            var aaId = (0, sequence_1.randomID)();
            _this.AAs.push(aaId);
            // calculate the start and end point of each amino acid
            // modulo needed here for translations that cross zero index
            var AAStart = (start + i * bpPerBlockCount) % fullSeq.length;
            var AAEnd = start + i * bpPerBlockCount + bpPerBlockCount;
            if (AAStart > AAEnd && firstBase >= bpsPerBlock) {
                // amino acid has crossed zero index in the last SeqBlock
                AAEnd += fullSeq.length;
            }
            else if (AAStart > AAEnd && firstBase < bpsPerBlock) {
                // amino acid has crossed zero index in the first SeqBlock
                AAStart -= fullSeq.length;
            }
            else if (AAStart === 0 && firstBase >= bpsPerBlock) {
                // extreme edge case (1/3 around zero) where modulo returns zero
                AAStart += fullSeq.length;
                AAEnd += fullSeq.length;
            }
            // build up a selection handler reference for just this amino acid,
            // so a singly translated amino acid can be selected from within the
            // larger translation
            // the amino acid doesn't fit within this SeqBlock (even partially)
            if (AAStart >= lastBase || AAEnd <= firstBase)
                return null;
            var showAminoAcidLabel = true; // whether to show amino acids abbreviation
            var bpCount = bpPerBlockCount; // start off assuming the full thing is shown
            if (AAStart < firstBase) {
                bpCount = Math.min(bpPerBlockCount, AAEnd - firstBase);
                if (bpCount < 2 && seqType !== 'aa') {
                    // w/ one bp, the amino acid is probably too small for an abbreviation
                    showAminoAcidLabel = false;
                }
            }
            else if (AAEnd > lastBase) {
                bpCount = Math.min(bpPerBlockCount, lastBase - AAStart);
                if (bpCount < 2 && seqType !== 'aa') {
                    showAminoAcidLabel = false;
                }
            }
            var x = findXAndWidth(Math.max(AAStart, firstBase)).x;
            // direction check needed to determine which direction the amino acid translation
            // arrow are facing
            var path = _this.genPath(bpCount, direction === 1 ? 1 : -1);
            return (React.createElement("g", { key: aaId, ref: inputRef(aaId, {
                    end: AAEnd,
                    parent: __assign(__assign({}, translation), { type: 'TRANSLATION' }),
                    start: AAStart,
                    type: 'AMINOACID',
                    viewer: 'LINEAR',
                }), id: aaId, transform: "translate(".concat(x, ", 0)"), onMouseDown: function (e) {
                    if (e.button === 2) {
                        e.stopPropagation();
                        return;
                    }
                }, onMouseUp: function (e) {
                    if (e.button === 2) {
                        e.stopPropagation();
                        return;
                    }
                } },
                React.createElement("path", { d: path, fill: fullSeq.includes('|') ? '#0000' : (0, colors_1.colorByIndex)(a.charCodeAt(0)), id: aaId, shapeRendering: "geometricPrecision", stroke: fullSeq.includes('|') ? '#0000' : (0, colors_1.borderColorByIndex)(a.charCodeAt(0)), style: {
                        cursor: 'pointer',
                        opacity: 0.7,
                        strokeWidth: 0.8,
                    } }),
                showAminoAcidLabel && (React.createElement("text", { className: "la-vz-translation-amino-acid-label", cursor: "pointer", "data-testid": "la-vz-translation", dominantBaseline: "middle", id: aaId, textAnchor: "middle", x: bpCount * 0.5 * charWidth, y: "".concat(h / 2 + 1) }, a))));
        })));
    };
    return TranslationRow;
}(React.PureComponent));


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var React = __webpack_require__(1);
var selectionContext_1 = __webpack_require__(21);
/**
 * SelectionHandler handles sequence selection. Each click, drag, etc, is
 * noted and mapped to a sequence index.
 */
var SelectionHandler = /** @class */ (function (_super) {
    __extends(SelectionHandler, _super);
    function SelectionHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** Only state is the selection range */
        _this.state = __assign({}, selectionContext_1.defaultSelection);
        /* previous base cursor is over, used in circular drag select */
        _this.previousBase = null;
        /* directionality of drag (true if clockwise), used in circular drag select */
        _this.forward = null;
        /* full selection length, used in circular drag select */
        _this.fullSelectionLength = 0;
        /* is the user currently dragging across the surface of the seqViewer? this is tracked on SeqBlocks in particular (onMouseOver), used in circular drag select */
        _this.dragEvent = false;
        /* is there a selection already, used for shift-click catch up */
        _this.selectionStarted = false;
        /* was the last selection action a shift click, used for shift-click catch up */
        _this.shiftSelection = false;
        /* unix time of the last click (awful attempt at detecting double clicks) */
        _this.lastClick = Date.now();
        /** a map between the id of child elements and their associated SelectRanges */
        _this.idToRange = new Map();
        _this.componentDidMount = function () {
            if (!document)
                return;
            document.addEventListener("mouseup", _this.stopDrag);
        };
        _this.componentWillUnmount = function () {
            if (!document)
                return;
            document.removeEventListener("mouseup", _this.stopDrag);
        };
        /** Stop the current drag event from happening */
        _this.stopDrag = function () {
            _this.dragEvent = false;
        };
        /**
         * Called at start of drag to make sure checkers are reset to default state
         */
        _this.resetCircleDragVars = function (start) {
            _this.previousBase = start;
            _this.forward = null;
            _this.fullSelectionLength = 0;
            _this.dragEvent = true; // start a drag event
        };
        /**
         * a ref callback for mapping the id of child to its SelectRange
         * it stores the id of all elements
         **/
        _this.inputRef = function (ref, selectRange) {
            _this.idToRange.set(ref, __assign({ ref: ref }, selectRange));
        };
        /**
         * remove the ref by ID.
         */
        _this.removeMountedBlock = function (ref) {
            _this.idToRange.delete(ref);
        };
        /**
         * the selected child element is something that is known by reference.
         * update its SeqBlock's range (or any others affected) with the newly
         * active range
         */
        _this.mouseEvent = function (e) {
            var setCentralIndex = _this.props.setCentralIndex;
            // should not be updating selection since it's not a drag event time
            if ((e.type === "mousemove" || e.type === "mouseup") && !_this.dragEvent) {
                return;
            }
            // storing this to figure out if it was a double click
            var msSinceLastClick = Date.now() - _this.lastClick;
            var knownRange = _this.dragEvent
                ? _this.idToRange.get(e.currentTarget.id) // only look for SeqBlocks
                : _this.idToRange.get(e.target.id) || _this.idToRange.get(e.currentTarget.id); // elements and SeqBlocks
            if (!knownRange) {
                return; // there isn't a known range with the id of the element
            }
            knownRange = __assign(__assign({}, knownRange), { end: knownRange.end || 0, start: knownRange.start || 0 });
            var direction = knownRange.direction, end = knownRange.end, start = knownRange.start, viewer = knownRange.viewer;
            switch (knownRange.type) {
                case "ANNOTATION":
                case "FIND":
                case "TRANSLATION":
                case "ENZYME":
                case "HIGHLIGHT": {
                    if (viewer !== "LINEAR" && setCentralIndex) {
                        // if an element was clicked on the circular viewer, scroll the linear
                        // viewer so the element starts on the first SeqBlock
                        setCentralIndex("LINEAR", start || 0);
                    }
                    // Annotation or find selection range
                    var clockwise = direction ? direction === 1 : true;
                    var selectionStart = clockwise ? start : end;
                    var selectionEnd = clockwise ? end : start;
                    _this.setSelection(__assign(__assign({}, knownRange), { clockwise: clockwise, end: selectionEnd, start: selectionStart }));
                    _this.dragEvent = false;
                    _this.lastClick = Date.now();
                    break;
                }
                case "AMINOACID": {
                    // Annotation or find selection range
                    var clockwise = direction ? direction === 1 : true;
                    var selectionStart = clockwise ? start : end;
                    var selectionEnd = clockwise ? end : start;
                    // if they double clicked, select the whole translation
                    // https://en.wikipedia.org/wiki/Double-click#Speed_and_timing
                    if (msSinceLastClick < 300 && knownRange.parent) {
                        knownRange = __assign(__assign({}, knownRange.parent), { end: knownRange.parent.end || 0, start: knownRange.parent.start || 0 });
                        selectionStart = clockwise ? knownRange.start : knownRange.end;
                        selectionEnd = clockwise ? knownRange.end : knownRange.start;
                    }
                    _this.setSelection(__assign(__assign({}, knownRange), { clockwise: clockwise, end: selectionEnd, start: selectionStart }));
                    _this.dragEvent = false;
                    _this.lastClick = Date.now();
                    e.stopPropagation(); // necessary to stop a double click
                    break;
                }
                case "SEQ": {
                    if (viewer === "LINEAR") {
                        _this.handleLinearSeqEvent(e, __assign(__assign({}, knownRange), { end: knownRange.end || 0, start: knownRange.start || 0 }));
                    }
                    else if (viewer === "CIRCULAR") {
                        _this.handleCircularSeqEvent(e);
                    }
                    break;
                }
                default:
            }
        };
        /**
         * Handle a sequence selection on a linear viewer
         */
        _this.handleLinearSeqEvent = function (e, knownRange) {
            var selection = _this.context;
            var currBase = _this.calculateBaseLinear(e, knownRange);
            var clockwiseDrag = selection.start !== null && currBase >= (selection.start || 0);
            if (e.button === 0 && e.type === "mousedown" && currBase !== null) {
                // this is the start of a drag event
                _this.setSelection(__assign(__assign({}, selectionContext_1.defaultSelection), { clockwise: clockwiseDrag, end: currBase, start: e.shiftKey ? selection.start : currBase }));
                _this.dragEvent = true;
            }
            else if (e.button === 0 && _this.dragEvent && currBase !== null) {
                // continue a drag event that's currently happening
                _this.setSelection(__assign(__assign({}, selectionContext_1.defaultSelection), { clockwise: clockwiseDrag, end: currBase, start: selection.start }));
                // TODO : add button === 2 to display window
            }
        };
        /**
         * Handle a sequence selection event on the circular viewer
         */
        _this.handleCircularSeqEvent = function (e) {
            var seq = _this.props.seq;
            var selection = _this.context;
            var start = selection.start;
            var clockwise = selection.clockwise, end = selection.end;
            var currBase = _this.calculateBaseCircular(e);
            var seqLength = seq.length;
            if (e.type === "mousedown") {
                var selStart = e.shiftKey ? start || 0 : currBase;
                var lookahead = e.shiftKey
                    ? _this.calcSelectionLength(selStart, currBase, false)
                    : _this.calcSelectionLength(selStart, currBase, true); // check clockwise selection length
                _this.selectionStarted = lookahead > 0; // update check for whether there is a prior selection
                _this.resetCircleDragVars(selStart); // begin drag event
                _this.setSelection(__assign(__assign({}, selectionContext_1.defaultSelection), { clockwise: clockwise, end: currBase, ref: "", start: selStart, type: "SEQ" }));
            }
            else if (e.type === "mousemove" &&
                _this.dragEvent &&
                currBase &&
                _this.previousBase &&
                currBase !== _this.previousBase) {
                var increased = currBase > _this.previousBase; // bases increased
                var changeThreshold = seqLength * 0.9; // threshold for unrealistic change by mouse movement
                var change = Math.abs(_this.previousBase - currBase); // index change from this mouse movement
                var crossedZero = change > changeThreshold; // zero was crossed if base jumped more than changeThreshold
                _this.forward = increased ? !crossedZero : crossedZero; // bases increased XOR crossed zero
                var lengthChange = crossedZero ? seqLength - change : change; // the change at the point where we cross zero has to be normalized by seqLength
                var sameDirectionMove = _this.forward === selection.clockwise || selection.clockwise === null; // moving in same direction as start of drag or start of drag
                if (sameDirectionMove) {
                    _this.fullSelectionLength += lengthChange;
                }
                else {
                    _this.fullSelectionLength -= lengthChange;
                }
                _this.previousBase = currBase; // done comparing with previous base, update previous base
                if (_this.fullSelectionLength < seqLength * 0.01 && !_this.shiftSelection) {
                    clockwise = _this.forward; // near selection start so selection direction is up for grabs
                    var check_1 = _this.calcSelectionLength(selection.start || 0, currBase, _this.forward); // check actual current selection length
                    if (_this.fullSelectionLength < 0) {
                        // This is to correct for errors when dragging too fast
                        _this.fullSelectionLength = check_1;
                    }
                    if (check_1 > _this.fullSelectionLength) {
                        // the actual selection length being greater than additive selection
                        // length means we have come back to start and want to go in opposite direction
                        clockwise = !_this.forward;
                    }
                    end = currBase;
                }
                sameDirectionMove = _this.forward === selection.clockwise; // recalculate this in case we've switched selection directionality
                // check the selection length, this is agnostic to the ALL reference and
                // will always calculate from where you cursor is to the start of selection
                var check = _this.calcSelectionLength(selection.start || 0, currBase, selection.clockwise || true);
                if (_this.selectionStarted && _this.shiftSelection && check > _this.fullSelectionLength) {
                    _this.fullSelectionLength = check; // shift select catch up
                }
                // there is an ongoing drag in the same direction as the direction the selection started in
                var sameDirectionDrag = _this.dragEvent && sameDirectionMove;
                var fullSelection = false; // selection is full sequence
                // TODO: fix const fullSelection = currRef === "ALL"; // selection is full sequence
                var hitFullSelection = !fullSelection && _this.fullSelectionLength >= seqLength; // selection became full sequence
                if (sameDirectionDrag && hitFullSelection) {
                    end = start;
                }
                else if (fullSelection) {
                    // this ensures that backtracking doesn't require making up to your overshoot forward circles
                    _this.fullSelectionLength = seqLength + (_this.fullSelectionLength % seqLength);
                    if (!sameDirectionDrag && // changed direction
                        check === _this.fullSelectionLength - seqLength && // back tracking
                        check > seqLength * 0.9 // passed selection start
                    ) {
                        end = currBase; // start decreasing selection size due to backtracking
                        // reset calculated additive selection length to normal now that we are not at ALL length
                        _this.fullSelectionLength = _this.fullSelectionLength - seqLength;
                    }
                }
                else {
                    end = currBase; // nothing special just update the selection
                }
                _this.shiftSelection = false;
                _this.setSelection(__assign(__assign({}, selectionContext_1.defaultSelection), { clockwise: clockwise, end: end, start: start, type: "SEQ" }));
            }
        };
        /**
         * in a linear sequence viewer, given the bounding box of a component, the basepairs
         * by SeqBlock and the position of the mouse event, find the current base
         */
        _this.calculateBaseLinear = function (e, knownRange) {
            var bpsPerBlock = _this.props.bpsPerBlock;
            var block = e.currentTarget.getBoundingClientRect();
            var distFromLeft = e.clientX - block.left;
            var ratioFromLeft = distFromLeft / block.width;
            var bpsFromLeft = Math.round(ratioFromLeft * bpsPerBlock);
            return Math.min(knownRange.start + bpsFromLeft, knownRange.end);
        };
        /**
         * in a circular plasmid viewer, given the center of the viewer, and position of the
         * mouse event, find the currently hovered or clicked basepair
         */
        _this.calculateBaseCircular = function (e) {
            var _a = _this.props, center = _a.center, centralIndex = _a.centralIndex, seq = _a.seq, yDiff = _a.yDiff;
            if (!center)
                return 0;
            var block = e.currentTarget.getBoundingClientRect();
            // position on the plasmid viewer
            var distFromLeft = e.clientX - block.left;
            var distFromTop = e.clientY - block.top;
            // position relative to center
            var x = distFromLeft - center.x;
            var y = distFromTop - (center.y + yDiff);
            var riseToRun = y / x;
            var posInRads = Math.atan(riseToRun);
            var posInDeg = posInRads * (180 / Math.PI) + 90; // convert and shift to vertical is 0
            if (x < 0) {
                posInDeg += 180; // left half of the viewer
            }
            var posInPerc = posInDeg / 360; // position as a percentage
            var currBase = Math.round(seq.length * posInPerc); // account for rotation of the viewer
            currBase += centralIndex;
            if (currBase > seq.length) {
                currBase -= seq.length;
            }
            return currBase;
        };
        /**
         * Update the selection in state. Only update the specified
         * properties of the selection that should be updated.
         */
        _this.setSelection = function (newSelection) {
            var selection = _this.context;
            var setSelection = _this.props.setSelection;
            if (newSelection.start === selection.start &&
                newSelection.end === selection.end &&
                newSelection.ref === selection.ref &&
                // to support re-clicking the annotation and causing it to fire a la gh issue https://github.com/Lattice-Automation/seqviz/issues/142
                ["SEQ", "AMINOACID", ""].includes(newSelection.type || "")) {
                return;
            }
            var _a = __assign(__assign({}, selection), newSelection), clockwise = _a.clockwise, end = _a.end, name = _a.name, ref = _a.ref, start = _a.start, type = _a.type;
            var length = _this.calcSelectionLength(start, end, clockwise);
            setSelection({
                clockwise: clockwise,
                end: end,
                length: length,
                name: name,
                ref: ref,
                start: start,
                type: type,
            });
        };
        /**
         * Check what the length of the selection is in circle drag select
         */
        _this.calcSelectionLength = function (start, base, clock) {
            var seq = _this.props.seq;
            if (base < start && !clock) {
                return start - base;
            }
            if (base > start && !clock) {
                return start + (seq.length - base);
            }
            if (base > start && clock) {
                return base - start;
            }
            if (base < start && clock) {
                return seq.length - start + base;
            }
            return 0;
        };
        return _this;
    }
    SelectionHandler.prototype.render = function () {
        return this.props.children(this.inputRef, this.mouseEvent, this.removeMountedBlock);
    };
    SelectionHandler.displayName = "WithSelectionHandler";
    SelectionHandler.contextType = selectionContext_1.default;
    return SelectionHandler;
}(React.PureComponent));
exports["default"] = SelectionHandler;


/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var selectionContext_1 = __webpack_require__(21);
var React = __webpack_require__(1);
/**
 * SelectionHandler handles sequence selection. Each click, drag, etc, is
 * noted and mapped to a sequence index.
 */
var SelectionHandler = /** @class */ (function (_super) {
    __extends(SelectionHandler, _super);
    function SelectionHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** Only state is the selection range */
        _this.state = __assign({}, selectionContext_1.defaultSelection);
        /* previous base cursor is over, used in circular drag select */
        _this.previousBase = null;
        /* directionality of drag (true if clockwise), used in circular drag select */
        _this.forward = null;
        /* full selection length, used in circular drag select */
        _this.fullSelectionLength = 0;
        /* is the user currently dragging across the surface of the seqViewer? this is tracked on SeqBlocks in particular (onMouseOver), used in circular drag select */
        _this.dragEvent = false;
        /* is there a selection already, used for shift-click catch up */
        _this.selectionStarted = false;
        /* was the last selection action a shift click, used for shift-click catch up */
        _this.shiftSelection = false;
        /* unix time of the last click (awful attempt at detecting double clicks) */
        _this.lastClick = Date.now();
        /** a map between the id of child elements and their associated SelectRanges */
        _this.idToRange = new Map();
        _this.componentDidMount = function () {
            if (!document)
                return;
            document.addEventListener('mouseup', _this.stopDrag);
        };
        _this.componentWillUnmount = function () {
            if (!document)
                return;
            document.removeEventListener('mouseup', _this.stopDrag);
        };
        /** Stop the current drag event from happening */
        _this.stopDrag = function () {
            _this.dragEvent = false;
        };
        /**
         * Called at start of drag to make sure checkers are reset to default state
         */
        _this.resetCircleDragVars = function (start) {
            _this.previousBase = start;
            _this.forward = null;
            _this.fullSelectionLength = 0;
            _this.dragEvent = true; // start a drag event
        };
        /**
         * a ref callback for mapping the id of child to its SelectRange
         * it stores the id of all elements
         **/
        _this.inputRef = function (ref, selectRange) {
            _this.idToRange.set(ref, __assign({ ref: ref }, selectRange));
        };
        /**
         * remove the ref by ID.
         */
        _this.removeMountedBlock = function (ref) {
            _this.idToRange.delete(ref);
        };
        /**
         * the selected child element is something that is known by reference.
         * update its SeqBlock's range (or any others affected) with the newly
         * active range
         */
        _this.mouseEvent = function (e) {
            var setCentralIndex = _this.props.setCentralIndex;
            // should not be updating selection since it's not a drag event time
            if ((e.type === 'mousemove' || e.type === 'mouseup') && !_this.dragEvent) {
                return;
            }
            // storing this to figure out if it was a double click
            var msSinceLastClick = Date.now() - _this.lastClick;
            var knownRange = _this.dragEvent
                ? _this.idToRange.get(e.currentTarget.id) // only look for SeqBlocks
                : _this.idToRange.get(e.target.id) || _this.idToRange.get(e.currentTarget.id); // elements and SeqBlocks
            if (!knownRange) {
                return; // there isn't a known range with the id of the element
            }
            knownRange = __assign(__assign({}, knownRange), { end: knownRange.end || 0, start: knownRange.start || 0 });
            var direction = knownRange.direction, end = knownRange.end, start = knownRange.start, viewer = knownRange.viewer;
            switch (knownRange.type) {
                case 'ANNOTATION':
                case 'FIND':
                case 'TRANSLATION':
                case 'ENZYME':
                case 'HIGHLIGHT': {
                    if (viewer !== 'LINEAR' && setCentralIndex) {
                        // if an element was clicked on the circular viewer, scroll the linear
                        // viewer so the element starts on the first SeqBlock
                        setCentralIndex('LINEAR', start || 0);
                    }
                    // Annotation or find selection range
                    var clockwise = direction ? direction === 1 : true;
                    var selectionStart = clockwise ? start : end;
                    var selectionEnd = clockwise ? end : start;
                    _this.setSelection(__assign(__assign({}, knownRange), { clockwise: clockwise, end: selectionEnd, start: selectionStart }));
                    _this.dragEvent = false;
                    _this.lastClick = Date.now();
                    break;
                }
                case 'AMINOACID': {
                    // Annotation or find selection range
                    var clockwise = direction ? direction === 1 : true;
                    var selectionStart = clockwise ? start : end;
                    var selectionEnd = clockwise ? end : start;
                    // if they double clicked, select the whole translation
                    // https://en.wikipedia.org/wiki/Double-click#Speed_and_timing
                    if (msSinceLastClick < 300 && knownRange.parent) {
                        knownRange = __assign(__assign({}, knownRange.parent), { end: knownRange.parent.end || 0, start: knownRange.parent.start || 0 });
                        selectionStart = clockwise ? knownRange.start : knownRange.end;
                        selectionEnd = clockwise ? knownRange.end : knownRange.start;
                    }
                    _this.setSelection(__assign(__assign({}, knownRange), { clockwise: clockwise, end: selectionEnd, start: selectionStart }));
                    _this.dragEvent = false;
                    _this.lastClick = Date.now();
                    e.stopPropagation(); // necessary to stop a double click
                    break;
                }
                case 'SEQ': {
                    if (viewer === 'LINEAR') {
                        _this.handleLinearSeqEvent(e, __assign(__assign({}, knownRange), { end: knownRange.end || 0, start: knownRange.start || 0 }));
                    }
                    else if (viewer === 'CIRCULAR') {
                        // this.handleCircularSeqEvent(e);
                    }
                    break;
                }
                default:
            }
        };
        /**
         * Handle a sequence selection on a linear viewer
         */
        _this.handleLinearSeqEvent = function (e, knownRange) {
            var selection = _this.context;
            var currBase = _this.calculateBaseLinear(e, knownRange);
            var clockwiseDrag = selection.start !== null && currBase >= (selection.start || 0);
            if (e.button === 0 && e.type === 'mousedown' && currBase !== null) {
                // this is the start of a drag event
                _this.setSelection(__assign(__assign({}, selectionContext_1.defaultSelection), { clockwise: clockwiseDrag, end: currBase, start: e.shiftKey ? selection.start : currBase }));
                _this.dragEvent = true;
            }
            else if (e.button === 0 && _this.dragEvent && currBase !== null) {
                // continue a drag event that's currently happening
                _this.setSelection(__assign(__assign({}, selectionContext_1.defaultSelection), { clockwise: clockwiseDrag, end: currBase, start: selection.start }));
            }
        };
        /**
         * Handle a sequence selection event on the circular viewer
         */
        // handleCircularSeqEvent = (e: SeqVizMouseEvent) => {
        //   const { seq } = this.props;
        //   const selection = this.context;
        //   const { start } = selection;
        //   let { clockwise, end } = selection;
        //   const currBase = this.calculateBaseCircular(e);
        //   const seqLength = seq.length;
        //   if (e.type === "mousedown") {
        //     const selStart = e.shiftKey ? start || 0 : currBase;
        //     const lookahead = e.shiftKey
        //       ? this.calcSelectionLength(selStart, currBase, false)
        //       : this.calcSelectionLength(selStart, currBase, true); // check clockwise selection length
        //     this.selectionStarted = lookahead > 0; // update check for whether there is a prior selection
        //     this.resetCircleDragVars(selStart); // begin drag event
        //     this.setSelection({
        //       ...defaultSelection,
        //       clockwise: clockwise,
        //       end: currBase,
        //       ref: "",
        //       start: selStart,
        //       type: "SEQ",
        //     });
        //   } else if (
        //     e.type === "mousemove" &&
        //     this.dragEvent &&
        //     currBase &&
        //     this.previousBase &&
        //     currBase !== this.previousBase
        //   ) {
        //     const increased = currBase > this.previousBase; // bases increased
        //     const changeThreshold = seqLength * 0.9; // threshold for unrealistic change by mouse movement
        //     const change = Math.abs(this.previousBase - currBase); // index change from this mouse movement
        //     const crossedZero = change > changeThreshold; // zero was crossed if base jumped more than changeThreshold
        //     this.forward = increased ? !crossedZero : crossedZero; // bases increased XOR crossed zero
        //     const lengthChange = crossedZero ? seqLength - change : change; // the change at the point where we cross zero has to be normalized by seqLength
        //     let sameDirectionMove = this.forward === selection.clockwise || selection.clockwise === null; // moving in same direction as start of drag or start of drag
        //     if (sameDirectionMove) {
        //       this.fullSelectionLength += lengthChange;
        //     } else {
        //       this.fullSelectionLength -= lengthChange;
        //     }
        //     this.previousBase = currBase; // done comparing with previous base, update previous base
        //     if (this.fullSelectionLength < seqLength * 0.01 && !this.shiftSelection) {
        //       clockwise = this.forward; // near selection start so selection direction is up for grabs
        //       const check = this.calcSelectionLength(selection.start || 0, currBase, this.forward); // check actual current selection length
        //       if (this.fullSelectionLength < 0) {
        //         // This is to correct for errors when dragging too fast
        //         this.fullSelectionLength = check;
        //       }
        //       if (check > this.fullSelectionLength) {
        //         // the actual selection length being greater than additive selection
        //         // length means we have come back to start and want to go in opposite direction
        //         clockwise = !this.forward;
        //       }
        //       end = currBase;
        //     }
        //     sameDirectionMove = this.forward === selection.clockwise; // recalculate this in case we've switched selection directionality
        //     // check the selection length, this is agnostic to the ALL reference and
        //     // will always calculate from where you cursor is to the start of selection
        //     const check = this.calcSelectionLength(selection.start || 0, currBase, selection.clockwise || true);
        //     if (this.selectionStarted && this.shiftSelection && check > this.fullSelectionLength) {
        //       this.fullSelectionLength = check; // shift select catch up
        //     }
        //     // there is an ongoing drag in the same direction as the direction the selection started in
        //     const sameDirectionDrag = this.dragEvent && sameDirectionMove;
        //     const fullSelection = false; // selection is full sequence
        //     // TODO: fix const fullSelection = currRef === "ALL"; // selection is full sequence
        //     const hitFullSelection = !fullSelection && this.fullSelectionLength >= seqLength; // selection became full sequence
        //     if (sameDirectionDrag && hitFullSelection) {
        //       end = start;
        //     } else if (fullSelection) {
        //       // this ensures that backtracking doesn't require making up to your overshoot forward circles
        //       this.fullSelectionLength = seqLength + (this.fullSelectionLength % seqLength);
        //       if (
        //         !sameDirectionDrag && // changed direction
        //         check === this.fullSelectionLength - seqLength && // back tracking
        //         check > seqLength * 0.9 // passed selection start
        //       ) {
        //         end = currBase; // start decreasing selection size due to backtracking
        //         // reset calculated additive selection length to normal now that we are not at ALL length
        //         this.fullSelectionLength = this.fullSelectionLength - seqLength;
        //       }
        //     } else {
        //       end = currBase; // nothing special just update the selection
        //     }
        //     this.shiftSelection = false;
        //     this.setSelection({
        //       ...defaultSelection,
        //       clockwise: clockwise,
        //       end: end,
        //       start: start,
        //       type: "SEQ",
        //     });
        //   }
        // };
        /**
         * in a linear sequence viewer, given the bounding box of a component, the basepairs
         * by SeqBlock and the position of the mouse event, find the current base
         */
        _this.calculateBaseLinear = function (e, knownRange) {
            var bpsPerBlock = _this.props.bpsPerBlock;
            var block = e.currentTarget.getBoundingClientRect();
            var distFromLeft = e.clientX - block.left;
            var ratioFromLeft = distFromLeft / block.width;
            var bpsFromLeft = Math.round(ratioFromLeft * bpsPerBlock);
            return Math.min(knownRange.start + bpsFromLeft, knownRange.end);
        };
        /**
         * in a circular plasmid viewer, given the center of the viewer, and position of the
         * mouse event, find the currently hovered or clicked basepair
         */
        // calculateBaseCircular = (e: SeqVizMouseEvent) => {
        //   const { center, centralIndex, seq, yDiff } = this.props;
        //   if (!center) return 0;
        //   const block = e.currentTarget.getBoundingClientRect();
        //   // position on the plasmid viewer
        //   const distFromLeft = e.clientX - block.left;
        //   const distFromTop = e.clientY - block.top;
        //   // position relative to center
        //   const x = distFromLeft - center.x;
        //   const y = distFromTop - (center.y + (yDiff as number));
        //   const riseToRun = y / x;
        //   const posInRads = Math.atan(riseToRun);
        //   let posInDeg = posInRads * (180 / Math.PI) + 90; // convert and shift to vertical is 0
        //   if (x < 0) {
        //     posInDeg += 180; // left half of the viewer
        //   }
        //   const posInPerc = posInDeg / 360; // position as a percentage
        //   let currBase = Math.round(seq.length * posInPerc); // account for rotation of the viewer
        //   currBase += centralIndex as number;
        //   if (currBase > seq.length) {
        //     currBase -= seq.length;
        //   }
        //   return currBase;
        // };
        /**
         * Update the selection in state. Only update the specified
         * properties of the selection that should be updated.
         */
        _this.setSelection = function (newSelection) {
            var selection = _this.context;
            var setSelection = _this.props.setSelection;
            if (newSelection.start === selection.start &&
                newSelection.end === selection.end &&
                newSelection.ref === selection.ref &&
                // to support re-clicking the annotation and causing it to fire a la gh issue https://github.com/Lattice-Automation/seqviz/issues/142
                ['SEQ', 'AMINOACID', ''].includes(newSelection.type || '')) {
                return;
            }
            var _a = __assign(__assign({}, selection), newSelection), clockwise = _a.clockwise, end = _a.end, name = _a.name, ref = _a.ref, start = _a.start, type = _a.type;
            var length = _this.calcSelectionLength(start, end, clockwise);
            setSelection({
                clockwise: clockwise,
                end: end,
                length: length,
                name: name,
                ref: ref,
                start: start,
                type: type,
            });
        };
        /**
         * Check what the length of the selection is in circle drag select
         */
        _this.calcSelectionLength = function (start, base, clock) {
            var seq = _this.props.seq[0];
            if (base < start && !clock) {
                return start - base;
            }
            if (base > start && !clock) {
                return start + (seq.length - base);
            }
            if (base > start && clock) {
                return base - start;
            }
            if (base < start && clock) {
                return seq.length - start + base;
            }
            return 0;
        };
        return _this;
    }
    SelectionHandler.prototype.render = function () {
        return this.props.children(this.inputRef, this.mouseEvent, this.removeMountedBlock);
    };
    SelectionHandler.displayName = 'WithSelectionHandler';
    SelectionHandler.contextType = selectionContext_1.default;
    return SelectionHandler;
}(React.PureComponent));
exports["default"] = SelectionHandler;


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var InfiniteScroll_1 = __webpack_require__(29);
var SeqBlock_1 = __webpack_require__(30);
var elementsToRows_1 = __webpack_require__(10);
var isEqual_1 = __webpack_require__(11);
var sequence_1 = __webpack_require__(24);
var React = __webpack_require__(1);
/**
 * A linear sequence viewer.
 *
 * Comprised of SeqBlock(s), which are themselves comprised of:
 * 	text (seq)
 * 	Index (axis)
 * 	Annotations
 *  Finds
 *  Translations
 *  Selections
 */
var Alignment = /** @class */ (function (_super) {
    __extends(Alignment, _super);
    function Alignment() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Deep equality comparison
         */
        _this.shouldComponentUpdate = function (nextProps) { return !(0, isEqual_1.isEqual)(nextProps, _this.props); };
        return _this;
    }
    /**
     * given all the information needed to render all the seqblocks (ie, sequence, compSeq
     * list of annotations), cut up all that information into an array.
     * Each element in that array pertaining to one SeqBlock
     *
     * For example, if each seqblock has 2 bps, and the seq is "ATGCAG", this should first
     * make an array of ["AT", "GC", "AG"], and then pass "AT" to the first SeqBlock, "GC" to
     * the second seqBlock, and "AG" to the third seqBlock.
     */
    Alignment.prototype.render = function () {
        var _this = this;
        var _a = this.props, annotations = _a.annotations, bpsPerBlock = _a.bpsPerBlock, compSeq = _a.compSeq, cutSites = _a.cutSites, elementHeight = _a.elementHeight, highlights = _a.highlights, lineHeight = _a.lineHeight, seqToCompare = _a.seqToCompare, onUnmount = _a.onUnmount, search = _a.search, seq = _a.seq, seqType = _a.seqType, 
        // showComplement,
        showIndex = _a.showIndex, size = _a.size, translations = _a.translations, zoom = _a.zoom;
        // un-official definition for being zoomed in. Being over 10 seems like a decent cut-off
        var zoomed = zoom.linear > 10;
        var showComplement = false;
        var blossom_block = [
            ['c'],
            ['s', 't', 'a', 'g', 'p'],
            ['d', 'e', 'q', 'n'],
            ['k', 'r', 'h'],
            ['m', 'i', 'l', 'v'],
            ['f', 'y', 'w']
        ];
        // the actual fragmenting of the sequence into subblocks. generates all info that will be needed
        // including sequence blocks, complement blocks, annotations, blockHeights
        var seqLength = seq.length;
        var arrSize = Math.round(Math.ceil(seqLength / bpsPerBlock));
        if (arrSize === Number.POSITIVE_INFINITY)
            arrSize = 1;
        var seqToCompareLength = seqToCompare.length;
        var arrCompareSize = Math.round(Math.ceil(seqToCompareLength / bpsPerBlock));
        if (arrSize === Number.POSITIVE_INFINITY)
            arrSize = 1;
        var seqSymbols = '';
        if (seqType === 'aa') {
            seqToCompare.split('').forEach(function (c, i) { return seqSymbols += (blossom_block.find(function (block) { return block.includes(c.toLowerCase()); }) || []).includes(seq[i].toLowerCase()) ? (seq[i] === c) ? '|' : '.' : ' '; });
        }
        else {
            seqToCompare.split('').forEach(function (c, i) { return seqSymbols += [c, seq[i]].includes('-') ? ' ' : c === seq[i] ? '|' : '.'; });
        }
        var ids = new Array(arrSize); // array of SeqBlock ids
        var seqs = new Array(arrSize); // arrays for sequences...
        var seqsToCompare = new Array(arrCompareSize); // arrays for sequences...
        var seqsSymbols = new Array(arrCompareSize); // arrays for sequences...
        var idsCp = new Array(arrCompareSize); // array of SeqBlock ids
        var idsSy = new Array(arrCompareSize); // array of SeqBlock ids
        var compSeqs = new Array(arrSize); // complements...
        var blockHeights = new Array(arrSize); // block heights...
        var cutSiteRows = cutSites.length
            ? (0, elementsToRows_1.createSingleRows)(cutSites, bpsPerBlock, arrSize)
            : new Array(arrSize).fill([]);
        /**
         * Vet the annotations for starts and ends at zero index
         */
        var vetAnnotations = function (annotations) {
            annotations.forEach(function (ann) {
                if (ann.end === 0 && ann.start > ann.end)
                    ann.end = seqLength;
                if (ann.start === seqLength && ann.end < ann.start)
                    ann.start = 0;
            });
            return annotations;
        };
        var annotationRows = (0, elementsToRows_1.createMultiRows)((0, elementsToRows_1.stackElements)(vetAnnotations(annotations), seq.length), bpsPerBlock, arrSize);
        var searchRows = search && search.length ? (0, elementsToRows_1.createSingleRows)(search, bpsPerBlock, arrSize) : new Array(arrSize).fill([]);
        var highlightRows = (0, elementsToRows_1.createSingleRows)(highlights, bpsPerBlock, arrSize);
        var translationRows = translations.length
            ? (0, elementsToRows_1.createSingleRows)((0, sequence_1.createTranslations)(translations, seq, seqType), bpsPerBlock, arrSize)
            : new Array(arrSize).fill([]);
        var translationRowsForSymbols = translations.length
            ? (0, elementsToRows_1.createSingleRows)((0, sequence_1.createTranslations)(translations, seqSymbols, seqType), bpsPerBlock, arrSize)
            : new Array(arrSize).fill([]); // seqSymbols;
        var translationRowsComparison = translations.length
            ? (0, elementsToRows_1.createSingleRows)((0, sequence_1.createTranslations)(translations, seqToCompare, seqType), bpsPerBlock, arrSize)
            : new Array(arrSize).fill([]);
        for (var i = 0; i < arrSize; i += 1) {
            var firstBase = i * bpsPerBlock;
            var lastBase = firstBase + bpsPerBlock;
            // cut the new sequence and, if also looking for complement, the complement as well
            seqs[i] = seq.substring(firstBase, lastBase);
            seqsSymbols[i] = seqSymbols.substring(firstBase, lastBase);
            seqsToCompare[i] = seqToCompare.substring(firstBase, lastBase);
            compSeqs[i] = compSeq.substring(firstBase, lastBase);
            // store a unique id from the block
            ids[i] = seqs[i] + String(i);
            idsCp[i] = seqsToCompare[i] + String(i);
            idsSy[i] = seqsSymbols[i] + String(i);
            // find the line height for the seq block based on how many rows need to be shown
            var blockHeight = lineHeight * 1.1; // this is for padding between the SeqBlocks
            if (seqType != "aa") {
                blockHeight += lineHeight; // for sequence row
            }
            if (zoomed) {
                blockHeight += showComplement ? lineHeight : 0; // double for complement + 2px margin
            }
            if (showIndex) {
                blockHeight += lineHeight; // another for index row
            }
            if (translationRows[i].length) {
                blockHeight += translationRows[i].length * elementHeight;
            }
            if (annotationRows[i].length) {
                blockHeight += annotationRows[i].length * elementHeight;
            }
            if (cutSiteRows[i].length) {
                blockHeight += lineHeight; // space for cutsite name
            }
            blockHeights[i] = blockHeight;
        }
        var seqBlocks = [];
        var seqBlocksCompare = [];
        var seqBlocksSymbols = [];
        var yDiff = 0;
        var _loop_1 = function (i) {
            var firstBase = i * bpsPerBlock;
            [
                { identifier: 'seq1', translationRow: translationRows, array: seqBlocks, fullSequence: seq, sequence: seqs, id: ids, multiplyFactor: 0.3, showIndex: false },
                { identifier: 'symbol', translationRow: translationRowsForSymbols, array: seqBlocksSymbols, fullSequence: seqSymbols, sequence: seqsSymbols, id: idsSy, multiplyFactor: 0.3, showIndex: false },
                { identifier: 'seq2', translationRow: translationRowsComparison, array: seqBlocksCompare, fullSequence: seqToCompare, sequence: seqsToCompare, id: idsCp, multiplyFactor: 1, showIndex: true },
            ].forEach(function (_a) {
                var identifier = _a.identifier, translationRow = _a.translationRow, array = _a.array, fullSequence = _a.fullSequence, sequence = _a.sequence, id = _a.id, multiplyFactor = _a.multiplyFactor, showIndex = _a.showIndex;
                array.push(React.createElement(SeqBlock_1.SeqBlock, { key: "".concat(id[i], "_").concat(identifier), annotationRows: annotationRows[i], blockHeight: blockHeights[i] * multiplyFactor, bpColors: _this.props.bpColors, bpsPerBlock: bpsPerBlock, charWidth: _this.props.charWidth, compSeq: seqToCompare, cutSiteRows: cutSiteRows[i], elementHeight: elementHeight, firstBase: firstBase, fullSeq: fullSequence, handleMouseEvent: _this.props.handleMouseEvent, highlights: highlightRows[i], id: id[i], inputRef: _this.props.inputRef, lineHeight: lineHeight, searchRows: searchRows[i], colorized: _this.props.colorized, seq: sequence[i], seqFontSize: _this.props.seqFontSize, seqType: seqType, showComplement: false, showIndex: showIndex, size: size, translations: translationRow[i], y: yDiff, zoom: zoom, zoomed: zoomed, onUnmount: onUnmount }));
            });
            yDiff += blockHeights[i];
        };
        for (var i = 0; i < arrSize; i += 1) {
            _loop_1(i);
        }
        console.log(seqBlocks);
        return (seqBlocks.length && (React.createElement(React.Fragment, null,
            React.createElement(InfiniteScroll_1.InfiniteScroll, { alignment: true, blockHeights: blockHeights, bpsPerBlock: bpsPerBlock, seqBlocks: seqBlocks, seqBlocksCompare: seqBlocksCompare, seqBlocksSymbols: seqBlocksSymbols, size: { height: size.height, width: size.width }, totalHeight: blockHeights.reduce(function (acc, h) { return acc + h; }, 0) }))));
    };
    return Alignment;
}(React.Component));
exports["default"] = Alignment;


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.findCutSites = void 0;
var enzymes_1 = __webpack_require__(42);
var search_1 = __webpack_require__(43);
var sequence_1 = __webpack_require__(24);
/**
 * Digest a sequence with the enzymes and return an array of cut-site.
 *
 * This is slow enough to impact rendering so shouldn't be ran on each prop change.
 */
exports["default"] = (function (seq, seqType, enzymes, enzymesCustom) {
    if (enzymes === void 0) { enzymes = []; }
    if (enzymesCustom === void 0) { enzymesCustom = {}; }
    var seqToCut = seq + seq;
    // find all the cut sites, deduplicate by index+direction of each cut-site
    var cutSites = enzymes
        // if it's a string, assume it's an enzyme name in the pre-defined enzyme list
        .map(function (e) { return (typeof e === "string" ? enzymes_1.default[e.toLowerCase()] : e); })
        // filter out enzyme names that were wrong
        .filter(function (e) { return e; })
        // add in custom enzymes
        .concat(Object.values(enzymesCustom))
        // build up cut-sites
        .reduce(function (acc, enzyme) {
        // search for cut sites for this enzyme
        (0, exports.findCutSites)(enzyme, seqToCut, seqType, seq.length)
            // deduplicate so there's only one enzyme per index
            .forEach(function (c) { return (acc["".concat(c.fcut, "-").concat(c.direction)] = c); });
        return acc;
    }, {});
    return Object.values(cutSites);
});
/**
 * Search through the sequence with the enzyme and return an array of cut and hang indexes.
 *
 * Exported for testing.
 */
var findCutSites = function (enzyme, seq, seqType, seqL) {
    if (seqType === "aa")
        return [];
    // get the recognitionSite, fcut, and rcut
    var fcut = enzyme.fcut, rcut = enzyme.rcut, rseq = enzyme.rseq;
    var cutSites = [];
    // Find matches on the top/forward sequence.
    var matcher = (0, search_1.createRegex)(rseq, seqType);
    var result = matcher.exec(seq);
    while (result) {
        // add the cut site index, after correcting for actual cut site index
        var index = result.index;
        cutSites.push({
            direction: 1,
            end: index + rseq.length,
            enzyme: enzyme,
            fcut: index + fcut,
            id: "",
            name: enzyme.name,
            rcut: index + rcut,
            start: index,
        });
        result = matcher.exec(seq);
    }
    // We don't want to double-count cuts by enzymes whose recognition seq is the
    // same in the forward and reverse complement direction (eg SpeI).
    var dupRevComp = rseq === (0, sequence_1.reverseComplement)(rseq, seqType);
    // Now matches in the reverse complement direction.
    var rcMatcher = (0, search_1.createRegex)((0, sequence_1.reverseComplement)(rseq, seqType), seqType);
    result = rcMatcher.exec(seq);
    while (result && !dupRevComp) {
        // same as above but correcting for the new reverse complement indexes
        var index = result.index;
        cutSites.push({
            direction: -1,
            end: index + rseq.length,
            enzyme: enzyme,
            fcut: index + rseq.length - rcut,
            id: "",
            name: enzyme.name,
            rcut: index + rseq.length - fcut,
            start: index,
        });
        result = rcMatcher.exec(seq);
    }
    // reduce so there's only one enzyme per template cut index
    return (cutSites
        .sort(function (a, b) { return a.fcut - b.fcut; })
        // filter out cut sites that that only start/end at 0-index. I no longer remember what this was for
        .filter(function (c) { return !(c.fcut === 0 && c.rcut === 0); })
        // modulo the start/end and add an id to each cut-site
        .map(function (c) { return (__assign(__assign({}, c), { end: c.end % seqL, fcut: c.fcut % seqL, id: "".concat(enzyme.name, "-").concat(enzyme.rseq, "-").concat(c.fcut, "-").concat(c.direction > 0 ? "fwd" : "rev"), rcut: c.rcut % seqL, start: c.start % seqL })); })
        // if `.range` was provided on the enzyme, limit the search to that range.
        // https://github.com/Lattice-Automation/seqviz/issues/95
        .filter(function (c) { return (c.enzyme.range ? c.start >= c.enzyme.range.start && c.end <= c.enzyme.range.end : true); }));
};
exports.findCutSites = findCutSites;


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * NEB Restriction Enzymes
 *
 * a list of enzyme objects with their name as the key,
 * their recognition site sequence as "rseq", and cut site relative to the
 * start of the recognition site as "fcut", and the start of the resulting overhang
 * from the recognition site as "rcut"
 *
 * eg: PstI with recognition site "CTGCAG" cuts so that the break is at (cutSite = 5):
 *
 * ```
 * 		..C TGCA|G..
 * 		..G|ACGT C..
 *
 * ```
 *
 * and the resulting fragment looks like (rcut = 1):
 *
 * ```
 * 		..CTGCA
 * 		..G****
 * ```
 */
var enzymes = {
    aatii: {
        fcut: 5,
        name: "AatII",
        rcut: 1,
        rseq: "GACGTC",
    },
    abasi: {
        fcut: 14,
        name: "AbaSI",
        rcut: 12,
        rseq: "hmCNNNNNNNNNNN",
    },
    acc65i: {
        fcut: 1,
        name: "Acc65I",
        rcut: 5,
        rseq: "GGTACC",
    },
    acci: {
        fcut: 2,
        name: "AccI",
        rcut: 4,
        rseq: "GTMKAC",
    },
    acii: {
        fcut: 1,
        name: "AciI",
        rcut: 3,
        rseq: "CCGC",
    },
    acli: {
        fcut: 2,
        name: "AclI",
        rcut: 4,
        rseq: "AACGTT",
    },
    acui: {
        fcut: 22,
        name: "AcuI",
        rcut: 20,
        rseq: "CTGAAGNNNNNNNNNNNNNNNN",
    },
    afei: {
        fcut: 3,
        name: "AfeI",
        rcut: 3,
        rseq: "AGCGCT",
    },
    aflii: {
        fcut: 1,
        name: "AflII",
        rcut: 5,
        rseq: "CTTAAG",
    },
    afliii: {
        fcut: 1,
        name: "AflIII",
        rcut: 5,
        rseq: "ACRYGT",
    },
    agei: {
        fcut: 1,
        name: "AgeI",
        rcut: 5,
        rseq: "ACCGGT",
    },
    ahdi: {
        fcut: 6,
        name: "AhdI",
        rcut: 5,
        rseq: "GACNNNNNGTC",
    },
    alei: {
        fcut: 5,
        name: "AleI",
        rcut: 5,
        rseq: "CACNNNNGTG",
    },
    alui: {
        fcut: 2,
        name: "AluI",
        rcut: 2,
        rseq: "AGCT",
    },
    alwi: {
        fcut: 9,
        name: "AlwI",
        rcut: 10,
        rseq: "GGATCNNNNN",
    },
    alwni: {
        fcut: 6,
        name: "AlwNI",
        rcut: 3,
        rseq: "CAGNNNCTG",
    },
    apai: {
        fcut: 5,
        name: "ApaI",
        rcut: 1,
        rseq: "GGGCCC",
    },
    apali: {
        fcut: 1,
        name: "ApaLI",
        rcut: 5,
        rseq: "GTGCAC",
    },
    apeki: {
        fcut: 1,
        name: "ApeKI",
        rcut: 4,
        rseq: "GCWGC",
    },
    apoi: {
        fcut: 1,
        name: "ApoI",
        rcut: 5,
        rseq: "RAATTY",
    },
    asci: {
        fcut: 2,
        name: "AscI",
        rcut: 6,
        rseq: "GGCGCGCC",
    },
    asei: {
        fcut: 2,
        name: "AseI",
        rcut: 4,
        rseq: "ATTAAT",
    },
    asisi: {
        fcut: 5,
        name: "AsiSI",
        rcut: 3,
        rseq: "GCGATCGC",
    },
    avai: {
        fcut: 1,
        name: "AvaI",
        rcut: 5,
        rseq: "CYCGRG",
    },
    avaii: {
        fcut: 1,
        name: "AvaII",
        rcut: 4,
        rseq: "GGWCC",
    },
    avrii: {
        fcut: 1,
        name: "AvrII",
        rcut: 5,
        rseq: "CCTAGG",
    },
    baegi: {
        fcut: 5,
        name: "BaeGI",
        rcut: 1,
        rseq: "GKGCMC",
    },
    baei: {
        fcut: 38,
        name: "BaeI",
        rcut: 33,
        rseq: "NNNNNNNNNNNNNNNACNNNNGTAYCNNNNNNNNNNNN",
    },
    bamhi: {
        fcut: 1,
        name: "BamHI",
        rcut: 5,
        rseq: "GGATCC",
    },
    bani: {
        fcut: 1,
        name: "BanI",
        rcut: 5,
        rseq: "GGYRCC",
    },
    banii: {
        fcut: 5,
        name: "BanII",
        rcut: 1,
        rseq: "GRGCYC",
    },
    bbsi: {
        fcut: 8,
        name: "BbsI",
        rcut: 12,
        rseq: "GAAGACNNNNNN",
    },
    bbvci: {
        fcut: 2,
        name: "BbvCI",
        rcut: 5,
        rseq: "CCTCAGC",
    },
    bbvi: {
        fcut: 13,
        name: "BbvI",
        rcut: 17,
        rseq: "GCAGCNNNNNNNNNNNN",
    },
    bcci: {
        fcut: 9,
        name: "BccI",
        rcut: 10,
        rseq: "CCATCNNNNN",
    },
    bceai: {
        fcut: 17,
        name: "BceAI",
        rcut: 19,
        rseq: "ACGGCNNNNNNNNNNNNNN",
    },
    bcgi: {
        fcut: 36,
        name: "BcgI",
        rcut: 34,
        rseq: "NNNNNNNNNNNNCGANNNNNNTGCNNNNNNNNNNNN",
    },
    bcivi: {
        fcut: 12,
        name: "BciVI",
        rcut: 11,
        rseq: "GTATCCNNNNNN",
    },
    bcli: {
        fcut: 1,
        name: "BclI",
        rcut: 5,
        rseq: "TGATCA",
    },
    bcodi: {
        fcut: 6,
        name: "BcoDI",
        rcut: 10,
        rseq: "GTCTCNNNNN",
    },
    bfai: {
        fcut: 1,
        name: "BfaI",
        rcut: 3,
        rseq: "CTAG",
    },
    bfuai: {
        fcut: 10,
        name: "BfuAI",
        rcut: 14,
        rseq: "ACCTGCNNNNNNNN",
    },
    bgli: {
        fcut: 7,
        name: "BglI",
        rcut: 4,
        rseq: "GCCNNNNNGGC",
    },
    bglii: {
        fcut: 1,
        name: "BglII",
        rcut: 5,
        rseq: "AGATCT",
    },
    blpi: {
        fcut: 2,
        name: "BlpI",
        rcut: 5,
        rseq: "GCTNAGC",
    },
    bmgbi: {
        fcut: 3,
        name: "BmgBI",
        rcut: 3,
        rseq: "CACGTC",
    },
    bmri: {
        fcut: 11,
        name: "BmrI",
        rcut: 10,
        rseq: "ACTGGGNNNNN",
    },
    bmti: {
        fcut: 5,
        name: "BmtI",
        rcut: 1,
        rseq: "GCTAGC",
    },
    bpmi: {
        fcut: 22,
        name: "BpmI",
        rcut: 20,
        rseq: "CTGGAGNNNNNNNNNNNNNNNN",
    },
    bpu10i: {
        fcut: 2,
        name: "Bpu10I",
        rcut: 5,
        rseq: "CCTNAGC",
    },
    bpuei: {
        fcut: 22,
        name: "BpuEI",
        rcut: 20,
        rseq: "CTTGAGNNNNNNNNNNNNNNNN",
    },
    bsaai: {
        fcut: 3,
        name: "BsaAI",
        rcut: 3,
        rseq: "YACGTR",
    },
    bsabi: {
        fcut: 5,
        name: "BsaBI",
        rcut: 5,
        rseq: "GATNNNNATC",
    },
    bsahi: {
        fcut: 2,
        name: "BsaHI",
        rcut: 4,
        rseq: "GRCGYC",
    },
    bsai: {
        fcut: 7,
        name: "BsaI",
        rcut: 11,
        rseq: "GGTCTCNNNNN",
    },
    bsaji: {
        fcut: 1,
        name: "BsaJI",
        rcut: 5,
        rseq: "CCNNGG",
    },
    bsawi: {
        fcut: 1,
        name: "BsaWI",
        rcut: 5,
        rseq: "WCCGGW",
    },
    bsaxi: {
        fcut: 33,
        name: "BsaXI",
        rcut: 30,
        rseq: "NNNNNNNNNNNNACNNNNNCTCCNNNNNNNNNN",
    },
    bseri: {
        fcut: 16,
        name: "BseRI",
        rcut: 14,
        rseq: "GAGGAGNNNNNNNNNN",
    },
    bseyi: {
        fcut: 1,
        name: "BseYI",
        rcut: 5,
        rseq: "CCCAGC",
    },
    bsgi: {
        fcut: 22,
        name: "BsgI",
        rcut: 20,
        rseq: "GTGCAGNNNNNNNNNNNNNNNN",
    },
    bsiei: {
        fcut: 4,
        name: "BsiEI",
        rcut: 2,
        rseq: "CGRYCG",
    },
    bsihkai: {
        fcut: 5,
        name: "BsiHKAI",
        rcut: 1,
        rseq: "GWGCWC",
    },
    bsiwi: {
        fcut: 1,
        name: "BsiWI",
        rcut: 5,
        rseq: "CGTACG",
    },
    bsli: {
        fcut: 7,
        name: "BslI",
        rcut: 4,
        rseq: "CCNNNNNNNGG",
    },
    bsmai: {
        fcut: 6,
        name: "BsmAI",
        rcut: 10,
        rseq: "GTCTCNNNNN",
    },
    bsmbi: {
        fcut: 7,
        name: "BsmBI",
        rcut: 11,
        rseq: "CGTCTCNNNNN",
    },
    bsmfi: {
        fcut: 15,
        name: "BsmFI",
        rcut: 19,
        rseq: "GGGACNNNNNNNNNNNNNN",
    },
    bsmi: {
        fcut: 7,
        name: "BsmI",
        rcut: 5,
        rseq: "GAATGCN",
    },
    bsobi: {
        fcut: 1,
        name: "BsoBI",
        rcut: 5,
        rseq: "CYCGRG",
    },
    bsp1286i: {
        fcut: 5,
        name: "Bsp1286I",
        rcut: 1,
        rseq: "GDGCHC",
    },
    bspcni: {
        fcut: 14,
        name: "BspCNI",
        rcut: 12,
        rseq: "CTCAGNNNNNNNNN",
    },
    bspdi: {
        fcut: 2,
        name: "BspDI",
        rcut: 4,
        rseq: "ATCGAT",
    },
    bspei: {
        fcut: 1,
        name: "BspEI",
        rcut: 5,
        rseq: "TCCGGA",
    },
    bsphi: {
        fcut: 1,
        name: "BspHI",
        rcut: 5,
        rseq: "TCATGA",
    },
    bspmi: {
        fcut: 10,
        name: "BspMI",
        rcut: 14,
        rseq: "ACCTGCNNNNNNNN",
    },
    bspqi: {
        fcut: 8,
        name: "BspQI",
        rcut: 11,
        rseq: "GCTCTTCNNNN",
    },
    bsrbi: {
        fcut: 3,
        name: "BsrBI",
        rcut: 3,
        rseq: "CCGCTC",
    },
    bsrdi: {
        fcut: 8,
        name: "BsrDI",
        rcut: 6,
        rseq: "GCAATGNN",
    },
    bsrfi: {
        fcut: 1,
        name: "BsrFI",
        rcut: 5,
        rseq: "RCCGGY",
    },
    bsrgi: {
        fcut: 1,
        name: "BsrGI",
        rcut: 5,
        rseq: "TGTACA",
    },
    bsri: {
        fcut: 6,
        name: "BsrI",
        rcut: 4,
        rseq: "ACTGGN",
    },
    bsshii: {
        fcut: 1,
        name: "BssHII",
        rcut: 5,
        rseq: "GCGCGC",
    },
    bsssi: {
        fcut: 1,
        name: "BssSI",
        rcut: 5,
        rseq: "CACGAG",
    },
    bstapi: {
        fcut: 7,
        name: "BstAPI",
        rcut: 4,
        rseq: "GCANNNNNTGC",
    },
    bstbi: {
        fcut: 2,
        name: "BstBI",
        rcut: 4,
        rseq: "TTCGAA",
    },
    bsteii: {
        fcut: 1,
        name: "BstEII",
        rcut: 6,
        rseq: "GGTNACC",
    },
    bstni: {
        fcut: 2,
        name: "BstNI",
        rcut: 3,
        rseq: "CCWGG",
    },
    bstui: {
        fcut: 2,
        name: "BstUI",
        rcut: 2,
        rseq: "CGCG",
    },
    bstxi: {
        fcut: 8,
        name: "BstXI",
        rcut: 4,
        rseq: "CCANNNNNNTGG",
    },
    bstyi: {
        fcut: 1,
        name: "BstYI",
        rcut: 5,
        rseq: "RGATCY",
    },
    bstz17i: {
        fcut: 3,
        name: "BstZ17I",
        rcut: 3,
        rseq: "GTATAC",
    },
    bsu36i: {
        fcut: 2,
        name: "Bsu36I",
        rcut: 5,
        rseq: "CCTNAGG",
    },
    btgi: {
        fcut: 1,
        name: "BtgI",
        rcut: 5,
        rseq: "CCRYGG",
    },
    btgzi: {
        fcut: 16,
        name: "BtgZI",
        rcut: 20,
        rseq: "GCGATGNNNNNNNNNNNNNN",
    },
    btsci: {
        fcut: 7,
        name: "BtsCI",
        rcut: 5,
        rseq: "GGATGNN",
    },
    btsi: {
        fcut: 8,
        name: "BtsI",
        rcut: 6,
        rseq: "GCAGTGNN",
    },
    btsimuti: {
        fcut: 7,
        name: "BtsIMutI",
        rcut: 5,
        rseq: "CAGTGNN",
    },
    cac8i: {
        fcut: 3,
        name: "Cac8I",
        rcut: 3,
        rseq: "GCNNGC",
    },
    clai: {
        fcut: 2,
        name: "ClaI",
        rcut: 4,
        rseq: "ATCGAT",
    },
    cspci: {
        fcut: 37,
        name: "CspCI",
        rcut: 35,
        rseq: "NNNNNNNNNNNNNCAANNNNNGTGGNNNNNNNNNNNN",
    },
    cviaii: {
        fcut: 1,
        name: "CviAII",
        rcut: 3,
        rseq: "CATG",
    },
    "cviki-1": {
        fcut: 2,
        name: "CviKI-1",
        rcut: 2,
        rseq: "RGCY",
    },
    cviqi: {
        fcut: 1,
        name: "CviQI",
        rcut: 3,
        rseq: "GTAC",
    },
    ddei: {
        fcut: 1,
        name: "DdeI",
        rcut: 4,
        rseq: "CTNAG",
    },
    dpni: {
        fcut: 3,
        name: "DpnI",
        rcut: 3,
        rseq: "GmATC",
    },
    dpnii: {
        fcut: 0,
        name: "DpnII",
        rcut: 4,
        rseq: "GATC",
    },
    drai: {
        fcut: 3,
        name: "DraI",
        rcut: 3,
        rseq: "TTTAAA",
    },
    draiii: {
        fcut: 6,
        name: "DraIII",
        rcut: 3,
        rseq: "CACNNNGTG",
    },
    drdi: {
        fcut: 7,
        name: "DrdI",
        rcut: 5,
        rseq: "GACNNNNNNGTC",
    },
    eaei: {
        fcut: 1,
        name: "EaeI",
        rcut: 5,
        rseq: "YGGCCR",
    },
    eagi: {
        fcut: 1,
        name: "EagI",
        rcut: 5,
        rseq: "CGGCCG",
    },
    eari: {
        fcut: 7,
        name: "EarI",
        rcut: 10,
        rseq: "CTCTTCNNNN",
    },
    ecii: {
        fcut: 17,
        name: "EciI",
        rcut: 15,
        rseq: "GGCGGANNNNNNNNNNN",
    },
    eco53ki: {
        fcut: 3,
        name: "Eco53kI",
        rcut: 3,
        rseq: "GAGCTC",
    },
    econi: {
        fcut: 5,
        name: "EcoNI",
        rcut: 6,
        rseq: "CCTNNNNNAGG",
    },
    ecoo109i: {
        fcut: 2,
        name: "EcoO109I",
        rcut: 5,
        rseq: "RGGNCCY",
    },
    ecori: {
        fcut: 1,
        name: "EcoRI",
        rcut: 5,
        rseq: "GAATTC",
    },
    ecorv: {
        fcut: 3,
        name: "EcoRV",
        rcut: 3,
        rseq: "GATATC",
    },
    esp3i: {
        fcut: 7,
        name: "Esp3I",
        rcut: 11,
        rseq: "CGTCTCNNNNN",
    },
    fati: {
        fcut: 0,
        name: "FatI",
        rcut: 4,
        rseq: "CATG",
    },
    faui: {
        fcut: 9,
        name: "FauI",
        rcut: 11,
        rseq: "CCCGCNNNNNN",
    },
    fnu4hi: {
        fcut: 2,
        name: "Fnu4HI",
        rcut: 3,
        rseq: "GCNGC",
    },
    foki: {
        fcut: 14,
        name: "FokI",
        rcut: 18,
        rseq: "GGATGNNNNNNNNNNNNN",
    },
    fsei: {
        fcut: 6,
        name: "FseI",
        rcut: 2,
        rseq: "GGCCGGCC",
    },
    fspei: {
        fcut: 15,
        name: "FspEI",
        rcut: 19,
        rseq: "CmCNNNNNNNNNNNNNNNN",
    },
    fspi: {
        fcut: 3,
        name: "FspI",
        rcut: 3,
        rseq: "TGCGCA",
    },
    haeii: {
        fcut: 5,
        name: "HaeII",
        rcut: 1,
        rseq: "RGCGCY",
    },
    haeiii: {
        fcut: 2,
        name: "HaeIII",
        rcut: 2,
        rseq: "GGCC",
    },
    hgai: {
        fcut: 10,
        name: "HgaI",
        rcut: 15,
        rseq: "GACGCNNNNNNNNNN",
    },
    hhai: {
        fcut: 3,
        name: "HhaI",
        rcut: 1,
        rseq: "GCGC",
    },
    hincii: {
        fcut: 3,
        name: "HincII",
        rcut: 3,
        rseq: "GTYRAC",
    },
    hindiii: {
        fcut: 1,
        name: "HindIII",
        rcut: 5,
        rseq: "AAGCTT",
    },
    hinfi: {
        fcut: 1,
        name: "HinfI",
        rcut: 4,
        rseq: "GANTC",
    },
    hinp1i: {
        fcut: 1,
        name: "HinP1I",
        rcut: 3,
        rseq: "GCGC",
    },
    hpai: {
        fcut: 3,
        name: "HpaI",
        rcut: 3,
        rseq: "GTTAAC",
    },
    hpaii: {
        fcut: 1,
        name: "HpaII",
        rcut: 3,
        rseq: "CCGG",
    },
    hphi: {
        fcut: 13,
        name: "HphI",
        rcut: 12,
        rseq: "GGTGANNNNNNNN",
    },
    hpy166ii: {
        fcut: 3,
        name: "Hpy166II",
        rcut: 3,
        rseq: "GTNNAC",
    },
    hpy188i: {
        fcut: 3,
        name: "Hpy188I",
        rcut: 2,
        rseq: "TCNGA",
    },
    hpy188iii: {
        fcut: 2,
        name: "Hpy188III",
        rcut: 4,
        rseq: "TCNNGA",
    },
    hpy99i: {
        fcut: 5,
        name: "Hpy99I",
        rcut: 0,
        rseq: "CGWCG",
    },
    hpyav: {
        fcut: 11,
        name: "HpyAV",
        rcut: 10,
        rseq: "CCTTCNNNNNN",
    },
    hpych4iii: {
        fcut: 3,
        name: "HpyCH4III",
        rcut: 2,
        rseq: "ACNGT",
    },
    hpych4iv: {
        fcut: 1,
        name: "HpyCH4IV",
        rcut: 3,
        rseq: "ACGT",
    },
    hpych4v: {
        fcut: 2,
        name: "HpyCH4V",
        rcut: 2,
        rseq: "TGCA",
    },
    "i-ceui": {
        fcut: 18,
        name: "I-CeuI",
        rcut: 14,
        rseq: "TAACTATAACGGTCCTAAGGTAGCGAA",
    },
    "i-scei": {
        fcut: 9,
        name: "I-SceI",
        rcut: 5,
        rseq: "TAGGGATAACAGGGTAAT",
    },
    kasi: {
        fcut: 1,
        name: "KasI",
        rcut: 5,
        rseq: "GGCGCC",
    },
    kpni: {
        fcut: 5,
        name: "KpnI",
        rcut: 1,
        rseq: "GGTACC",
    },
    lpnpi: {
        fcut: 15,
        name: "LpnPI",
        rcut: 19,
        rseq: "CmCDGNNNNNNNNNNNNNN",
    },
    mboi: {
        fcut: 0,
        name: "MboI",
        rcut: 4,
        rseq: "GATC",
    },
    mboii: {
        fcut: 13,
        name: "MboII",
        rcut: 12,
        rseq: "GAAGANNNNNNNN",
    },
    mfei: {
        fcut: 1,
        name: "MfeI",
        rcut: 5,
        rseq: "CAATTG",
    },
    mluci: {
        fcut: 0,
        name: "MluCI",
        rcut: 4,
        rseq: "AATT",
    },
    mlui: {
        fcut: 1,
        name: "MluI",
        rcut: 5,
        rseq: "ACGCGT",
    },
    mlyi: {
        fcut: 10,
        name: "MlyI",
        rcut: 10,
        rseq: "GAGTCNNNNN",
    },
    mmei: {
        fcut: 26,
        name: "MmeI",
        rcut: 24,
        rseq: "TCCRACNNNNNNNNNNNNNNNNNNNN",
    },
    mnli: {
        fcut: 11,
        name: "MnlI",
        rcut: 10,
        rseq: "CCTCNNNNNNN",
    },
    msci: {
        fcut: 3,
        name: "MscI",
        rcut: 3,
        rseq: "TGGCCA",
    },
    msei: {
        fcut: 1,
        name: "MseI",
        rcut: 3,
        rseq: "TTAA",
    },
    msli: {
        fcut: 5,
        name: "MslI",
        rcut: 5,
        rseq: "CAYNNNNRTG",
    },
    mspa1i: {
        fcut: 3,
        name: "MspA1I",
        rcut: 3,
        rseq: "CMGCKG",
    },
    mspi: {
        fcut: 1,
        name: "MspI",
        rcut: 3,
        rseq: "CCGG",
    },
    mspji: {
        fcut: 14,
        name: "MspJI",
        rcut: 18,
        rseq: "mCNNRNNNNNNNNNNNNN",
    },
    mwoi: {
        fcut: 7,
        name: "MwoI",
        rcut: 4,
        rseq: "GCNNNNNNNGC",
    },
    naei: {
        fcut: 3,
        name: "NaeI",
        rcut: 3,
        rseq: "GCCGGC",
    },
    nari: {
        fcut: 2,
        name: "NarI",
        rcut: 4,
        rseq: "GGCGCC",
    },
    ncii: {
        fcut: 2,
        name: "NciI",
        rcut: 3,
        rseq: "CCSGG",
    },
    ncoi: {
        fcut: 1,
        name: "NcoI",
        rcut: 5,
        rseq: "CCATGG",
    },
    ndei: {
        fcut: 2,
        name: "NdeI",
        rcut: 4,
        rseq: "CATATG",
    },
    ngomiv: {
        fcut: 1,
        name: "NgoMIV",
        rcut: 5,
        rseq: "GCCGGC",
    },
    nhei: {
        fcut: 1,
        name: "NheI",
        rcut: 5,
        rseq: "GCTAGC",
    },
    nlaiii: {
        fcut: 4,
        name: "NlaIII",
        rcut: 0,
        rseq: "CATG",
    },
    nlaiv: {
        fcut: 3,
        name: "NlaIV",
        rcut: 3,
        rseq: "GGNNCC",
    },
    nmeaiii: {
        fcut: 26,
        name: "NmeAIII",
        rcut: 25,
        rseq: "GCCGAGNNNNNNNNNNNNNNNNNNNN",
    },
    noti: {
        fcut: 2,
        name: "NotI",
        rcut: 6,
        rseq: "GCGGCCGC",
    },
    nrui: {
        fcut: 3,
        name: "NruI",
        rcut: 3,
        rseq: "TCGCGA",
    },
    nsii: {
        fcut: 5,
        name: "NsiI",
        rcut: 1,
        rseq: "ATGCAT",
    },
    nspi: {
        fcut: 5,
        name: "NspI",
        rcut: 1,
        rseq: "RCATGY",
    },
    paci: {
        fcut: 5,
        name: "PacI",
        rcut: 3,
        rseq: "TTAATTAA",
    },
    paer7i: {
        fcut: 1,
        name: "PaeR7I",
        rcut: 5,
        rseq: "CTCGAG",
    },
    pcii: {
        fcut: 1,
        name: "PciI",
        rcut: 5,
        rseq: "ACATGT",
    },
    pflfi: {
        fcut: 4,
        name: "PflFI",
        rcut: 5,
        rseq: "GACNNNGTC",
    },
    pflmi: {
        fcut: 7,
        name: "PflMI",
        rcut: 4,
        rseq: "CCANNNNNTGG",
    },
    "pi-pspi": {
        fcut: 17,
        name: "PI-PspI",
        rcut: 13,
        rseq: "TGGCAAACAGCTATTATGGGTATTATGGGT",
    },
    "pi-scei": {
        fcut: 15,
        name: "PI-SceI",
        rcut: 11,
        rseq: "ATCTATGTCGGGTGCGGAGAAAGAGGTAATGAAATGG",
    },
    plei: {
        fcut: 9,
        name: "PleI",
        rcut: 10,
        rseq: "GAGTCNNNNN",
    },
    pluti: {
        fcut: 5,
        name: "PluTI",
        rcut: 1,
        rseq: "GGCGCC",
    },
    pmei: {
        fcut: 4,
        name: "PmeI",
        rcut: 4,
        rseq: "GTTTAAAC",
    },
    pmli: {
        fcut: 3,
        name: "PmlI",
        rcut: 3,
        rseq: "CACGTG",
    },
    ppumi: {
        fcut: 2,
        name: "PpuMI",
        rcut: 5,
        rseq: "RGGWCCY",
    },
    pshai: {
        fcut: 5,
        name: "PshAI",
        rcut: 5,
        rseq: "GACNNNNGTC",
    },
    psii: {
        fcut: 3,
        name: "PsiI",
        rcut: 3,
        rseq: "TTATAA",
    },
    pspgi: {
        fcut: 0,
        name: "PspGI",
        rcut: 5,
        rseq: "CCWGG",
    },
    pspomi: {
        fcut: 1,
        name: "PspOMI",
        rcut: 5,
        rseq: "GGGCCC",
    },
    pspxi: {
        fcut: 2,
        name: "PspXI",
        rcut: 6,
        rseq: "VCTCGAGB",
    },
    psti: {
        fcut: 5,
        name: "PstI",
        rcut: 1,
        rseq: "CTGCAG",
    },
    pvui: {
        fcut: 4,
        name: "PvuI",
        rcut: 2,
        rseq: "CGATCG",
    },
    pvuii: {
        fcut: 3,
        name: "PvuII",
        rcut: 3,
        rseq: "CAGCTG",
    },
    rsai: {
        fcut: 2,
        name: "RsaI",
        rcut: 2,
        rseq: "GTAC",
    },
    rsrii: {
        fcut: 2,
        name: "RsrII",
        rcut: 5,
        rseq: "CGGWCCG",
    },
    saci: {
        fcut: 5,
        name: "SacI",
        rcut: 1,
        rseq: "GAGCTC",
    },
    sacii: {
        fcut: 4,
        name: "SacII",
        rcut: 2,
        rseq: "CCGCGG",
    },
    sali: {
        fcut: 1,
        name: "SalI",
        rcut: 5,
        rseq: "GTCGAC",
    },
    sapi: {
        fcut: 8,
        name: "SapI",
        rcut: 11,
        rseq: "GCTCTTCNNNN",
    },
    sau3ai: {
        fcut: 0,
        name: "Sau3AI",
        rcut: 4,
        rseq: "GATC",
    },
    sau96i: {
        fcut: 1,
        name: "Sau96I",
        rcut: 4,
        rseq: "GGNCC",
    },
    sbfi: {
        fcut: 6,
        name: "SbfI",
        rcut: 2,
        rseq: "CCTGCAGG",
    },
    scai: {
        fcut: 3,
        name: "ScaI",
        rcut: 3,
        rseq: "AGTACT",
    },
    scrfi: {
        fcut: 2,
        name: "ScrFI",
        rcut: 3,
        rseq: "CCNGG",
    },
    sexai: {
        fcut: 1,
        name: "SexAI",
        rcut: 6,
        rseq: "ACCWGGT",
    },
    sfani: {
        fcut: 10,
        name: "SfaNI",
        rcut: 14,
        rseq: "GCATCNNNNNNNNN",
    },
    sfci: {
        fcut: 1,
        name: "SfcI",
        rcut: 5,
        rseq: "CTRYAG",
    },
    sfii: {
        fcut: 8,
        name: "SfiI",
        rcut: 5,
        rseq: "GGCCNNNNNGGCC",
    },
    sfoi: {
        fcut: 3,
        name: "SfoI",
        rcut: 3,
        rseq: "GGCGCC",
    },
    sgrai: {
        fcut: 2,
        name: "SgrAI",
        rcut: 6,
        rseq: "CRCCGGYG",
    },
    smai: {
        fcut: 3,
        name: "SmaI",
        rcut: 3,
        rseq: "CCCGGG",
    },
    smli: {
        fcut: 1,
        name: "SmlI",
        rcut: 5,
        rseq: "CTYRAG",
    },
    snabi: {
        fcut: 3,
        name: "SnaBI",
        rcut: 3,
        rseq: "TACGTA",
    },
    spei: {
        fcut: 1,
        name: "SpeI",
        rcut: 5,
        rseq: "ACTAGT",
    },
    sphi: {
        fcut: 5,
        name: "SphI",
        rcut: 1,
        rseq: "GCATGC",
    },
    srfi: {
        fcut: 4,
        name: "SrfI",
        rcut: 4,
        rseq: "GCCCGGGC",
    },
    sspi: {
        fcut: 3,
        name: "SspI",
        rcut: 3,
        rseq: "AATATT",
    },
    stui: {
        fcut: 3,
        name: "StuI",
        rcut: 3,
        rseq: "AGGCCT",
    },
    styd4i: {
        fcut: 0,
        name: "StyD4I",
        rcut: 5,
        rseq: "CCNGG",
    },
    styi: {
        fcut: 1,
        name: "StyI",
        rcut: 5,
        rseq: "CCWWGG",
    },
    swai: {
        fcut: 4,
        name: "SwaI",
        rcut: 4,
        rseq: "ATTTAAAT",
    },
    taqi: {
        fcut: 1,
        name: "TaqI",
        rcut: 3,
        rseq: "TCGA",
    },
    tfii: {
        fcut: 1,
        name: "TfiI",
        rcut: 4,
        rseq: "GAWTC",
    },
    tsei: {
        fcut: 1,
        name: "TseI",
        rcut: 4,
        rseq: "GCWGC",
    },
    tsp45i: {
        fcut: 0,
        name: "Tsp45I",
        rcut: 5,
        rseq: "GTSAC",
    },
    tspmi: {
        fcut: 1,
        name: "TspMI",
        rcut: 5,
        rseq: "CCCGGG",
    },
    tspri: {
        fcut: 9,
        name: "TspRI",
        rcut: 0,
        rseq: "NNCASTGNN",
    },
    tth111i: {
        fcut: 4,
        name: "Tth111I",
        rcut: 5,
        rseq: "GACNNNGTC",
    },
    xbai: {
        fcut: 1,
        name: "XbaI",
        rcut: 5,
        rseq: "TCTAGA",
    },
    xcmi: {
        fcut: 8,
        name: "XcmI",
        rcut: 7,
        rseq: "CCANNNNNNNNNTGG",
    },
    xhoi: {
        fcut: 1,
        name: "XhoI",
        rcut: 5,
        rseq: "CTCGAG",
    },
    xmai: {
        fcut: 1,
        name: "XmaI",
        rcut: 5,
        rseq: "CCCGGG",
    },
    xmni: {
        fcut: 5,
        name: "XmnI",
        rcut: 5,
        rseq: "GAANNNNTTC",
    },
    zrai: {
        fcut: 3,
        name: "ZraI",
        rcut: 3,
        rseq: "GACGTC",
    },
};
exports["default"] = enzymes;


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createRegex = void 0;
var sequence_1 = __webpack_require__(24);
/**
 * Search the seq in the forward and reverse complement strands.
 * Return all matched regions. Accounts for abiguous BP encodings and allows for mismatches
 */
exports["default"] = (function (query, mismatch, seq, seqType) {
    if (mismatch === void 0) { mismatch = 0; }
    if (seq === void 0) { seq = ""; }
    if (!query || !query.length || !seq || !seq.length) {
        return [];
    }
    // Only start searching after query is at least 2 letters, lowest meaningful length
    if (query.length - mismatch < 2) {
        return [];
    }
    var indices = search(query, seq, mismatch, true, seqType);
    if (["dna", "rna"].includes(seqType)) {
        var compSeq = (0, sequence_1.complement)(seq, seqType).compSeq;
        var compIndices = search((0, sequence_1.reverse)(query), compSeq, mismatch, false, seqType);
        indices.push.apply(indices, compIndices);
    }
    if (indices.length > 4000) {
        // Fail out with warning. Rendering would be too expensive.
        console.error("Search too broad: >4000 matches. Please narrow parameters.");
        return [];
    }
    return indices.sort(function (a, b) { return a.start - b.start; });
});
/**
 * If there's no mismatch, just use a RegExp to search over the sequence repeatedly
 * Otherwise, use the modified hamming search in `searchWithMismatch()`
 */
var search = function (query, subject, mismatch, fwd, seqType) {
    if (mismatch > 0) {
        return searchWithMismatch(query, subject, mismatch, fwd, seqType);
    }
    var seqLength = subject.length;
    var regex = (0, exports.createRegex)(query, seqType);
    var match = regex.exec(subject);
    var results = [];
    while (match) {
        var start = match.index % seqLength;
        var end = (start + query.length) % seqLength || seqLength;
        results.push({
            direction: fwd ? 1 : -1,
            end: end,
            id: "".concat(start, "-").concat(fwd ? "fwd" : "rev"),
            name: "",
            start: start,
        });
        match = regex.exec(subject);
    }
    return results;
};
/**
 * A slightly modified Hamming Distance algorithm for approximate string Matching for patterns
 */
var searchWithMismatch = function (query, subject, mismatch, fwd, seqType) {
    var alphabet = (0, sequence_1.getAlphabet)(seqType);
    var results = [];
    for (var i = 0; i < subject.length - query.length; i += 1) {
        var missed = 0;
        for (var j = 0; j < query.length; j += 1) {
            var targetChar = subject[i + j].toLowerCase();
            var queryChar = query[j].toLowerCase();
            if (sequence_1.nucleotides[queryChar]) {
                if (targetChar !== queryChar) {
                    missed += 1;
                }
            }
            else if (alphabet[queryChar]) {
                if (!alphabet[queryChar][targetChar]) {
                    missed += 1;
                }
            }
            if (missed > mismatch) {
                break;
            }
        }
        if (missed <= mismatch) {
            var end = (i + query.length) % subject.length || subject.length;
            results.push({
                direction: fwd ? 1 : -1,
                end: end,
                id: "".concat(i, "-").concat(fwd ? "fwd" : "rev"),
                name: "",
                start: i,
            });
        }
    }
    return results;
};
/**
 * Translate common symbols to their wildcards to build up a regex. The regex is case insensitive.
 *
 * Eg "N" matches [ATGCU]. So a query of "ANN" maps to "A(A|T|G|C|U)(A|T|G|C|U)"
 */
var createRegex = function (query, seqType) {
    var alphabet = (0, sequence_1.getAlphabet)(seqType);
    var pattern = query
        .toLowerCase()
        .split("")
        .map(function (symbol) { return (alphabet[symbol] ? "(".concat(Object.keys(alphabet[symbol]).join("|"), ")") : symbol); })
        .join("");
    return new RegExp(pattern.trim(), "gi");
};
exports.createRegex = createRegex;


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(45);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(46);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(47);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(48);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(49);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(50);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_SeqViz_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(51);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_SeqViz_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_SeqViz_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_SeqViz_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_SeqViz_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 45 */
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 46 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),
/* 47 */
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),
/* 48 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 49 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),
/* 50 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),
/* 51 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(53);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Roboto+Mono:300,400,500&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* Shared/common settings */\n.la-vz-seqviz {\n  height: 100%;\n  width: 100%;\n}\n\n.la-vz-seqviz svg {\n  overflow: visible !important;\n}\n\n.la-vz-seqviz svg text {\n  fill: rgb(42, 42, 42);\n  font-family: Roboto Mono, Monaco, monospace;\n  user-select: none;\n\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.la-vz-seqviz svg text:selection {\n  background: none;\n}\n\n.la-vz-viewer-container {\n  height: 100%;\n  position: relative;\n  width: 100%;\n}\n\n.la-vz-viewer-event-router {\n  display: flex;\n  flex-direction: row;\n  height: 100%;\n  outline: none;\n  position: absolute;\n  width: 100%;\n}\n\n.la-vz-search {\n  fill: rgba(255, 251, 7, 0.5);\n}\n\n.la-vz-highlight {\n  fill: rgba(255, 251, 7, 0.25);\n}\n\n.la-vz-selection {\n  fill: rgb(222, 246, 255);\n}\n\n.la-vz-selection-edge {\n  fill: black;\n  stroke: black;\n  shape-rendering: geometricPrecision;\n}\n\n.la-vz-cut-site {\n  fill: transparent;\n  shape-rendering: auto;\n  stroke-width: 1;\n  stroke: rgb(115, 119, 125);\n}\n\n.la-vz-cut-site-highlight {\n  cursor: pointer;\n  fill: rgb(255, 251, 7);\n  fill-opacity: 0;\n  shape-rendering: auto;\n  stroke-width: 1;\n  stroke: rgb(115, 119, 125);\n}\n\n.la-vz-cut-site-text {\n  cursor: pointer;\n  font-size: 12px;\n}\n\n.la-vz-index-line {\n  fill: transparent;\n  shape-rendering: geometricPrecision;\n  stroke-width: 1;\n  stroke: rgb(115, 119, 125);\n}\n\n.la-vz-index-tick {\n  fill: transparent;\n  shape-rendering: geometricPrecision;\n  stroke-width: 1;\n  stroke: rgb(115, 119, 125);\n}\n\n.la-vz-index-tick-label {\n  fill: rgb(115, 119, 125);\n  font-weight: 300;\n  text-rendering: optimizeLegibility;\n}\n\n.la-vz-annotation {\n  fill-opacity: 0.7;\n  shape-rendering: geometricPrecision;\n  stroke-width: 0.5;\n}\n\n.la-vz-annotation-label {\n  color: rgb(42, 42, 42);\n  font-weight: 400;\n  shape-rendering: geometricPrecision;\n  stroke-linejoin: round;\n  text-rendering: optimizeLegibility;\n}\n\n.la-vz-translation-amino-acid-label {\n  color: rgb(42, 42, 42);\n  font-size: 12px;\n  font-weight: 400;\n}\n\n/* Circular Viewer */\n.la-vz-viewer-circular {\n  cursor: text;\n  font-size: 12px;\n  font-weight: 300;\n  margin: auto;\n}\n\n.la-vz-circular-label {\n  cursor: pointer;\n}\n\n.la-vz-circular-label:hover {\n  text-decoration: underline;\n}\n\n.la-vz-label-line {\n  fill: none;\n  stroke-width: 1;\n  stroke: rgb(158, 170, 184);\n}\n\n/* Linear Viewer */\n.la-vz-linear-scroller {\n  cursor: text;\n  font-weight: 300;\n  height: 100%;\n  outline: none !important;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  padding: 10px;\n  position: relative;\n}\n\n.la-vz-seqblock-container {\n  width: 100%;\n}\n\n.la-vz-seqblock {\n  width: 100%;\n  padding: 0;\n  /* this is for when very zoomed out and the bp index disappears beneath the next block */\n  overflow: visible;\n}\n\n.la-vz-scroll::-webkit-scrollbar {\n  width: 7px;\n}\n\n.la-vz-scroll::-webkit-scrollbar-thumb {\n  background-clip: padding-box;\n  background-color: rgb(166, 166, 166);\n  border-radius: 7px;\n}\n\n.la-vz-scroll::-webkit-scrollbar-track {\n  border-radius: 20px;\n}\n\n.la-vz-scroll::-webkit-scrollbar-track-piece {\n  background-clip: padding-box;\n  background-color: rgb(236, 236, 236);\n  border-radius: 7px;\n}\n\n/** Floating Menu */\n .la-fm-container {\n  position: fixed;\n  border: 1px solid lightgrey;\n  display: flex;\n  flex-direction: column;\n  padding: 10px 0;\n  z-index: 999;\n  background: rgb(255, 254, 254); \n  -webkit-box-shadow: 5px 5px 15px 5px #e4e3e3; \n  box-shadow: 5px 5px 15px 5px #e4e3e3;\n}\n.la-fm-container > button{\n   padding: 0px 20px;\n  border: none;\n  color: rgb(61, 61, 61);\n  padding: 5px 20px 5px 20px;\n  background: rgb(255, 254, 254);\n  text-align: left;\n  cursor: pointer;\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n}\n .la-fm-container > button:hover{\n  border: none;\n  background: rgb(235, 233, 233); \n}\n\n.warning-banner {\n  margin: 20px auto;\n  padding: 10px 20px;\n  width: fit-content;\n  background-color: rgba(255, 229, 82, 0.363);\n  border: 1px solid rgb(230, 215, 83);\n  border-radius: 5px;\n  font-family: monospace;\n}  ", "",{"version":3,"sources":["webpack://./src/SeqViz.css"],"names":[],"mappings":"AAEA,2BAA2B;AAC3B;EACE,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,qBAAqB;EACrB,2CAA2C;EAC3C,iBAAiB;;EAEjB,yBAAyB;EACzB,sBAAsB;EACtB,qBAAqB;EACrB,iBAAiB;AACnB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,YAAY;EACZ,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,WAAW;EACX,aAAa;EACb,mCAAmC;AACrC;;AAEA;EACE,iBAAiB;EACjB,qBAAqB;EACrB,eAAe;EACf,0BAA0B;AAC5B;;AAEA;EACE,eAAe;EACf,sBAAsB;EACtB,eAAe;EACf,qBAAqB;EACrB,eAAe;EACf,0BAA0B;AAC5B;;AAEA;EACE,eAAe;EACf,eAAe;AACjB;;AAEA;EACE,iBAAiB;EACjB,mCAAmC;EACnC,eAAe;EACf,0BAA0B;AAC5B;;AAEA;EACE,iBAAiB;EACjB,mCAAmC;EACnC,eAAe;EACf,0BAA0B;AAC5B;;AAEA;EACE,wBAAwB;EACxB,gBAAgB;EAChB,kCAAkC;AACpC;;AAEA;EACE,iBAAiB;EACjB,mCAAmC;EACnC,iBAAiB;AACnB;;AAEA;EACE,sBAAsB;EACtB,gBAAgB;EAChB,mCAAmC;EACnC,sBAAsB;EACtB,kCAAkC;AACpC;;AAEA;EACE,sBAAsB;EACtB,eAAe;EACf,gBAAgB;AAClB;;AAEA,oBAAoB;AACpB;EACE,YAAY;EACZ,eAAe;EACf,gBAAgB;EAChB,YAAY;AACd;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,0BAA0B;AAC5B;;AAEA;EACE,UAAU;EACV,eAAe;EACf,0BAA0B;AAC5B;;AAEA,kBAAkB;AAClB;EACE,YAAY;EACZ,gBAAgB;EAChB,YAAY;EACZ,wBAAwB;EACxB,kBAAkB;EAClB,kBAAkB;EAClB,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;EACX,UAAU;EACV,wFAAwF;EACxF,iBAAiB;AACnB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,4BAA4B;EAC5B,oCAAoC;EACpC,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,4BAA4B;EAC5B,oCAAoC;EACpC,kBAAkB;AACpB;;AAEA,mBAAmB;CAClB;EACC,eAAe;EACf,2BAA2B;EAC3B,aAAa;EACb,sBAAsB;EACtB,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,4CAA4C;EAC5C,oCAAoC;AACtC;AACA;GACG,iBAAiB;EAClB,YAAY;EACZ,sBAAsB;EACtB,0BAA0B;EAC1B,8BAA8B;EAC9B,gBAAgB;EAChB,eAAe;EACf,mJAAmJ;AACrJ;CACC;EACC,YAAY;EACZ,8BAA8B;AAChC;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;EAClB,kBAAkB;EAClB,2CAA2C;EAC3C,mCAAmC;EACnC,kBAAkB;EAClB,sBAAsB;AACxB","sourcesContent":["@import url(\"https://fonts.googleapis.com/css?family=Roboto+Mono:300,400,500&display=swap\");\n\n/* Shared/common settings */\n.la-vz-seqviz {\n  height: 100%;\n  width: 100%;\n}\n\n.la-vz-seqviz svg {\n  overflow: visible !important;\n}\n\n.la-vz-seqviz svg text {\n  fill: rgb(42, 42, 42);\n  font-family: Roboto Mono, Monaco, monospace;\n  user-select: none;\n\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.la-vz-seqviz svg text:selection {\n  background: none;\n}\n\n.la-vz-viewer-container {\n  height: 100%;\n  position: relative;\n  width: 100%;\n}\n\n.la-vz-viewer-event-router {\n  display: flex;\n  flex-direction: row;\n  height: 100%;\n  outline: none;\n  position: absolute;\n  width: 100%;\n}\n\n.la-vz-search {\n  fill: rgba(255, 251, 7, 0.5);\n}\n\n.la-vz-highlight {\n  fill: rgba(255, 251, 7, 0.25);\n}\n\n.la-vz-selection {\n  fill: rgb(222, 246, 255);\n}\n\n.la-vz-selection-edge {\n  fill: black;\n  stroke: black;\n  shape-rendering: geometricPrecision;\n}\n\n.la-vz-cut-site {\n  fill: transparent;\n  shape-rendering: auto;\n  stroke-width: 1;\n  stroke: rgb(115, 119, 125);\n}\n\n.la-vz-cut-site-highlight {\n  cursor: pointer;\n  fill: rgb(255, 251, 7);\n  fill-opacity: 0;\n  shape-rendering: auto;\n  stroke-width: 1;\n  stroke: rgb(115, 119, 125);\n}\n\n.la-vz-cut-site-text {\n  cursor: pointer;\n  font-size: 12px;\n}\n\n.la-vz-index-line {\n  fill: transparent;\n  shape-rendering: geometricPrecision;\n  stroke-width: 1;\n  stroke: rgb(115, 119, 125);\n}\n\n.la-vz-index-tick {\n  fill: transparent;\n  shape-rendering: geometricPrecision;\n  stroke-width: 1;\n  stroke: rgb(115, 119, 125);\n}\n\n.la-vz-index-tick-label {\n  fill: rgb(115, 119, 125);\n  font-weight: 300;\n  text-rendering: optimizeLegibility;\n}\n\n.la-vz-annotation {\n  fill-opacity: 0.7;\n  shape-rendering: geometricPrecision;\n  stroke-width: 0.5;\n}\n\n.la-vz-annotation-label {\n  color: rgb(42, 42, 42);\n  font-weight: 400;\n  shape-rendering: geometricPrecision;\n  stroke-linejoin: round;\n  text-rendering: optimizeLegibility;\n}\n\n.la-vz-translation-amino-acid-label {\n  color: rgb(42, 42, 42);\n  font-size: 12px;\n  font-weight: 400;\n}\n\n/* Circular Viewer */\n.la-vz-viewer-circular {\n  cursor: text;\n  font-size: 12px;\n  font-weight: 300;\n  margin: auto;\n}\n\n.la-vz-circular-label {\n  cursor: pointer;\n}\n\n.la-vz-circular-label:hover {\n  text-decoration: underline;\n}\n\n.la-vz-label-line {\n  fill: none;\n  stroke-width: 1;\n  stroke: rgb(158, 170, 184);\n}\n\n/* Linear Viewer */\n.la-vz-linear-scroller {\n  cursor: text;\n  font-weight: 300;\n  height: 100%;\n  outline: none !important;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  padding: 10px;\n  position: relative;\n}\n\n.la-vz-seqblock-container {\n  width: 100%;\n}\n\n.la-vz-seqblock {\n  width: 100%;\n  padding: 0;\n  /* this is for when very zoomed out and the bp index disappears beneath the next block */\n  overflow: visible;\n}\n\n.la-vz-scroll::-webkit-scrollbar {\n  width: 7px;\n}\n\n.la-vz-scroll::-webkit-scrollbar-thumb {\n  background-clip: padding-box;\n  background-color: rgb(166, 166, 166);\n  border-radius: 7px;\n}\n\n.la-vz-scroll::-webkit-scrollbar-track {\n  border-radius: 20px;\n}\n\n.la-vz-scroll::-webkit-scrollbar-track-piece {\n  background-clip: padding-box;\n  background-color: rgb(236, 236, 236);\n  border-radius: 7px;\n}\n\n/** Floating Menu */\n .la-fm-container {\n  position: fixed;\n  border: 1px solid lightgrey;\n  display: flex;\n  flex-direction: column;\n  padding: 10px 0;\n  z-index: 999;\n  background: rgb(255, 254, 254); \n  -webkit-box-shadow: 5px 5px 15px 5px #e4e3e3; \n  box-shadow: 5px 5px 15px 5px #e4e3e3;\n}\n.la-fm-container > button{\n   padding: 0px 20px;\n  border: none;\n  color: rgb(61, 61, 61);\n  padding: 5px 20px 5px 20px;\n  background: rgb(255, 254, 254);\n  text-align: left;\n  cursor: pointer;\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n}\n .la-fm-container > button:hover{\n  border: none;\n  background: rgb(235, 233, 233); \n}\n\n.warning-banner {\n  margin: 20px auto;\n  padding: 10px 20px;\n  width: fit-content;\n  background-color: rgba(255, 229, 82, 0.363);\n  border: 1px solid rgb(230, 215, 83);\n  border-radius: 5px;\n  font-family: monospace;\n}  "],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 52 */
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),
/* 53 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map