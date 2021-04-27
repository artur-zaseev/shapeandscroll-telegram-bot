import { getLastPosts, findPosts } from './parser';
import { IPostData } from './types';

let last_posts: IPostData[];
let find_result: IPostData[];

beforeAll(async () => {
  last_posts = await getLastPosts(6, 3);
  find_result = await findPosts(6, 'айдентика');
});

describe('getLastPosts', () => {
  test('test Data', async () => {
    expect(last_posts).not.toBeNull();
    expect(last_posts).not.toBeUndefined();
  });

  test('test Items', async () => {
    last_posts.map((i: IPostData) => {
      expect(i.title).toBeTruthy();
      expect(i.content).toBeTruthy();
      expect(i.link).toBeTruthy();
      expect(i.date).toBeTruthy();
    });
  });
});

describe('find_result', () => {
  test('test Finded Data', async () => {
    expect(find_result).not.toBeNull();
    expect(find_result).not.toBeUndefined();
  });

  test('test Finded Items', async () => {
    find_result.map((i: IPostData) => {
      expect(i.title).toBeTruthy();
      expect(i.content).toBeTruthy();
      expect(i.link).toBeTruthy();
      expect(i.date).toBeTruthy();
    });
  });
});
