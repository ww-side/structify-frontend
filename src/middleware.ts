import { type NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  const { pathname } = req.nextUrl;

  const publicRoutes = ['/auth', '/api/public'];

  const isStaticFile =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/public') ||
    pathname.match(
      /\.(png|jpg|mp4|jpeg|gif|svg|webp|ico|css|js|woff|woff2|ttf|otf)$/,
    );

  if (!accessToken && !publicRoutes.includes(pathname) && !isStaticFile) {
    return NextResponse.redirect(new URL('/auth', req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
