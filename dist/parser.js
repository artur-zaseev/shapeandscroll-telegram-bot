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
exports.findPosts = exports.getLastPosts = void 0;
const axios_1 = __importDefault(require("axios"));
const WP_URL = `https://shapeandscroll.com/wp-json/wp/v2/posts/`;
const getBlogPostData = (post) => {
    let res = {
        title: post.title.rendered,
        content: post.content.rendered,
        link: post.link,
        date: post.date,
    };
    return res;
};
const getLastPosts = (category_id, posts_count = 5) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const html = yield axios_1.default.get(`${WP_URL}?categories=${category_id}&per_page=${posts_count}`);
        let data = html.data;
        let last_posts = data.map((i) => getBlogPostData(i));
        return last_posts;
    }
    catch (e) {
        console.error(`getLastPosts error`, e.message);
    }
});
exports.getLastPosts = getLastPosts;
const findPosts = (category_id, word) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        word = word.toLowerCase();
        let all_posts = yield exports.getLastPosts(category_id, 100);
        return all_posts.filter((i) => {
            if (i.title.toLowerCase().includes(word) || i.content.toLowerCase().includes(word))
                return true;
        });
    }
    catch (e) {
        console.error(`findPosts error`, e.message);
    }
});
exports.findPosts = findPosts;
