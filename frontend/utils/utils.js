import axios from "axios";
import { toast } from "react-toastify";

export const handleAddToCart = async (
  productId,
  quantity,
  productTitle,
  price,
  images
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("User is not authenticated. Please log in.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:8000/cartItem",
      {
        productId,
        quantity,
        productTitle,
        price,
        images,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    toast.success("Product added to cart");
    console.log("Added product to cart:", response.data);
  } catch (err) {
    console.error("Error adding product to cart:", err.message);
    toast.error("Failed to add product");
    console.log("Failed to add product to cart");
  }
};
