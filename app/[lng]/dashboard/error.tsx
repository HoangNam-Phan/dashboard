'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="size-full flex flex-col justify-center items-center space-y-5">
      <h2 className="text-2xl">Something went wrong!</h2>
      <button
        className="rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700"
        type="button"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
