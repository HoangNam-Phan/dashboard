import React from 'react';
import { useDispatch } from 'react-redux';
import { setLanguage } from '@/store/reducers/language';
import Link from 'next/link';

const LanguageToggler = () => {
  const dispatch = useDispatch();

  function toggleLanguage(lang: string) {
    dispatch(setLanguage(lang));
  }

  return (
    <header className="absolute top-0 right-0 p-3 w-full flex justify-between pos-abs">
      <h1>DASHHBOARD</h1>
      <nav className="space-x-5">
        <Link onClick={() => toggleLanguage('en')} href={`/en`}>
          EN
        </Link>
        <Link onClick={() => toggleLanguage('de')} href={`/de`}>
          DE
        </Link>
      </nav>
    </header>
  );
};

export default LanguageToggler;
