import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { loading as menuLoader } from "./features/menu/Menu";
import Order, { loader as orderLoader } from "./features/order/Order";
import { action as actionUpdateOrder } from "./features/order/UpdateOrder";
import CreateOrder, {
  action as actionCreateNewOrder,
} from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";
import Cart from "./features/cart/Cart";
import Error from "./ui/Error";
import "../src/index.css";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "cart", element: <Cart /> },
      //2- provide loader
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: actionCreateNewOrder,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: actionUpdateOrder,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
