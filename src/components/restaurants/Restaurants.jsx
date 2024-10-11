import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import NewOrderPage from "./NewOrderPage";
import OrdersPage from "./OrdersPage";

const menu = [
  { label: "Add Order", path: "add-order" },
  { label: "View Order", path: "orders" },
];

function Restaurants() {
  return (
    <>
      <div className="p-5">
        {/* <ul className="nav nav-tabs">
          {menu.map((ele) => (
            <li className="nav-item" key={ele.path}>
              <NavLink to={ele.path} className="nav-link">
                {ele.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div>
          <Outlet />
        </div> */}
        <NewOrderPage />
        <OrdersPage />
      </div>
    </>
  );
}

export default Restaurants;
