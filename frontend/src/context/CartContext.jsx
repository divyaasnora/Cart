import {
  createContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

export const CartContext =
  createContext();

export const CartProvider = ({
  children,
}) => {

  const [cart, setCart] = useState([]);


  // FETCH CART
  const fetchCart = async () => {

    try {

      const res = await axios.get(
        "http://localhost:4000/api/cart"
      );

      setCart(res.data);

    } catch (error) {

      console.log(error);

    }

  };


  // ADD TO CART
  const addToCart = async (
    product
  ) => {

    try {

      await axios.post(
        "http://localhost:4000/api/cart/add",
        product
      );

      fetchCart();

      alert("Added To Cart");

    } catch (error) {

      console.log(error);

    }

  };


  // DELETE ITEM
  const removeFromCart = async (
    id
  ) => {

    try {

      await axios.delete(
        `http://localhost:4000/api/cart/${id}`
      );

      fetchCart();

    } catch (error) {

      console.log(error);

    }

  };


  useEffect(() => {
    fetchCart();
  }, []);


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};