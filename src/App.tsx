import { Helmet, HelmetProvider } from 'react-helmet-async';
// eslint-disable-next-line import/order
import { RouterProvider } from 'react-router-dom';

import './global.css';

import { Toaster } from 'sonner';

import { router } from './routes';

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizza.shop" />
      <RouterProvider router={router} />

      <Toaster richColors />
    </HelmetProvider>
  );
}
