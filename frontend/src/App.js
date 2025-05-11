import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"; // Ensure correct path
import Home from "./Components/Home/Home";
import Contact from "./Components/Contact";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Logout from "./Components/User/Logout";
import { createContext, useReducer, useState } from "react";
import { initialState, reducer, CartContext } from "./Components/Usereducer"; // Adjust path if needed
import MakeOrder from "./Components/Orders/MakeOrder";
import Payment from "./Components/Payment/Payment";

// Create a context for user state
export const userContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState); // Use the reducer directly
  const [cart, setCartState] = useState(0);

  return (
    <>
      <userContext.Provider value={{ state, dispatch }}>
        <CartContext.Provider value={{ cart, setCartState }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<MakeOrder />} />
            <Route path="/about" element={<About />} />
            <Route path="/logout" element={<Logout />} />
            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </CartContext.Provider>
      </userContext.Provider>
    </>
  );
}

export default App;
