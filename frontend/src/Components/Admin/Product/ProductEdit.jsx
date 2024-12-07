import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const StarRating = ({ rating, onChange }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleClick = (newRating) => {
    onChange(newRating);
  };

  const handleMouseEnter = (index) => {
    setHoveredRating(index);
  };

  const handleMouseLeave = () => {
    setHoveredRating(rating);
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= rating;
        const isHovered = star <= hoveredRating;
        return (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            aria-label={`Rate ${star} out of 5`}
            className={`text-2xl ${
              isFilled || isHovered ? "text-yellow-600" : "text-gray-300"
            }`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [categories] = useState(["Men", "Women", "Children"]);
  const [subCategories] = useState({
    Men: ["Jeans", "Shirts", "T-Shirts"],
    Women: ["Dresses", "Tops", "Skirts"],
    Children: ["Shorts", "Sleeveless Shirts", "Trousers"],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://ten-fashion.onrender.com/api/product/${id}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("productTitle", formData.productTitle);
      form.append("price", formData.price);
      form.append("productDescription", formData.productDescription);
      form.append("category", formData.category);
      form.append("subCategory", formData.subCategory);
      form.append("rating", formData.rating);

      if (formData.image) {
        form.append("images", formData.image);
      }

      await axios.put(`https://ten-fashion.onrender.com/api/product/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error.response || error);
      setError("Failed to update the product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!formData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Product</h2>
      {loading && <p className="text-center text-blue-500">Updating...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Title */}
        <div className="flex flex-col">
          <label htmlFor="productTitle" className="font-medium text-gray-700">
            Product Title:
          </label>
          <input
            id="productTitle"
            type="text"
            name="productTitle"
            value={formData.productTitle}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-900"
            required
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label htmlFor="price" className="font-medium text-gray-700">
            Price:
          </label>
          <input
            id="price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-900"
            required
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col">
          <label
            htmlFor="productDescription"
            className="font-medium text-gray-700"
          >
            Product Description:
          </label>
          <textarea
            id="productDescription"
            name="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-900"
            rows="4"
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <label htmlFor="image" className="font-medium text-gray-700">
            Product Image:
          </label>
          <input
            id="image"
            type="file"
            name="image"
            onChange={handleFileChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-900"
          />
        </div>

        {/* Category Selection */}
        <div className="flex flex-col">
          <label htmlFor="category" className="font-medium text-gray-700">
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-900"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Selection */}
        <div className="flex flex-col">
          <label htmlFor="subCategory" className="font-medium text-gray-700">
            Subcategory:
          </label>
          <select
            id="subCategory"
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-900"
            required
          >
            <option value="">Select a subcategory</option>
            {formData.category &&
              subCategories[formData.category]?.map((subCat) => (
                <option key={subCat} value={subCat}>
                  {subCat}
                </option>
              ))}
          </select>
        </div>

        {/* Star Rating */}
        <div className="flex flex-col">
          <label htmlFor="rating" className="font-medium text-gray-700">
            Rating:
          </label>
          <StarRating
            rating={formData.rating}
            onChange={(newRating) =>
              setFormData((prevData) => ({ ...prevData, rating: newRating }))
            }
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
