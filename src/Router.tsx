import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GuestRoute from './Guards/guest-route';
import AuthPage from './routes/auth.page';
import ProtectedRoute from './Guards/protected-route';
import PostPage from './routes/post.page';
import BackOfficePage from './routes/backOffice.page';
import ErrorPage from './routes/error.page';
import HomePage from './routes/Home.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
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
