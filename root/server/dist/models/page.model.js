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
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageSchema = exports.jotSchema = exports.stickerSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.stickerSchema = new mongoose_1.Schema({
    position: [Number, Number],
    image_id: String
});
exports.jotSchema = new mongoose_1.Schema({
    text: {
        type: String,
        default: "",
        maxLength: 100
    }
}, { timestamps: true });
exports.pageSchema = new mongoose_1.Schema({
    title: {
        type: String,
        default: "",
        maxLength: 20
    },
    date: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Cannot be blank"]
    },
    jots: {
        type: [exports.jotSchema],
        default: []
    },
    stickers: {
        type: [exports.stickerSchema],
        defaut: []
    }
}, { timestamps: true });
const Page = mongoose_1.default.model('Page', exports.pageSchema);
module.exports = Page;
