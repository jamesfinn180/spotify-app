"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const paths_1 = require("../../utils/paths");
require("./Header.style.scss");
const Header = () => {
    const location = (0, react_router_dom_1.useLocation)();
    const page = location.pathname;
    const isHome = page === paths_1.ROUTES.HOME;
    return ((0, jsx_runtime_1.jsx)("header", Object.assign({ className: isHome ? 'Header__container Header__container--home' : 'Header__container' }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'Header__content' }, { children: [isHome && (0, jsx_runtime_1.jsx)("h1", Object.assign({ className: 'Heading' }, { children: "Music Search" })), (0, jsx_runtime_1.jsx)("input", { className: 'SearchInput', type: 'text' })] })) })));
};
exports.default = Header;
