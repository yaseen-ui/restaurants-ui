import React, { useState } from "react";

const NewOrderPage = () => {
    const [pizza, setPizza] = useState("");
    const [toppings, setToppings] = useState([]);
    const [message, setMessage] = useState("");
    const availableToppings = ["Cheese", "Pepperoni", "Mushrooms", "Onions", "Olives", "Tomatoes"];

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newOrder = { pizza, toppings };

        try {
            const response = await fetch("http://localhost:3001/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newOrder),
            });

            if (response.ok) {
                const result = await response.json();
                setMessage(`Order created successfully! Order ID: ${result.order.id}`);
                setPizza("");
                setToppings([]);
            } else {
                setMessage("Failed to create order. Please try again.");
            }
        } catch (error) {
            console.error("Error creating the order:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    const handleToppingChange = (topping) => {
        if (toppings.includes(topping)) {
            setToppings(toppings.filter((t) => t !== topping));
        } else {
            setToppings([...toppings, topping]);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center text-primary mb-4">Create Your Pizza Order</h2>
            <form onSubmit={handleSubmit} className="p-4 shadow-sm rounded bg-light">
                <div className="mb-3">
                    <label htmlFor="pizza" className="form-label">
                        Pizza Type
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="pizza"
                        value={pizza}
                        onChange={(e) => setPizza(e.target.value)}
                        placeholder="Enter pizza type"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Select Toppings</label>
                    <div>
                        {availableToppings.map((topping, index) => (
                            <div key={index} className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={topping}
                                    id={`topping-${index}`}
                                    onChange={() => handleToppingChange(topping)}
                                    checked={toppings.includes(topping)}
                                />
                                <label className="form-check-label" htmlFor={`topping-${index}`}>
                                    {topping}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit" className="btn btn-success w-100">Submit Order</button>
            </form>

            {/* Display message after form submission */}
            {message && <div className="alert alert-info mt-4">{message}</div>}
        </div>
    );
};

export default NewOrderPage;
