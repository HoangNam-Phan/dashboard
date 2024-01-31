import Link from 'next/link';
import Button from '@/components/Button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1>Welcome to - board!</h1>
      <p>
        To be able to use this tool, please go ahead and create an account or
        login, if you already have an account.
      </p>
      <div>
        <Button>
          <Link href="/login">Login</Link>
        </Button>
        <Button>
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
    </div>
  );
}
