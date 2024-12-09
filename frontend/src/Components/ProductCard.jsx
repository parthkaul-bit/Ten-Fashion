import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleAddToCart } from "../../utils/utils";
import { useUserContext } from "../context/useContext";

export const ProductCard = ({ data }) => {
  const navigate = useNavigate();
  const { currentUser } = useUserContext();
  console.log(currentUser);
  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0);
  };

  const [quantity] = useState(1);

  // const handleAddToCart = async (productId, quantity, productTitle, price, images) => {
  //     try {
  //         const response = await axios.post('https://ten-fashion.onrender.com/cartItem', { productId, quantity, productTitle, price, images })

  //         console.log('Added product to cart:', response.data);
  //     }
  //     catch (err) {
  //         console.error('Error adding product to cart:', err.message);
  //         console.log("Failed to add product to cart");
  //     }
  // }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-5">
      {data.map((datas, index) => (
        <div
          key={datas._id || index}
          className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <a href="#">
            <img
              onClick={() => handleViewProduct(datas._id)}
              className="p-8 rounded-t-lg h-[30rem] w-96 object-cover"
              src={datas.images || "https://placehold.co/600x400"}
              alt={`${datas.productTitle} image`}
            />
          </a>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {datas.productTitle}
              </h5>
            </a>

            {/* Rating Section */}
            <div className="flex items-center mt-2.5 mb-5">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                {/* Render stars based on rating */}
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${
                      star <= datas.rating ? "text-yellow-300" : "text-gray-200"
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                {datas.rating ? datas.rating.toFixed(1) : "No rating"}{" "}
                {/* Display the rating */}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ₹{datas.price}
              </span>
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    handleAddToCart(
                      datas._id,
                      quantity,
                      datas.productTitle,
                      datas.price,
                      datas.images
                    )
                  }
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to cart
                </button>
                <button
                  onClick={() => handleViewProduct(datas._id)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
