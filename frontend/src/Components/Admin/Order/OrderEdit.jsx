import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Label, Select, Button } from "flowbite-react";

const OrderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await axios.get(
        `https://ten-fashion.onrender.com/api/orders/${id}`
      );
      setOrder(response.data);
      setStatus(response.data.status);
    };
    fetchOrder();
  }, [id]);

  const handleUpdate = async () => {
    await axios.put(`https://ten-fashion.onrender.com/api/orders/${id}`, { status });
    navigate("/admin/orders");
  };

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Update Order Status</h2>
      <div className="mb-4">
        <Label htmlFor="status" value="Order Status" />
        <Select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-2"
        >
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </Select>
      </div>
      <Button color="success" onClick={handleUpdate}>
        Update Status
      </Button>
    </div>
  );
};

export default OrderEdit;
