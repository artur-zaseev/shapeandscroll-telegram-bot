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
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("./parser");
let last_posts;
let find_result;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    last_posts = yield parser_1.getLastPosts(6, 3);
    find_result = yield parser_1.findPosts(6, 'айдентика');
}));
describe('getLastPosts', () => {
    test('test Data', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(last_posts).not.toBeNull();
        expect(last_posts).not.toBeUndefined();
    }));
    test('test Items', () => __awaiter(void 0, void 0, void 0, function* () {
        last_posts.map((i) => {
            expect(i.title).toBeTruthy();
            expect(i.content).toBeTruthy();
            expect(i.link).toBeTruthy();
            expect(i.date).toBeTruthy();
        });
    }));
});
describe('find_result', () => {
    test('test Finded Data', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(find_result).not.toBeNull();
        expect(find_result).not.toBeUndefined();
    }));
    test('test Finded Items', () => __awaiter(void 0, void 0, void 0, function* () {
        find_result.map((i) => {
            expect(i.title).toBeTruthy();
            expect(i.content).toBeTruthy();
            expect(i.link).toBeTruthy();
            expect(i.date).toBeTruthy();
        });
    }));
});
