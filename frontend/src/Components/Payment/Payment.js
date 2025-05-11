import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const orders = location.state?.orders || []; // Get orders from navigation state
  const [cartItems, setCartItems] = useState(
    orders.map((order) => ({
      ...order,
      quantity: order.quantity || 1, // Initialize quantity if not present
    }))
  );

  // Function to update item quantity
  const updateQuantity = (index, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(item.quantity + delta, 0) }
          : item
      )
    );
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = 50;
  const grandTotal = totalPrice + shippingCost;

  return (
    <>
      <br />
      <br />
      <div className="card-pay">
        <div className="row">
          <div className="col-md-8 cart">
            <div className="title">
              <div className="row">
                <div className="col">
                  <h4>
                    <b>Shopping Cart</b>
                  </h4>
                </div>
                <div className="col align-self-center text-right text-muted">
                  {cartItems.length} items
                </div>
              </div>
            </div>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item, index) => (
                <div
                  className="row border-top border-bottom"
                  key={index}
                >
                  <div className="row main-pay align-items-center">
                    <div className="col">
                      <div className="row text-muted">{item.strCustomCategory}</div>
                      <div className="row">
                        {item.strMeal} - {item.strVariant}
                      </div>
                    </div>
                    <div className="col">
                      <a
                        href="#"
                        onClick={() => updateQuantity(index, -1)}
                      >
                        -
                      </a>
                      <a href="#" className="border">
                        {item.quantity}
                      </a>
                      <a
                        href="#"
                        onClick={() => updateQuantity(index, 1)}
                      >
                        +
                      </a>
                    </div>
                    <div className="col">
                      ₹ {item.price * item.quantity} <span className="close">✕</span>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div className="back-to-shop">
              <a href="/">
                <span className="text-muted">Back to shop</span>
              </a>
            </div>
          </div>
          <div className="col-md-4 summary">
            <div>
              <h5>
                <b>Summary</b>
              </h5>
            </div>
            <hr />
            <div className="row">
              <div className="col" style={{ paddingLeft: 0 }}>
                Items ({cartItems.length})
              </div>
              <div className="col text-right">₹ {totalPrice}</div>
            </div>
            <form className="form-pay">
              <p>SHIPPING</p>
              <select>
                <option className="text-muted">Standard-Delivery- ₹ {shippingCost}.00</option>
              </select>
              <p>GIVE CODE</p>
              <input id="code" placeholder="Enter your code" />
            </form>
            <div
              className="row"
              style={{
                borderTop: "1px solid rgba(0,0,0,.1)",
                padding: "2vh 0",
              }}
            >
              <div className="col">TOTAL PRICE</div>
              <div className="col text-right">₹ {grandTotal}.00</div>
            </div>
            <button className="btn-pay">CHECKOUT</button>
          </div>
        </div>
      </div>
      <br />
      <br />
    </>
  );
};

export default Payment;