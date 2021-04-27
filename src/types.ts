export interface IPostData {
  title: string;
  content: string;
  link: string;
  date: string;
}

export interface IWPost {
  title: { rendered: string };
  content: { rendered: string };
  link: string;
  date: string;
}

export interface IState {
  isSearchBlog: boolean;
  isSearchPortfolio: boolean;
}

export interface IMenu {
  help: { command: string; description: string };
  last_posts: { command: string; description: string };
  find_in_blog: { command: string; description: string };
  last_portfolio: { command: string; description: string };
  find_in_portfolio: { command: string; description: string };
}
