"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const home_1 = __importDefault(require("./pages/home"));
const artists_1 = __importDefault(require("./pages/artists"));
const albums_1 = __importDefault(require("./pages/albums"));
const SearchHeader_1 = __importDefault(require("./components/SearchHeader"));
const paths_1 = require("./utils/paths");
const react_router_dom_1 = require("react-router-dom");
require("./App.scss");
function App() {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.BrowserRouter, { children: [(0, jsx_runtime_1.jsx)(SearchHeader_1.default, {}), (0, jsx_runtime_1.jsx)(react_router_dom_1.Routes, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Route, Object.assign({ path: paths_1.ROUTES.HOME }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { index: true, element: (0, jsx_runtime_1.jsx)(home_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: paths_1.ROUTES.ARTISTS, element: (0, jsx_runtime_1.jsx)(artists_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: paths_1.ROUTES.ALBUMS, element: (0, jsx_runtime_1.jsx)(albums_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "*", element: (0, jsx_runtime_1.jsx)(home_1.default, {}) })] })) })] }) }));
}
exports.default = App;
