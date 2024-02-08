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

export type {
  User,
  FormUser,
  UserEntry,
  LanguageParams,
  TodoItem,
  ErrorObject,
  FormTodo,
};
