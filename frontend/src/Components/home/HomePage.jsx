import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProductCard } from "../ProductCard";
import HeroCarousel from "../HeroCaraousel/HeroCaraousel";

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  console.log(products);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      <HeroCarousel />
      <div>
        <h1 className="text-4xl text-center pt-8 pb-4">Featured Products</h1>
        <ProductCard data={products} />
      </div>
    </div>
  );
};
