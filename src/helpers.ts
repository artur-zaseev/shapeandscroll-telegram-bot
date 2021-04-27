import { getLastPosts, findPosts } from './parser';
import { IPostData, IMenu } from './types';

export const menu: IMenu = {
  help: { command: `/help`, description: `помощь` },
  last_posts: { command: `/last_posts`, description: `3 последних поста из блога` },
  last_portfolio: { command: `/last_portfolio`, description: `3 последних кейса` },
  find_in_blog: { command: `/find_in_blog`, description: `поиск по блогу` },
  find_in_portfolio: { command: `/find_in_portfolio`, description: `поиск по кейсам` },
};

const strippedStr = (html: string): string => html.replace(/(\<|\>)/g, "'");

const createLink = (post: IPostData): string => {
  return `<a href="${strippedStr(post.link)}">${strippedStr(post.title)}</a>`;
};

export const onHelp = (): string => {
  let res: string = '';
  Object.keys(menu).map((i) => {
    res += `${menu[i].command} - ${menu[i].description}\n`;
  });
  return res;
};

export const onLastPosts = async (category_id: number): Promise<string[]> => {
  try {
    let req: IPostData[] = await getLastPosts(category_id, 3);
    let res: Array<string> = req.map((post) => createLink(post));
    return res;
  } catch (error) {
    console.error(`onFindInPosts error`, (error as Error).message);
  }
};

export const onFindInPosts = async (category_id: number, text: string): Promise<string> => {
  try {
    if (!text) return 'Запрос не указан';

    let posts: IPostData[] = await findPosts(category_id, text);
    if (!posts.length) return `Ничего не найдено`;

    let res: string = ``;
    posts.map((post: IPostData) => (res += createLink(post) + '\n\n'));

    return res;
  } catch (error) {
    console.error(`onFindInPosts error`, (error as Error).message);
  }
};
