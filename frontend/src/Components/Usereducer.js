import { createContext } from "react";

// Create the context for the cart
export const CartContext = createContext(); // Renamed to avoid confusion with the variable
export default CartContext; // Export the context

export const initialState = null;

// Define the reducer
export const reducer = (state, action) => {
  if (action.type === 'USER') {
    return action.payload;
  }
  return state;   
};
