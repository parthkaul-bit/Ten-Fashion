import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "flowbite-react";

function AdminDashboard() {
  const adminActions = [
    {
      title: "Products",
      description: "Create, update and delete products.",
      link: "/admin/products",
      buttonText: "Go to Products",
    },
    {
      title: "Orders",
      description: "Track and update the status of orders.",
      link: "/admin/orders",
      buttonText: "Go to Orders",
    },
    {
      title: "Queries",
      description: "Check customer queries.",
      link: "/admin/queries",
      buttonText: "Go to queries",
    },
  ];

  return (
    <div>
      <Card>
        <h1 className="text-xl font-bold mb-6 max-md:text-lg">
          Welcome to Admin Dashboard.
        </h1>
        <div className="grid grid-rows-3 gap-6 max-md:grid-rows-1 max-md:grid-cols-3 max-sm:grid-rows-3 max-sm:grid-cols-1">
          {adminActions.map((action, index) => (
            <Card key={index}>
              <h2 className="text-lg font-bold max-md:text-base">
                {action.title}
              </h2>
              <p className="text-gray-600">{action.description}</p>
              <Link to={action.link}>
                <Button color="info" className="mt-4 max-md:text-sm">
                  {action.buttonText}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default AdminDashboard;
