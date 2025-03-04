import React, { createContext, useContext, useState } from "react";

export const CardContext = createContext();

export const useCardContext = () => {
  return useContext(CardContext);
};

export default function CardContextProvider({ children }) {
  const [cardItems, setCardItems] = useState([]);

  return (
    <CardContext.Provider value={{ cardItems, setCardItems }}>
      {children}
    </CardContext.Provider>
  );
}
