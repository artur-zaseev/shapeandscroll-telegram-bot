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
exports.onFindInPosts = exports.onLastPosts = exports.onHelp = exports.menu = void 0;
const parser_1 = require("./parser");
exports.menu = {
    help: { command: `/help`, description: `помощь` },
    last_posts: { command: `/last_posts`, description: `3 последних поста из блога` },
    last_portfolio: { command: `/last_portfolio`, description: `3 последних кейса` },
    find_in_blog: { command: `/find_in_blog`, description: `поиск по блогу` },
    find_in_portfolio: { command: `/find_in_portfolio`, description: `поиск по кейсам` },
};
const strippedStr = (html) => html.replace(/(\<|\>)/g, "'");
const createLink = (post) => {
    return `<a href="${strippedStr(post.link)}">${strippedStr(post.title)}</a>`;
};
const onHelp = () => {
    let res = '';
    Object.keys(exports.menu).map((i) => {
        res += `${exports.menu[i].command} - ${exports.menu[i].description}\n`;
    });
    return res;
};
exports.onHelp = onHelp;
const onLastPosts = (category_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let req = yield parser_1.getLastPosts(category_id, 3);
        let res = req.map((post) => createLink(post));
        return res;
    }
    catch (error) {
        console.error(`onFindInPosts error`, error.message);
    }
});
exports.onLastPosts = onLastPosts;
const onFindInPosts = (category_id, text) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!text)
            return 'Запрос не указан';
        let posts = yield parser_1.findPosts(category_id, text);
        if (!posts.length)
            return `Ничего не найдено`;
        let res = ``;
        posts.map((post) => (res += createLink(post) + '\n\n'));
        return res;
    }
    catch (error) {
        console.error(`onFindInPosts error`, error.message);
    }
});
exports.onFindInPosts = onFindInPosts;
