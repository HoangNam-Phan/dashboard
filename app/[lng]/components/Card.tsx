import React, { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  customClasses: string | undefined;
};

export default function Button({ children, customClasses }: CardProps) {
  return (
    <div className={`shadow-lg rounded-lg bg-white p-3 ${customClasses}`}>
      {children}
    </div>
  );
}
