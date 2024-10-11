import React, { useEffect, useState } from "react";
import Status from "./Status";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.type === "orderUpdate") {
        const updatedOrder = response.data;
        setOrders((prevOrders) => {
          const existingOrderIndex = prevOrders.findIndex(
            (order) => order.id === updatedOrder.id
          );

          if (existingOrderIndex !== -1) {
            const updatedOrders = [...prevOrders];
            updatedOrders[existingOrderIndex] = updatedOrder;
            return updatedOrders;
          } else {
            return [...prevOrders, updatedOrder];
          }
        });
      } else {
        console.log(response.data);
        setOrderStatus(response.data);
      }
    };

    ws.onclose = () => {
      console.error("WebSocket closed unexpectedly");
    };

    return () => ws.close();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          setOrders(result);
        } else {
          console.log("An Error Occured", response);
        }
      } catch (error) {
        console.error("Error creating the order:", error);
      }
    };
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const statusMap = {
      "Dough Chef": "primary",
      "Topping Chef": "warning",
      Oven: "danger",
      Serving: "info",
      Done: "success",
    };
    return statusMap[status] || "secondary";
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-success">Pizza Orders Tracker</h2>
      <div className="table-responsive mb-4">
        <table className="table table-striped table-hover table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Pizza</th>
              <th scope="col">Toppings</th>
              <th scope="col">Status</th>
              <th scope="col">Time Taken (secs)</th>
            </tr>
          </thead>
          <tbody>
            {orders?.length === 0 && (
              <tr>
                <td colSpan={5}>No Orders Yet!</td>
              </tr>
            )}
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.pizza}</td>
                <td>{order.toppings.join(", ")}</td>
                <td>
                  <span className={`badge bg-${getStatusBadge(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.timeTaken ? `${order.timeTaken} secs` : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {orderStatus && <Status data={orderStatus} />}
    </div>
  );
};

export default OrdersPage;
