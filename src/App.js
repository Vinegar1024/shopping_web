import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ShopandCartLayout from "./pages/ShopandCart";
import HomePage from './pages/Home';
import RootLayout from './pages/Root';
import AdminLayout from "./pages/ProductsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: 'root',
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "shop-n-cart",
        element: <ShopandCartLayout />,
      },
      {
        path: "product",
        element: <AdminLayout />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
