type User = {
  userName: string | Buffer;
  password: string | Buffer;
};

type FormUser = {
  userName: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
};

type UserEntry = {
  userName: string;
  password: string;
  token?: string;
};

type LanguageParams = {
  params: {
    lng: string;
  };
};

type Todo = {
  id: number;
  text: string;
  deadline: string;
};

export type { User, FormUser, UserEntry, LanguageParams, Todo };
