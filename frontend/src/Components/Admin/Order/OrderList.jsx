import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Table, Badge, Button } from "flowbite-react";
import AdminDashboard from "../AdminDashboard";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get("https://ten-fashion.onrender.com/api/orders/all");
      setOrders(response.data);

      // Initialize status for each order
      const initialStatus = {};
      response.data.forEach((order) => {
        initialStatus[order._id] = order.status;
      });
      setOrderStatus(initialStatus);
    };
    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setOrderStatus((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  const handleUpdate = async (orderId) => {
    const newStatus = orderStatus[orderId];
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `https://ten-fashion.onrender.com/api/orders/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Optionally, update the orders state to reflect the new status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      alert("Order status updated successfully.");
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status.");
    }
  };

  // Define a mapping for status-to-color
  const statusColors = {
    Pending: "warning",
    Processing: "blue",
    Shipped: "purple",
    Delivered: "success",
    Cancelled: "red",
  };

  return (
    <div className="w-[100%] flex justify-between max-md:flex-wrap">
      {/* AdminDashboard Section */}
      <div className="w-[25%] max-md:w-[100%] max-md:mb-5">
        <AdminDashboard />
      </div>

      {/* OrderList Section */}
      <div className="w-[72%] max-md:w-[100%]">
        <Card>
          <h2 className="text-2xl font-bold mb-4">Orders</h2>
          <div className="overflow-x-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>Order ID</Table.HeadCell>
                <Table.HeadCell>Customer</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {orders.map((order) => (
                  <Table.Row key={order._id}>
                    <Table.Cell>{order._id}</Table.Cell>
                    <Table.Cell>{order.CustomerName}</Table.Cell>
                    <Table.Cell>
                      <Badge color={statusColors[order.status] || "gray"}>
                        {order.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell className="flex">
                      <select
                        value={orderStatus[order._id]}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="mr-2 border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <Button
                        color="info"
                        size="sm"
                        onClick={() => handleUpdate(order._id)}
                      >
                        Update
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderList;
