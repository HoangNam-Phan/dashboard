import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import acceptLanguage from 'accept-language';
import { fallbackLang, languages, cookieName } from './app/i18n/settings';

acceptLanguage.languages(languages);

function setCurrentLang(req: NextRequest) {
  const cookieLang = req.cookies.get(cookieName)?.value;
  if (cookieLang && languages.includes(cookieLang)) {
    return acceptLanguage.get(cookieLang);
  }
  const headerLang = req.headers.get('Accept-Language');
  if (headerLang) {
    return acceptLanguage.get(headerLang);
  }

  return fallbackLang;
}

function navigationGuard(req: NextRequest, lang: string | undefined | null) {
  const path = req.nextUrl.pathname;
  const authToken = req.cookies.get('token')?.value;

  if (!authToken && path.includes('/dashboard')) {
    return NextResponse.redirect(new URL(`/${lang}/login`, req.url));
  }
  if (authToken) {
    if (path.includes('/signup') || path.includes('/login')) {
      return NextResponse.redirect(new URL(`/${lang}/dashboard`, req.url));
    }
  }
}

function updateLang(req: NextRequest) {
  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') as string);
    const lngInReferer = languages.find((lang) =>
      refererUrl.pathname.startsWith(`/${lang}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) {
      response.cookies.set(cookieName, lngInReferer);
    }
    const newLang = response.cookies.get(cookieName)?.value;
    const redirect = navigationGuard(req, newLang);

    if (redirect) {
      return redirect;
    }

    return response;
  }
}

export function middleware(req: NextRequest) {
  const currentLang = setCurrentLang(req);

  if (
    !languages.some((lang) => req.nextUrl.pathname.startsWith(`/${lang}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(
      new URL(`/${currentLang}${req.nextUrl.pathname}`, req.url)
    );
  }

  const setLang = updateLang(req);
  if (setLang) return setLang;

  const redirect = navigationGuard(req, currentLang);
  if (redirect) return redirect;

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
