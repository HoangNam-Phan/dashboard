import Link from "next/link";

export default function Header() {
  return (
    <header className="absolute top-0 right-0 bg-white shadow-md p-3 w-full flex justify-between pos-abs">
      <Link href="/">- board</Link>
      <nav>
        <ol className="flex space-x-3">
          <li>Menu</li>
        </ol>
      </nav>
    </header>
  );
}
