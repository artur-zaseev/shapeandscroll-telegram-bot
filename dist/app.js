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
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const dotenv_1 = __importDefault(require("dotenv"));
const helpers_1 = require("./helpers");
dotenv_1.default.config();
const CATEGORY_BLOG_ID = 6;
const CATEGORY_PORTFOLIO_ID = 2;
const bot = new node_telegram_bot_api_1.default(process.env.TOKEN_SS, { polling: true });
const state = {
    isSearchBlog: false,
    isSearchPortfolio: false,
};
const resetSearch = () => {
    state.isSearchBlog = false;
    state.isSearchPortfolio = false;
};
bot.on('message', (msg) => __awaiter(void 0, void 0, void 0, function* () {
    // Show searh in Blog
    if (state.isSearchBlog) {
        let result = yield helpers_1.onFindInPosts(CATEGORY_BLOG_ID, msg.text);
        bot.sendMessage(msg.chat.id, result, { parse_mode: 'HTML' });
        state.isSearchBlog = false;
    }
    // Show searh in Portfolio
    if (state.isSearchPortfolio) {
        let result = yield helpers_1.onFindInPosts(CATEGORY_PORTFOLIO_ID, msg.text);
        bot.sendMessage(msg.chat.id, result, { parse_mode: 'HTML' });
        state.isSearchPortfolio = false;
    }
    resetSearch();
    if (msg.text === `/start`) {
        bot.sendMessage(msg.chat.id, helpers_1.onHelp(), { parse_mode: 'HTML' });
    }
    if (msg.text === helpers_1.menu.help.command) {
        bot.sendMessage(msg.chat.id, helpers_1.onHelp(), { parse_mode: 'HTML' });
    }
    if (msg.text === helpers_1.menu.last_posts.command) {
        let posts = yield helpers_1.onLastPosts(CATEGORY_BLOG_ID);
        posts.map((post) => {
            bot.sendMessage(msg.chat.id, post, { parse_mode: 'HTML' });
        });
    }
    if (msg.text === helpers_1.menu.find_in_blog.command) {
        state.isSearchBlog = true;
        bot.sendMessage(msg.chat.id, 'Какое слово будем искать?');
    }
    if (msg.text === helpers_1.menu.last_portfolio.command) {
        let posts = yield helpers_1.onLastPosts(CATEGORY_PORTFOLIO_ID);
        posts.map((post) => {
            bot.sendMessage(msg.chat.id, post, { parse_mode: 'HTML' });
        });
    }
    if (msg.text === helpers_1.menu.find_in_portfolio.command) {
        state.isSearchPortfolio = true;
        bot.sendMessage(msg.chat.id, 'Какое слово будем искать?');
    }
}));
