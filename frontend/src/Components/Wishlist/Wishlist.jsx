import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/useContext";
import { fetchWishlist } from "../../../utils/wishlist";
import ProductDetails from "../products/ProductDetails";
import { ProductCard } from "../ProductCard";

const Wishlist = () => {
  const { currentUser } = useUserContext();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [error, setError] = useState(null);
  console.log(wishlistItems)

  useEffect(() => {
    const getWishlist = async () => {
      if (currentUser?._id) {
        try {
          const response = await fetchWishlist(currentUser._id);
          setWishlistItems(response);
        } catch (err) {
          console.error("Error fetching wishlist:", err);
          setError("Failed to fetch wishlist. Please try again.");
        }
      }
    };

    getWishlist();
  }, [currentUser?._id]);

  if (!currentUser) {
    return <div>Please log in to see your wishlist.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl text-center font-semibold py-4">
        Your favourites
      </h1>
      {error ? <p>{error}</p> : <ProductCard data={wishlistItems} />}
    </div>
  );
};

export default Wishlist;
