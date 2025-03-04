import React, { createContext, useContext, useState } from "react";

export const shoppingCardContext = createContext({});
// use createContext as a function
export const useShoppingCard = () => {
  return useContext(shoppingCardContext);
};

export default function ShoppingCardProvider(props) {
  let [cardItems, setCardItems] = useState([]);
  const addToCart = (product) => {
    setCardItems((prevItems) => {
      const existingItem = prevItems.find((item) =>
         item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? 
        { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };
  //func to get itemQuantity
  const getIyemsQuantity = (id) => {
    
    return cardItems.find((itme) => itme.id === id)?.quantity || 0;
  };
  // func to increase item
  const increaseItemQuantity = (id, title, image, price) => {
    setCardItems((currentItem) => {
      if (currentItem.find((item) => item.id === id) == null) {
       
        return [...currentItem, { id, title, image, price, quantity: 1 }];
      } else {
        return currentItem.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
    });
  };

  const decreaseItemQuantity  = (id) => {
    setCardItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // بتشيل المنتجات اللي الكمية بتاعتها بقت صفر
    );
  };
  
  // func to remove items
  const removeItemFromCard = (id) => {
    setCardItems((currentItem) => currentItem.filter((item) => item.id !== id));
  };
  const getTotalItemsQuantity = () => {
    return cardItems.reduce((total, item) => total + item.quantity, 0);
  };
  return (
    <shoppingCardContext.Provider
      value={{
        cardItems,
        addToCart,
        getIyemsQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItemFromCard,
        getTotalItemsQuantity,
      }}
    >
      {props.children}

    </shoppingCardContext.Provider>
  );
}
