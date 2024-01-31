import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to - board!</h1>
      <p>
        To be able to use this tool, please go ahead and create an account or
        login, if you already have an account.
      </p>
      <div>
        <Link href="/login">Login</Link>
        <Link href="/signup">Sign up</Link>
      </div>
    </div>
  );
}
