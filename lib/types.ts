type User = {
  userName: string | Buffer;
  password: string | Buffer;
};

type FormUser = {
  userName: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
};

type UserEntry = {
  id: number;
  userName: string;
  password: string;
  token?: string;
};

type LanguageParams = {
  params: {
    lng: string;
  };
};

type FormTodo = {
  text: FormDataEntryValue | null;
  deadline: FormDataEntryValue | null;
  id?: number | undefined;
};

type TodoItem = {
  id: number;
  text: string;
  deadline: string;
};

type ErrorObject = {
  message: string;
} | null;

type Article = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

type NewsResponse = {
  status: string;
  totalResults: number;
  articles: Article[];
} | null;

export type {
  User,
  FormUser,
  UserEntry,
  LanguageParams,
  TodoItem,
  ErrorObject,
  FormTodo,
  NewsResponse,
};
