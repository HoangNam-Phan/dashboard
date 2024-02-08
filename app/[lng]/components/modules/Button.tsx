import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
};

export default function Button({children}: ButtonProps) {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 my-5 mx-2 rounded">
      {children}
    </button>
  );
}
