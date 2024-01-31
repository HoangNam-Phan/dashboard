import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md p-3 w-full flex justify-between">
      <Link href="/">- board</Link>
      <nav>
        <ol className="flex space-x-3">
          <li>Menu</li>
        </ol>
      </nav>
    </header>
  );
}
