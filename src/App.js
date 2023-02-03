import React from 'react';

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Account from './Pages/Account/Account';
import Cart from './Pages/Cart/Cart';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Payment from './Pages/Payment/Payment';
import PaymentSuccess from './Pages/PaymentSuccess/PaymentSuccess';
import Product from './Pages/Product/Product';
import Products from './Pages/Products/Products';
import Register from './Pages/Register/Register';
import AccountEdit from './Pages/AccountEdit/AccountEdit';
import CatalogSearch from './Pages/CatalogSearch/CatalogSearch';

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/products/:id',
        element: <Products />,
      },
      {
        path: '/product/:id',
        element: <Product />,
      },
      {
        path: '/account',
        element: <Account />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/payment',
        element: <Payment />,
      },
      {
        path: '/paymentsuccess',
        element: <PaymentSuccess />,
      },
      {
        path: '/account-edit',
        element: <AccountEdit />,
      },
      {
        path: '/catalog-search',
        element: <CatalogSearch />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
