import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import acceptLanguage from 'accept-language';
import { fallbackLang, languages, cookieName } from './app/i18n/settings';

acceptLanguage.languages(languages);

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const authToken = req.cookies.get('token')?.value;
  let lng;

  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  }
  if (!lng) {
    lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  }
  if (!lng) {
    lng = fallbackLang;
  }

  // Redirect if lng in path is not supported
  if (
    !languages.some((lang) => req.nextUrl.pathname.startsWith(`/${lang}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') as string);
    const lngInReferer = languages.find((lang) =>
      refererUrl.pathname.startsWith(`/${lang}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  // will be removed, just for admin ease of use
  if (authToken !== '1') {
    if (!authToken && path === '/dashboard') {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (authToken) {
      if (path === '/' || path === '/login' || path === '/signup') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }
  }

  return NextResponse.next();
}
