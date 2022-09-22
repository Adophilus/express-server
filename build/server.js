"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@overnightjs/core");
const http_status_codes_1 = require("http-status-codes");
const promises_1 = require("fs/promises");
const tslog_1 = require("tslog");
const path_1 = __importDefault(require("path"));
const APPS_PATH = 'apps';
class default_1 extends core_1.Server {
    constructor() {
        super();
        this.logger = new tslog_1.Logger({ name: 'MainServer' });
        this.loadApps().then(() => {
            this.defineRoutes();
        }).catch((err) => {
            this.logger.warn(err);
            this.logger.warn('Failed to load apps!');
        });
    }
    defineRoutes() {
        this.app.use((req, res) => {
            res.status(http_status_codes_1.NOT_FOUND).send({ error: http_status_codes_1.ReasonPhrases.NOT_FOUND });
        });
    }
    loadApps() {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield (0, promises_1.readdir)(APPS_PATH);
            for (const file of files) {
                this.logger.info(`Loading app: '${file}'`);
                const _module = yield Promise.resolve().then(() => __importStar(require(`../${path_1.default.join(APPS_PATH, file)}`)));
                this.app.use(`/${file}`, _module.default);
            }
        });
    }
    start(port, host) {
        var _a, _b;
        if (port === void 0) { port = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : '8000'); }
        if (host === void 0) { host = (_b = process.env.HOST) !== null && _b !== void 0 ? _b : '0.0.0.0'; }
        this.app.listen(port, host, () => {
            this.logger.info('Started app...');
        });
    }
}
exports.default = default_1;
