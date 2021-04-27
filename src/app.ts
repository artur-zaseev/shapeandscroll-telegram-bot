import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { menu, onLastPosts, onFindInPosts, onHelp } from './helpers';
import { IState } from './types';

dotenv.config();

const CATEGORY_BLOG_ID: number = 6;
const CATEGORY_PORTFOLIO_ID: number = 2;

const bot = new TelegramBot(process.env.TOKEN_SS, { polling: true });

const state: IState = {
  isSearchBlog: false,
  isSearchPortfolio: false,
};

const resetSearch = (): void => {
  state.isSearchBlog = false;
  state.isSearchPortfolio = false;
};

bot.on('message', async (msg) => {
  // Show searh in Blog
  if (state.isSearchBlog) {
    let result: string = await onFindInPosts(CATEGORY_BLOG_ID, msg.text);
    bot.sendMessage(msg.chat.id, result, { parse_mode: 'HTML' });
    state.isSearchBlog = false;
  }

  // Show searh in Portfolio
  if (state.isSearchPortfolio) {
    let result: string = await onFindInPosts(CATEGORY_PORTFOLIO_ID, msg.text);
    bot.sendMessage(msg.chat.id, result, { parse_mode: 'HTML' });
    state.isSearchPortfolio = false;
  }

  resetSearch();

  if (msg.text === `/start`) {
    bot.sendMessage(msg.chat.id, onHelp(), { parse_mode: 'HTML' });
  }

  if (msg.text === menu.help.command) {
    bot.sendMessage(msg.chat.id, onHelp(), { parse_mode: 'HTML' });
  }

  if (msg.text === menu.last_posts.command) {
    let posts: string[] = await onLastPosts(CATEGORY_BLOG_ID);
    posts.map((post: string) => {
      bot.sendMessage(msg.chat.id, post, { parse_mode: 'HTML' });
    });
  }

  if (msg.text === menu.find_in_blog.command) {
    state.isSearchBlog = true;
    bot.sendMessage(msg.chat.id, 'Какое слово будем искать?');
  }

  if (msg.text === menu.last_portfolio.command) {
    let posts: string[] = await onLastPosts(CATEGORY_PORTFOLIO_ID);
    posts.map((post: string) => {
      bot.sendMessage(msg.chat.id, post, { parse_mode: 'HTML' });
    });
  }

  if (msg.text === menu.find_in_portfolio.command) {
    state.isSearchPortfolio = true;
    bot.sendMessage(msg.chat.id, 'Какое слово будем искать?');
  }
});
