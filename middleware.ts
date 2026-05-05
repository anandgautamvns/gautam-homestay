import { withAuth } from 'next-auth/middleware';

// Redirects unauthenticated users to /auth/login (set in authOptions.pages.signIn)
export default withAuth({
  pages: {
    signIn: '/auth/login',
  },
});

export const config = {
  matcher: ['/profile'],
};
