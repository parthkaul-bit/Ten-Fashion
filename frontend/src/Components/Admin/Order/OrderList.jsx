import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Table, Badge, Button } from "flowbite-react";
import AdminDashboard from "../AdminDashboard";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get("http://localhost:8000/api/orders/all");
      setOrders(response.data);
    };
    fetchOrders();
  }, []);

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
                    <Badge
                      color={
                        order.status === "Delivered" ? "success" : "warning"
                      }
                    >
                      {order.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/admin/orders/${order._id}`}>
                      <Button color="info" size="sm" className="mr-2">
                        Update
                      </Button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default OrderList;
