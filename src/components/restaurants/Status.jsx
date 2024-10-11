import React from "react";

const RestaurantManagement = ({ data }) => {
  const {
    availableDoughChefs,
    availableToppingChefs,
    availableWaiters,
    availableOven,
    busyDoughChefs,
    busyToppingChefs,
    busyOven,
    busyWaiters,
    doughChefQueue,
    toppingChefQueue,
    ovenQueue,
    waiterQueue,
  } = data;

  return (
    <div className="container py-4">
      <h2 className="text-center text-success mb-4">
        Restaurant Staff & Queue Status
      </h2>
      <div className="row mb-3">
        <div className="col-md-6 mb-3">
          <div className="card text-center">
            <div className="card-header bg-dark text-white">Dough Chefs</div>
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-card-checklist text-success"></i> Total:{" "}
                {availableDoughChefs}
              </h5>
              <h5 className="card-title">
                <i className="bi bi-person-check-fill text-success"></i>{" "}
                Available: {availableDoughChefs - busyDoughChefs}
              </h5>
              <h5 className="card-title">
                <i className="bi bi-person-x-fill text-danger"></i> Busy:{" "}
                {busyDoughChefs}
              </h5>
              <div className="mt-2">
                <span className="badge bg-info">
                  Queue: {doughChefQueue.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card text-center">
            <div className="card-header bg-dark text-white">Topping Chefs</div>
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-card-checklist text-success"></i> Total:{" "}
                {availableToppingChefs}
              </h5>
              <h5 className="card-title">
                <i className="bi bi-person-check-fill text-success"></i>{" "}
                Available: {availableToppingChefs - busyToppingChefs}
              </h5>
              <h5 className="card-title">
                <i className="bi bi-person-x-fill text-danger"></i> Busy:{" "}
                {busyToppingChefs}
              </h5>
              <div className="mt-2">
                <span className="badge bg-info">
                  Queue: {toppingChefQueue.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 mb-3">
          <div className="card text-center">
            <div className="card-header bg-dark text-white">Oven Status</div>
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-card-checklist  text-success"></i> Total:{" "}
                {availableOven}
              </h5>
              <h5 className="card-title">
                <i className="bi bi-person-check-fill text-success"></i>{" "}
                Available: {availableOven - busyOven}
              </h5>
              <h5 className="card-title">
                <i className="bi bi-fire text-danger"></i> Busy: {busyOven}
              </h5>
              <div className="mt-2">
                <span className="badge bg-info">Queue: {ovenQueue.length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card text-center">
            <div className="card-header bg-dark text-white">Waiters</div>
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-card-checklist text-success"></i> Total:{" "}
                {availableWaiters}
              </h5>
              <h5 className="card-title">
                <i className="bi bi-person-check-fill text-success"></i>{" "}
                Available: {availableWaiters - busyWaiters}
              </h5>
              <h5 className="card-title">
                <i className="bi bi-person-x-fill text-danger"></i> Busy:{" "}
                {busyWaiters}
              </h5>
              <div className="mt-2">
                <span className="badge bg-info">
                  Queue: {waiterQueue.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantManagement;
