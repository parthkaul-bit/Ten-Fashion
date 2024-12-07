import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spinner, Table } from "flowbite-react";
import AdminDashboard from "../AdminDashboard";

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get("https://ten-fashion.onrender.com/contactForm");
        setQueries(response.data);
      } catch (err) {
        console.error("Error fetching queries:", err);
        setError("Failed to fetch queries.");
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="w-[100%] flex justify-between max-md:flex-wrap">
      {/* AdminDashboard Section */}
      <div className="w-[25%] max-md:w-[100%] max-md:mb-5">
        <AdminDashboard />
      </div>

      {/* Queries Table */}
      <div className="w-[72%] max-md:w-[100%]">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">All Queries</h2>
          </div>

          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>#</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Subject</Table.HeadCell>
              <Table.HeadCell>Message</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {queries.map((query, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{query.fullName}</Table.Cell>
                  <Table.Cell>{query.email}</Table.Cell>
                  <Table.Cell>{query.Subject}</Table.Cell>
                  <Table.Cell>{query.message}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          {queries.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No queries found.</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Queries;
