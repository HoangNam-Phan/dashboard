import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import acceptLanguage from 'accept-language';
import { fallbackLang, languages, cookieName } from './app/i18n/settings';

acceptLanguage.languages(languages);

function navigationGuard(req: NextRequest, lang: string | undefined) {
  const path = req.nextUrl.pathname;
  const authToken = req.cookies.get('token')?.value;

  //to-do: fix url
  
  if (authToken !== '1') {
    if (!authToken && path === `/${lang}/dashboard`) {
      return NextResponse.redirect(new URL(`/${lang}/login`, req.url));
    }

    if (authToken) {
      if (
        path === `/${lang}` ||
        path === `/${lang}/login` ||
        path === `/${lang}/signup`
      ) {
        return NextResponse.redirect(new URL(`/${lang}/dashboard`, req.url));
      }
    }
  }
  console.log(req.url)
  return NextResponse.redirect(new URL(`/${lang}/dashboard`, req.url));
}

export function middleware(req: NextRequest) {
  let lang;

  if (req.cookies.has(cookieName)) {
    lang = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  }
  if (!lang) {
    lang = acceptLanguage.get(req.headers.get('Accept-Language'));
  }
  if (!lang) {
    lang = fallbackLang;
  }

  if (
    !languages.some((lang) => req.nextUrl.pathname.startsWith(`/${lang}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(
      new URL(`/${lang}${req.nextUrl.pathname}`, req.url)
    );
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') as string);
    const lngInReferer = languages.find((lang) =>
      refererUrl.pathname.startsWith(`/${lang}`)
    );
    const response = NextResponse.next();
    console.log(response)
    if (lngInReferer) {
      response.cookies.set(cookieName, lngInReferer);
      const newLang = response.cookies.get(cookieName)?.value
      navigationGuard(req, newLang);
    }

    return response;
  }

  return NextResponse.next();
}
