import { useContext } from "react";
import axios from "axios";

import {
  CartContext,
} from "../context/CartContext";

export default function Cart() {

  const {
    cart,
    removeFromCart,
  } = useContext(CartContext);

  // TOTAL PRICE
  const total = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  // PAYMENT
  const paymentHandler = async () => {

    try {

      // CREATE ORDER FROM BACKEND
      const { data } = await axios.post(
        "http://localhost:4000/api/payment/order",
        {
          amount: total,
        }
      );

      const options = {

        key: "rzp_test_yourkey",

        amount: data.amount,

        currency: data.currency,

        order_id: data.id,

        name: "Amazon Store",

        description: "Test Payment",

        image:
          "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",

        handler: function (response) {

          alert("Payment Successful ✅");

          console.log(response);

        },

        prefill: {

          name: "Divya",

          email: "test@gmail.com",

          contact: "9999999999",

        },

        theme: {
          color: "#000",
        },

      };

      const razor =
        new window.Razorpay(options);

      razor.open();

    } catch (error) {

      console.log(error);

      alert("Payment Failed");

    }

  };

  return (
    <div className="cart">

      <h1>Cart Items</h1>

      {cart.map((item) => (

        <div
          className="cart-card"
          key={item._id}
        >

          <img
            src={item.image}
            alt={item.title}
            width="120"
          />

          <div>

            <h3>{item.title}</h3>

            <p>₹{item.price}</p>

            <p>
              Quantity:
              {item.quantity}
            </p>

            <button
              onClick={() =>
                removeFromCart(
                  item._id
                )
              }
            >
              Remove
            </button>

          </div>

        </div>

      ))}

      <h2>Total: ₹{total}</h2>

      <button
        onClick={paymentHandler}
      >
        Proceed To Payment
      </button>

    </div>
  );
}