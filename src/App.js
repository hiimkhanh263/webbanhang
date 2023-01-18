import React from "react";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./layouts/Footer/Footer";
import Header from "./layouts/Header/Header";
import Account from "./Pages/Account/Account";
import Cart from "./Pages/Cart/Cart";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login";
import Payment from "./Pages/Payment/Payment";
import Product from "./Pages/Product/Product";
import Products from "./Pages/Products/Products";
import Register from "./Pages/Register";

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
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/payment",
        element: <Payment />,
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

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { publicRoutes } from "./routes";
// import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
// import { Fragment } from "react";

// function App() {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           {publicRoutes.map((route, index) => {
//             const Layout = route.layout === null ? Fragment : DefaultLayout;
//             const Page = route.component;
//             return (
//               <Route
//                 key={index}
//                 path={route.path}
//                 element={
//                   <Layout>
//                     <Page />
//                   </Layout>
//                 }
//               />
//             );
//           })}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
