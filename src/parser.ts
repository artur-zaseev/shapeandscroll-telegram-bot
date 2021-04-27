import axios from 'axios';
import { IPostData, IWPost } from './types';

const WP_URL: string = `https://shapeandscroll.com/wp-json/wp/v2/posts/`;

const getBlogPostData = (post: IWPost): IPostData => {
  let res: IPostData = {
    title: post.title.rendered,
    content: post.content.rendered,
    link: post.link,
    date: post.date,
  };
  return res;
};

export const getLastPosts = async (category_id: number, posts_count: number = 5): Promise<IPostData[]> => {
  try {
    const html = await axios.get(`${WP_URL}?categories=${category_id}&per_page=${posts_count}`);
    let data: IWPost[] = html.data;
    let last_posts: IPostData[] = data.map((i: IWPost) => getBlogPostData(i));
    return last_posts;
  } catch (e) {
    console.error(`getLastPosts error`, (e as Error).message);
  }
};

export const findPosts = async (category_id: number, word: string): Promise<IPostData[]> => {
  try {
    word = word.toLowerCase();
    let all_posts: IPostData[] = await getLastPosts(category_id, 100);
    return all_posts.filter((i: IPostData) => {
      if (i.title.toLowerCase().includes(word) || i.content.toLowerCase().includes(word)) return true;
    });
  } catch (e) {
    console.error(`findPosts error`, (e as Error).message);
  }
};
