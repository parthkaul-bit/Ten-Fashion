import { useContext, useEffect, useState } from "react";
import HeroImage from "../../assets/images/productDetails/product_details_hero.jpg";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { handleAddToCart } from "../../../utils/utils";
import { ProductCard } from "../ProductCard";
import { useUserContext } from "../../context/useContext";
import {
  addToWishlist,
  removeFromWishlist,
  fetchWishlist,
} from "../../../utils/wishlist";

function ProductDetails() {
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const [prodId, setProdId] = useState(null);
  const [productData, setProductData] = useState([]);
  const [allProductData, setAllProductData] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const { currentUser } = useUserContext();
  const data = productData.filter((data) => data._id === prodId);
  console.log(data[0]);

  const { id } = useParams();

  useEffect(() => {
    const checkWishlist = async () => {
      if (currentUser?._id) {
        try {
          const wishlist = await fetchWishlist(currentUser._id);
          const IsProductInWishList = wishlist.some(
            (item) => item._id === prodId
          );
          setIsInWishlist(IsProductInWishList);
        } catch (error) {
          console.error("failed to fecth wishlist:", error);
        }
      }
    };

    checkWishlist();
  }, [currentUser, prodId]);

  useEffect(() => {
    if (id) {
      setProdId(id);
    }
  }, [id]);

  console.log(prodId);

  const toggleHeart = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleWishlistToggle = async () => {
    setLoading(true);
    try {
      if (isInWishlist) {
        await removeFromWishlist(currentUser._id, prodId);
        console.log("Removed from wishlist", "success");
      } else {
        await addToWishlist(currentUser._id, prodId);
        console.log("Added to wishlist", "success");
      }
      setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.log("Failed to update wishlist", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!prodId) return;
      try {
        const response = await axios.get(
          `https://ten-fashion.onrender.com/api/product/${prodId}`
        );
        setProductData([response.data]);
      } catch (error) {
        console.error("Failed to fetch product details", error);
      }
    };

    fetchData();
  }, [prodId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://ten-fashion.onrender.com/api/products`
        );
        setAllProductData(response.data);
      } catch (error) {
        console.error("Failed to fetch product details", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-[auto]">
      {/* Main Header Section */}
      <div
        className="w-full h-[180px] bg-center bg-cover flex items-center justify-center md:items-center text-center"
        style={{
          backgroundImage: `url(${HeroImage})`,
        }}
      >
        <h1 className="w-auto text-white text-2xl font-bold">TEN - Fashion</h1>
      </div>

      {/* About Product Details Section */}
      <div className="w-[80%] mx-auto py-10 flex justify-center gap-10 max-xl:w-[95%] max-md:flex-wrap">
        {/* Thumbnails */}
        {/* <div className="w-[10%] max-md:w-[15%]">
          {images.map((image, index) => (
            <img
              key={index}
              className="w-[60%] pb-4 cursor-pointer"
              src={image}
              alt={`Strawberry Short Image ${index + 1}`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div> */}

        {/* Display Selected Image */}
        <div className="w-[45%] max-md:w-[80%]">
          <img
            className="w-[100%] h-[90%] object-contain"
            src={data[0]?.images}
            alt="Selected Strawberry Short"
          />
        </div>

        {/* Product Information */}
        <div className="w-[45%] px-8 flex flex-col justify-center max-xs:w-[100%]">
          <h1 className="text-4xl font-semibold">{data[0]?.productTitle}</h1>
          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {/* Render stars based on rating */}
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-4 h-4 ${
                    star <= data[0]?.rating
                      ? "text-yellow-300"
                      : "text-gray-200"
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
              {data[0]?.rating ? data[0]?.rating.toFixed(1) : "No rating"}{" "}
              {/* Display the rating */}
            </span>
          </div>
          <div className="mt-10 ml-2 flex max-md:mt-5">
            <div>
              {/* <h1>Product code</h1> */}
              <h1>Availability</h1>
            </div>
            <div className="pl-8 font-semibold">
              {/* <h1>CJNSXZDK02347</h1> */}
              <h1 className="text-green-500">In Stock</h1>
            </div>
          </div>

          <h1 className="mt-8 ml-2 text-4xl font-medium max-md:mt-4">
            ₹{data[0]?.price}
          </h1>

          <div className="mt-16 ml-2 flex justify-between max-xl:flex-wrap max-md:mt-8 max-md:gap-4">
            <div className="w-[25%] flex justify-center border border-gray-300 items-center rounded-3xl max-md:w-[100%]">
              <button
                className="py-2"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                -
              </button>
              <h1 className="px-4">{quantity}</h1>
              <button
                className="py-2"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              className="w-[70%] flex justify-center bg-black text-white font-bold border border-black py-3 rounded-3xl hover:bg-white hover:text-black max-md:w-[100%]"
              onClick={() =>
                handleAddToCart(
                  data[0]?._id,
                  quantity,
                  data[0]?.productTitle,
                  data[0]?.price,
                  data[0]?.images
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l1.1-6H6.5m-3.5 6L4 3m4.5 10L5 21h14l1.5-8m-13.5 8h10"
                />
              </svg>
              Add to basket
            </button>
          </div>

          <Link to="/cart">
            <button
              onClick={() =>
                handleAddToCart(
                  data[0]?._id,
                  quantity,
                  data[0]?.productTitle,
                  data[0]?.price,
                  data[0]?.images
                )
              }
              className="w-[100%] ml-2 mt-10 py-3 font-bold border border-black rounded-3xl hover:bg-black hover:text-white max-md:mt-5"
            >
              Buy it now
            </button>
          </Link>

          <div className="mt-10 ml-3 flex items-center max-md:mt-5 max-md:flex-col max-md:items-start">
            <button
              className={`w-full py-3 rounded-lg transition flex items-center gap-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleWishlistToggle}
              disabled={loading}
            >
              {isInWishlist ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="red"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  Remove from Wishlist
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  Add to Wishlist
                </>
              )}
            </button>
          </div>

          {/* <div className="w-[10%] mt-10 flex gap-4">
            <img src={Facebook} alt="Facebook Logo" />
            <img src={Linkedin} alt="Linkedin Logo" />
          </div> */}
        </div>
      </div>

      {/* More About Products */}
      <div className="w-[80%] mx-auto max-xl:w-[95%]">
        {/* Tab Navigation */}
        <div className="flex justify-center gap-10 text-2xl font-medium max-xs:flex-wrap max-xs:text-xl max-xs:gap-5">
          {/* {[
            "Description",
            // "Additional Information",
            // "Reviews",
            // "Custom Tab",
          ].map((tab) => (
            <h1
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer ${
                activeTab === tab ? "text-blue-600 underline" : ""
              }`}
            >
              {tab}
            </h1>
          ))} */}
          <h1 className="text-4xl mb-3">Product description</h1>
        </div>
        <hr className="w-full mx-auto m-4 h-0.5 bg-gray-600" />

        {/* Tab Content */}
        <div className="w-[100%] mx-auto py-5 ml-2">
          {/* {activeTab === "Description" && ( */}
          <div>
            <ul className="text-lg">
              <li>{`Category: ${data[0]?.category}`}</li>
              <li>
                {data[0]?.productDescription
                  .split(".")
                  .map((sentence) => sentence.trim())
                  .filter((sentence) => sentence)
                  .map((line, index) => (
                    <p className="my-3" key={index}>
                      {line}.
                    </p>
                  ))}
              </li>
            </ul>
          </div>
          {/* )} */}
          {/* {activeTab === "Additional Information" && (
            <div>
              <table className="border table-auto w-full empty-cells:show">
                <tbody>
                  <tr>
                    <th className="border-b border-solid px-[20px] py-[12px] text-left">
                      Weight
                    </th>
                    <td className="border-b border-solid px-[20px] py-[12px] text-left">
                      0.22 kg
                    </td>
                  </tr>
                  <tr>
                    <th className="border-b border-solid px-[20px] py-[12px] text-left">
                      Dimensions
                    </th>
                    <td className="border-b border-solid px-[20px] py-[12px] text-left">
                      200 x 200 x 40 cm
                    </td>
                  </tr>
                  <tr>
                    <th className="border-b border-solid px-[20px] py-[12px] text-left">
                      Size
                    </th>
                    <td className="border-b border-solid px-[20px] py-[12px] text-left">
                      L, M, S
                    </td>
                  </tr>
                  <tr>
                    <th className="border-b border-solid px-[20px] py-[12px] text-left">
                      Color
                    </th>
                    <td className="border-b border-solid px-[20px] py-[12px] text-left">
                      Dark Blue, Light Blue
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "Reviews" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Reviews</h2>
              <p>
                See what others are saying about this product or service in this
                section.
              </p>
            </div>
          )}
          {activeTab === "Custom Tab" && (
            <div>
              <table className="border table-auto w-full empty-cells:show">
                <tbody>
                  <tr>
                    <th className="border-b border-solid px-[20px] py-[15px] text-left leading-[20px]">
                      Product Dimensions
                    </th>
                    <td className="border-b border-solid px-[20px] py-[15px] text-left leading-[20px]">
                      17.32 x 13.39 x 2.36 inches; 1.5 Pounds
                    </td>
                  </tr>
                  <tr>
                    <th className="border-b border-solid px-[20px] py-[15px] text-left leading-[20px]">
                      Item model number
                    </th>
                    <td className="border-b border-solid px-[20px] py-[15px] text-left leading-[20px]">
                      YGZ53PUBLACKS
                    </td>
                  </tr>
                  <tr>
                    <th className="border-b border-solid px-[20px] py-[15px] text-left leading-[20px]">
                      Department
                    </th>
                    <td className="border-b border-solid px-[20px] py-[15px] text-left leading-[20px]">
                      Womens
                    </td>
                  </tr>
                  <tr>
                    <th className="border-b border-solid px-[20px] py-[15px] text-left leading-[20px]">
                      Date First Available
                    </th>
                    <td className="border-b border-solid px-[20px] py-[15px] text-left leading-[20px]">
                      July 22, 2017
                    </td>
                  </tr>
                  <tr>
                    <th className="border-b border-solid px-[20px] py-[15px] text-left leading-[20px]">
                      Manufacturer
                    </th>
                    <td className="border-b border-solid px-[20px] py-[15px] text-left leading-[20px]">
                      Sample
                    </td>
                  </tr>
                  <tr>
                    <th className="border-b border-solid px-[20px] py-[15px] text-left leading-[20px]">
                      Raking
                    </th>
                    <td className="border-b border-solid px-[20px] py-[15px] text-left leading-[20px]">
                      #17,785 in Clothing
                    </td>
                  </tr>
                </tbody>
              </table> */}
          {/* </div>
          )} */}
        </div>
        <hr className="w-full mx-auto m-10 h-0.5 bg-gray-600" />
      </div>
      <h1 className="text-4xl flex justify-center">More Items for Buy</h1>
      <hr className="w-[80%] mx-auto m-10 h-[1px] bg-gray-600" />
      <div className="flex justify-center">
        <ProductCard data={allProductData} />
      </div>
    </div>
  );
}

export default ProductDetails;
