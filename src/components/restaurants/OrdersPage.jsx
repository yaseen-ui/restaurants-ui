import React, { useEffect, useState } from "react";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    // WebSocket connection to get real-time updates
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3001");

        ws.onmessage = (event) => {
            const updatedOrder = JSON.parse(event.data);  // Single order object

            setOrders((prevOrders) => {
                const existingOrderIndex = prevOrders.findIndex(order => order.id === updatedOrder.id);

                if (existingOrderIndex !== -1) {
                    // Order exists, update it
                    const updatedOrders = [...prevOrders];
                    updatedOrders[existingOrderIndex] = updatedOrder;
                    return updatedOrders;
                } else {
                    // New order, add it to the list
                    return [...prevOrders, updatedOrder];
                }
            });
        };

        ws.onclose = () => {
            console.error("WebSocket closed unexpectedly");
        };

        return () => ws.close();
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
            <div className="table-responsive">
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
        </div>
    );
};

export default OrdersPage;
