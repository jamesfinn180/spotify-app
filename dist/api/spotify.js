"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_ID = void 0;
// Spotify API
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const cors_1 = __importDefault(require("cors"));
exports.CLIENT_ID = '09f24d668e2647bb8c0b3eeb16847b5d';
const CLIENT_SECRET = 'ba56d21f5f254366aae033012bd11737';
const REDIRECT_URI = 'http://localhost:3000';
const RESPONSE_TYPE = 'token';
// const express = require('express');
// const axios = require('axios');
// const qs = require('qs');
// const cors = require('cors');
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
let token = '';
const getToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const data = qs_1.default.stringify({ grant_type: 'client_credentials' });
    const response = yield axios_1.default.post(tokenUrl, data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${exports.CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
        }
    });
    token = response.data.access_token;
});
app.get('/api/token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield getToken();
    res.json({ token });
}));
app.get('/api/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { q, type } = req.query;
    const response = yield axios_1.default.get('https://api.spotify.com/v1/search', {
        headers: { Authorization: `Bearer ${token}` },
        params: { q, type }
    });
    res.json(response.data);
}));
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
