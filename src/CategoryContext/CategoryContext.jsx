import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const categorieContext = createContext('');



export default function CategoryProvider(props) {
  let [categories, setCategories] = useState([]);
  let[menClothing , setMenClothing]=useState([]); 
  let[womenClothing , setWoenClothing]=useState([]); 
  let[jewelry , setJewelry]=useState([]); 
  let[electronics , setElectronics]=useState([]); 
  const baseUrl = "https://fakestoreapi.com/products/";


  async function getCategoties(endPoint , callBack) {
 
    let response = await axios.get(`${baseUrl}${endPoint}`);
    callBack(response.data);
   
   
  }

  useEffect(() => {
    getCategoties("",setCategories);
    getCategoties("category/men's clothing",setMenClothing);
    getCategoties("category/women's clothing",setWoenClothing);
    getCategoties("category/jewelery",setJewelry);
    getCategoties("category/electronics",setElectronics);
  
  }, []);
  return (
    <>
      <categorieContext.Provider value={{ categories ,menClothing , womenClothing , jewelry , electronics  }}>
        {props.children}
      </categorieContext.Provider>
    </>
  );
}
