import React, { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  customClasses: string | undefined;
};

export default function Card({ children, customClasses }: CardProps) {
  return (
    <div className={`shadow-lg rounded-lg p-5 ${customClasses}`}>
      {children}
    </div>
  );
}
