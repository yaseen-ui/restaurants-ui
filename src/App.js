import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.scss";
import Restaurants from "./components/restaurants/Restaurants";
import OrdersPage from "./components/restaurants/OrdersPage";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import NewOrderPage from "./components/restaurants/NewOrderPage";

function App() {
  const Routes = [
    {
      path: "/",
      index: true,
      loader: async () => redirect("restaurant"),
    },
    {
      path: "restaurant",
      element: <Restaurants />,
      // children: [
      //   {
      //     path: "",
      //     index: true,
      //     loader: async () => redirect("orders"),
      //   },
      //   {
      //     path: "orders",
      //     element: <OrdersPage />,
      //   },
      //   {
      //     path: "add-order",
      //     element: <NewOrderPage />,
      //   },
      // ],
    },
  ];
  const router = createBrowserRouter(Routes);

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <RouterProvider router={router} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
