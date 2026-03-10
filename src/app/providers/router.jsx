import { createBrowserRouter, Navigate } from 'react-router-dom';
import { SharedLayout } from '@/widgets/layout/ui/SharedLayout.jsx';
import { HomePage } from '@/pages/home/ui/HomePage.jsx';
import { RecipePage } from '@/pages/recipe/ui/RecipePage.jsx';
import { AddRecipePage } from '@/pages/add-recipe/ui/AddRecipePage.jsx';
import { UserPage } from '@/pages/user/ui/UserPage.jsx';
import { useUserStore } from '@/entities/user/model/use-user-store.js';

const PrivateRoute = ({ children }) => {
  const isAuth = useUserStore((state) => state.isAuth);
  return isAuth ? children : <Navigate replace to="/" />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SharedLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'recipe/:id',
        element: <RecipePage />,
      },
      {
        path: 'recipe/add',
        element: (
          <PrivateRoute>
            <AddRecipePage />
          </PrivateRoute>
        ),
      },
      {
        path: 'user/:id',
        element: (
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
