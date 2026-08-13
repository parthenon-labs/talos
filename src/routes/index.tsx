import { RouteObject, useRoutes } from 'react-router-dom';
import loadable from '@/utils/loadable';

const Layout = loadable(() => import('@/layout'));
const ListPage = loadable(() => import('@/pages/List-page'));
export const Edit = loadable(() => import('@/pages/Edit'));
const NotFound = loadable(() => import('@/pages/NotFound'));
const Signin = loadable(() => import('@/pages/Login'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ListPage />,
      },
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/login',
    element: <Signin />,
  },
];

const AppRoutes = () => useRoutes(routes);

export default AppRoutes;
