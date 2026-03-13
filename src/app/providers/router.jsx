import { createBrowserRouter, Navigate } from 'react-router-dom';
import { SharedLayout } from '@/widgets/layout/ui/SharedLayout.jsx';
import { HomePage } from '@/pages/home/ui/HomePage.jsx';
import { RecipePage } from '@/pages/recipe/ui/RecipePage.jsx';
import { AddRecipePage } from '@/pages/add-recipe/ui/AddRecipePage.jsx';
import { UserPage } from '@/pages/user/ui/UserPage.jsx';
import { ComponentsPage } from '@/pages/components/ui/ComponentsPage.jsx';
import { PrivateRoute } from './PrivateRoute.jsx';

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

      // TODO: delete ComponentsPage after development
      {
        path: 'components',
        element: <ComponentsPage />,
      },

      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
