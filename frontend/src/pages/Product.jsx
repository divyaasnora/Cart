import { useEffect, useState } from "react";

import axios from "axios";

import ProductCard from "../components/ProductCard";

export default function Products() {

  const [products, setProducts] =
    useState([]);


  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        "http://localhost:4000/api/products"
      );

      setProducts(res.data);

    } catch (error) {

      console.log(error);

    }

  };


  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <div className="products">

      {products.map((product) => (

        <ProductCard
          key={product._id}
          product={product}
        />

      ))}

    </div>
  );
}