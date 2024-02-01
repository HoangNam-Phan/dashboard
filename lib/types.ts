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
  }
}

export type { User, FormUser, UserEntry, LanguageParams };
