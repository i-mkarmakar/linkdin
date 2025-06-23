import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { PRIVATE_ROUTES } from './lib/routes';

const isPrivateRoute = createRouteMatcher(
  PRIVATE_ROUTES.map((route) => `/${route}`)
);

const middleware = clerkMiddleware(async (auth, req) => {
  if (isPrivateRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

export { middleware };