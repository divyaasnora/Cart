import { Link } from "react-router-dom";

import { useContext } from "react";

import {
  CartContext,
} from "../context/CartContext";

export default function Navbar() {

  const { cart } =
    useContext(CartContext);

  return (
    <div className="navbar">

      <h2>Amazon</h2>

      <div className="links">

        <Link to="/">
          Home
        </Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/cart">
          🛒 Cart ({cart.length})
        </Link>

      </div>

    </div>
  );
}