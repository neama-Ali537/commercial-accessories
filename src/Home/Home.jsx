import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { categorieContext } from "../CategoryContext/CategoryContext";
// import { cardCounter } from "../CardContext/CardContext";
import formatCurrency from "../PriceType/FormateCurrencyPrice";
import { useShoppingCard } from "../ShoppingContext/ShoppingCardContext";

export default function Home({id , price , name , image}) {
  const { categories, menClothing, womenClothing, jewelry, electronics } =
    useContext(categorieContext);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  
  // استخدام useEffect لتحديث حالة التحميل بعد تحميل الفئات
  useEffect(() => {
    if (categories.length > 0) {
      setLoading(false);
    }
  }, [categories]);
  // use ShoppingCardContext to add functionality in card

  const {
    cardItems,
    addToCart,
   
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItemFromCard,
  } = useShoppingCard();


  //////////////////////////////////////////
  const getFilterData = () => {
    switch (currentCategory) {
      case "Men's Clothing":
        return menClothing;

      case "Women's Clothing":
        return womenClothing;

      case "Jewelry":
        return jewelry;

      case "Electronics":
        return electronics;

      default:
        return categories;
    }
  };
  // get a copy from function:
  const filterData = getFilterData();
  return (
    <>
      <div className="container ">
       
        <div className="row d-flex justify-content-evenly">
          <div className="logo-home col-md-12 col-sm-12 d-flex justify-content-center align-content-center">
            <div className="logo-girl">
              <img className="w-100 pointer" src="/imgs/girl2.webp" alt="" />
            </div>
            <div className="logo-boy">
              <img className="w-100 pointer" src="/imgs/boy2.webp" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="heading m-auto text-center">
        <h2 className=" ">Latest Products</h2>
        <div className="line"></div>
      </div>
      <div className="componamts d-flex justify-content-center">
        <button
          onClick={() => setCurrentCategory("All")}
          className="btn1 btn btn-light border border-2  m-2"
        >
          All
        </button>

        <button
          onClick={() => setCurrentCategory("Men's Clothing")}
          className="btn2 btn btn-light border border-2 m-2"
        >
          Men's Clothig
        </button>
        <button
          onClick={() => setCurrentCategory("Women's Clothing")}
          className="btn3 btn btn-light border border-2 m-2"
        >
          Women's Clothig
        </button>
        <button
          onClick={() => setCurrentCategory("Jewelry")}
          className="btn4 btn btn-light border border-2 m-2"
        >
          Jeweley
        </button>
        <button
          onClick={() => setCurrentCategory("Electronics")}
          className="btn5 btn btn-light border border-2 m-2"
        >
          Electronics
        </button>
      </div>
      {/* تعديل عرض الفئات */}

      <div className="container">
        <div className="row m-auto ">
          {loading ? (
            <div className="col-12 text-center">
              <i className="fas fa-spinner fa-spin fa-3x"></i>
            </div>
          ) : (
            filterData.map((category) => {
              // let quantity = getIyemsQuantity(category.id);
              let quantity = cardItems.find((item)=> item.id === category.id)?.quantity || 0;
              return (
                <>
                  <div
                    key={category.id}
                    className="card col-md-4 col-sm-12 p-2 m-auto"
                    style={{
                      width: "18rem",
                    }}
                  >
                    <div className="category w-100 m-auto text-center">
                      <Link
                        to={`/product/${category.id}`}
                        className="text-decoration-none text-dark"
                      >
                        <img
                          src={category.image}
                          className="card-img-top w-75 "
                          alt={category.title}
                        />
                      </Link>
                      <div className="card-body text-center">
                        <h5 className="card-title fw-bold ">
                          {category.title.split(" ").slice(0, 3).join(" ")}
                        </h5>
                        <p className="card-text lead text-center">
                          {category.description
                            .split(" ")
                            .slice(0, 10)
                            .join(" ")}
                          ...
                        </p>
                        <p className="border border-1 border-black">
                          {formatCurrency(category.price)}
                        </p>
                        <div className="buttons d-flex justify-content-evenly align-items-center">
                          {quantity === 0 ? (
                            <button
                              onClick={() => addToCart(category)}
                              className="btn btn-dark"
                            >
                              Add to Card
                            </button>
                          ) : (
                            <>
                              <div className="d-flex flex-column align-items-center gap-2">
                                <div className="d-flex align-items-center gap-2">
                                  <button
                                   onClick={() => increaseItemQuantity(category.id , category.title, category.image, category.price )}
                                    className="btn btn-info"
                                  >
                                    +
                                  </button>
                                  <span>{quantity} in cart</span>
                                  <button
                                    onClick={() =>
                                      decreaseItemQuantity(category.id)
                                    }
                                    className="btn btn-warning"
                                  >
                                    -
                                  </button>
                                </div>
                                <button
                                  onClick={() =>
                                    removeItemFromCard(category.id)
                                  }
                                  className="btn btn-danger w-100"
                                >
                                  Remove
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  ;
                </>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
