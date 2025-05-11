import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Order = (props) => {
  // Predefined menu items with actual image URLs, organized by category
  const menuItems = {
    breakfast: [
      { id: 1, name: "Pancakes", image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", variants: ["Classic", "Blueberry", "Chocolate Chip", "Banana"], price: 150 },
      { id: 2, name: "Eggs Benedict", image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", variants: ["Traditional", "Florentine", "Royale", "Avocado"], price: 180 },
      { id: 3, name: "Breakfast Burrito", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", variants: ["Veggie", "Bacon", "Chorizo", "Steak"], price: 200 },
      { id: 4, name: "Omelette", image: "https://images.unsplash.com/photo-1568625365131-079e026a927d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", variants: ["Cheese", "Western", "Mushroom & Spinach", "Mediterranean"], price: 160 },
      { id: 5, name: "French Toast", image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", variants: ["Cinnamon", "Stuffed", "Brioche", "Berry"], price: 170 }
    ],
    lunch: [
      { id: 6, name: "Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", variants: ["Classic Beef", "Chicken", "Veggie", "Mushroom Swiss", "BBQ Bacon"], price: 250 },
      { id: 7, name: "Sandwich", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", variants: ["Club", "BLT", "Grilled Cheese", "Reuben", "Tuna Melt"], price: 220 },
      { id: 8, name: "Salad", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", variants: ["Caesar", "Greek", "Cobb", "Garden", "Quinoa"], price: 180 },
      { id: 9, name: "Wrap", image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", variants: ["Chicken Caesar", "Falafel", "Turkey Club", "Veggie Hummus"], price: 210 },
      { id: 10, name: "Soup", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", variants: ["Tomato Basil", "Chicken Noodle", "Clam Chowder", "Minestrone"], price: 150 }
    ],
    dinner: [
      { id: 11, name: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", variants: ["Margherita", "Pepperoni", "Supreme", "BBQ Chicken", "Vegetarian"], price: 300 },
      { id: 12, name: "Pasta", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", variants: ["Spaghetti Bolognese", "Fettuccine Alfredo", "Penne Arrabiata", "Lasagna", "Carbonara"], price: 270 },
      { id: 13, name: "Noodles", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", variants: ["Pad Thai", "Lo Mein", "Ramen", "Udon", "Pho"], price: 260 },
      { id: 14, name: "Vegan Lasagna", image: "https://images.unsplash.com/photo-1619894991209-9f9694be045a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", variants: ["Classic", "Roasted Vegetable", "Spinach & Mushroom", "Zucchini"], price: 240 },
      { id: 15, name: "Steak", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", variants: ["Ribeye", "Sirloin", "T-Bone", "New York Strip", "Filet Mignon"], price: 350 }
    ]
  };

  const [selectedCategory, setSelectedCategory] = useState("breakfast");
  const [selectedDish, setSelectedDish] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [displayedItems, setDisplayedItems] = useState([]);
  const navigate = useNavigate();

  // Load initial dishes when category changes
  useEffect(() => {
    setDisplayedItems(menuItems[selectedCategory]);
    setSelectedDish(null);
    setSelectedVariant("");
  }, [selectedCategory]);

  const handleDishSelect = (dish) => {
    setSelectedDish(dish);
    setSelectedVariant("");
  };

  const handleVariantChange = (e) => {
    setSelectedVariant(e.target.value);
  };

  // Modified function to properly add to cart
  const placeOrder = async () => {
    if (!selectedDish || !selectedVariant) {
      alert("Please select both a dish and a variant");
      return;
    }

    // Store item in localStorage for the API call
    localStorage.setItem("order-item", selectedDish.name);
    
    // Prepare formatted dish name for API search
    const searchInputTxt = selectedDish.name.toLowerCase();
    
    try {
      // Make API call following original pattern
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`
      );
      
      const data = await res.json();
      
      if (data.meals) {
        // Process the found meal
        let meal = data.meals[0]; // Take the first result
        
        // Enhance meal data with our variant, category, price and quantity info
        meal = {
          ...meal,
          strVariant: selectedVariant,
          strCustomCategory: selectedCategory,
          price: selectedDish.price,
          quantity: 1 // Add initial quantity
        };
        
        // Pass the meal to the parent component
        props.make(meal);
        
        // Reset selection after successful order
        setSelectedVariant("");
        
        // Show confirmation
        alert(`Added ${selectedDish.name} - ${selectedVariant} to your order!`);
      } else {
        // Handle case when API doesn't find the meal
        // Fallback to using our local data if API fails
        const mealItem = {
          strMeal: selectedDish.name,
          strMealThumb: selectedDish.image,
          strVariant: selectedVariant,
          strCustomCategory: selectedCategory,
          price: selectedDish.price,
          quantity: 1
        };
        
        props.make(mealItem);
        setSelectedVariant("");
        alert(`Added ${selectedDish.name} - ${selectedVariant} to your order!`);
      }
    } catch (error) {
      console.error("Error fetching meal data:", error);
      
      // Fallback if API call fails completely
      const mealItem = {
        strMeal: selectedDish.name,
        strMealThumb: selectedDish.image,
        strVariant: selectedVariant,
        strCustomCategory: selectedCategory,
        price: selectedDish.price,
        quantity: 1
      };
      
      props.make(mealItem);
      setSelectedVariant("");
      alert(`Added ${selectedDish.name} - ${selectedVariant} to your order!`);
    }
  };

  // Custom color scheme
  const customColors = {
    primary: "#e67e22", // Amber color instead of blue
    secondary: "#d35400", // Darker amber for contrast
    cardBorder: "#f39c12", // Golden border for cards
    buttonText: "#fff" // White text on buttons
  };

  // Get the current orders from props
  const orders = props.orders || [];

  // Handle payment navigation
  const proceedToPayment = () => {
    navigate("/payment", { state: { orders } });
  };

  return (
    <div className="container mt-4">
      {/* Category Selection */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="btn-group w-100" role="group">
            <button 
              type="button" 
              className="btn"
              onClick={() => setSelectedCategory("breakfast")}
              style={{
                backgroundColor: selectedCategory === "breakfast" ? customColors.primary : "transparent",
                color: selectedCategory === "breakfast" ? customColors.buttonText : customColors.primary,
                borderColor: customColors.primary,
                fontWeight: "bold"
              }}
            >
              Breakfast
            </button>
            <button 
              type="button" 
              className="btn"
              onClick={() => setSelectedCategory("lunch")}
              style={{
                backgroundColor: selectedCategory === "lunch" ? customColors.primary : "transparent",
                color: selectedCategory === "lunch" ? customColors.buttonText : customColors.primary,
                borderColor: customColors.primary,
                fontWeight: "bold"
              }}
            >
              Lunch
            </button>
            <button 
              type="button" 
              className="btn"
              onClick={() => setSelectedCategory("dinner")}
              style={{
                backgroundColor: selectedCategory === "dinner" ? customColors.primary : "transparent",
                color: selectedCategory === "dinner" ? customColors.buttonText : customColors.primary,
                borderColor: customColors.primary,
                fontWeight: "bold"
              }}
            >
              Dinner
            </button>
          </div>
        </div>
      </div>

      {/* Menu Display */}
      <div className="row">
        {/* Dish Cards */}
        <div className="col-md-8">
          <div className="row">
            {displayedItems.map((dish) => (
              <div key={dish.id} className="col-md-6 mb-4">
                <div 
                  className="card" 
                  onClick={() => handleDishSelect(dish)}
                  style={{ 
                    cursor: "pointer",
                    border: selectedDish?.id === dish.id ? `2px solid ${customColors.cardBorder}` : "1px solid #ddd",
                    boxShadow: selectedDish?.id === dish.id ? `0 0 8px ${customColors.cardBorder}` : "none"
                  }}
                >
                  <img 
                    src={dish.image} 
                    className="card-img-top" 
                    alt={dish.name} 
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{dish.name}</h5>
                    <div className="d-flex justify-content-between">
                      <p className="card-text">₹{dish.price}</p>
                      <p className="card-text text-muted">Select for variants</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selection Panel */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header" style={{ backgroundColor: customColors.primary, color: customColors.buttonText }}>
              Your Selection
            </div>
            <div className="card-body">
              <h5 className="card-title">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Menu</h5>
              
              {selectedDish ? (
                <>
                  <div className="text-center mb-3">
                    <img 
                      src={selectedDish.image} 
                      alt={selectedDish.name} 
                      style={{ 
                        height: "120px", 
                        objectFit: "cover", 
                        borderRadius: "8px",
                        border: `2px solid ${customColors.cardBorder}`
                      }}
                    />
                  </div>
                  <p><strong>Selected Dish:</strong> {selectedDish.name}</p>
                  <p><strong>Price:</strong> ₹{selectedDish.price}</p>
                  
                  <div className="form-group">
                    <label htmlFor="variantSelect">Choose Variant:</label>
                    <select 
                      className="form-control" 
                      id="variantSelect"
                      value={selectedVariant}
                      onChange={handleVariantChange}
                      style={{ 
                        borderColor: customColors.primary,
                        color: customColors.secondary
                      }}
                    >
                      <option value="">Select a variant</option>
                      {selectedDish.variants.map((variant, index) => (
                        <option key={index} value={variant}>{variant}</option>
                      ))}
                    </select>
                  </div>
                  
                  <button 
                    className="btn mt-3 w-100" 
                    onClick={placeOrder}
                    disabled={!selectedVariant}
                    style={{ 
                      backgroundColor: selectedVariant ? customColors.primary : "#f8f9fa",
                      color: selectedVariant ? customColors.buttonText : "#6c757d",
                      borderColor: customColors.primary,
                      fontWeight: "bold"
                    }}
                  >
                    Add to Order
                  </button>
                </>
              ) : (
                <p className="text-muted">Please select a dish from the menu</p>
              )}
              
              {/* Proceed to Payment Button */}
              <button 
                className="btn mt-3 w-100" 
                onClick={proceedToPayment}
                disabled={orders.length === 0}
                style={{ 
                  backgroundColor: orders.length > 0 ? customColors.primary : "#f8f9fa",
                  color: orders.length > 0 ? customColors.buttonText : "#6c757d",
                  borderColor: customColors.primary,
                  fontWeight: "bold"
                }}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;