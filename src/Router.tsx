import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GuestRoute from './Guards/guest-route';
import BlogPage from './routes/blog.page';
import AuthPage from './routes/auth.page';
import ProtectedRoute from './Guards/protected-route';
import PostPage from './routes/post.page';
import BackOfficePage from './routes/backOffice.page';
import ErrorPage from './routes/error.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BlogPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'auth',
    element: <GuestRoute><AuthPage /></GuestRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: 'new/edit_post:id',
    element: <ProtectedRoute><PostPage /></ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: 'back_office',
    element: <BackOfficePage />,
    errorElement: <ErrorPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
