import React from "react";
import { useShoppingCard } from "../ShoppingContext/ShoppingCardContext";
import { Link } from "react-router-dom";

export default function CartsDetails() {
  const {
    cardItems,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItemFromCard,
  } = useShoppingCard();

  // حساب الإجمالي بدون تكرار الشحن لكل منتج
  const totalPrice = cardItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = cardItems.length > 0 ? 30 : 0; // الشحن يُحسب مرة واحدة إذا كان هناك منتجات

  return (
    <div className="pt-5">
      <h2 className="fw-bold pb-2">Cart Details:</h2>

      {cardItems.length === 0 ? (
        <div className="m-auto text-center bg-warning fs-2 fw-bold">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          {cardItems.map((item) => (
            <div className="card w-100 mb-3" key={item.id}>
              <div className="card-header">
                <h2> Item List</h2>
              </div>

              <img className="w-25" src={item.image} alt={item.title} />
              <h5>{item.title}</h5>
              <p className="fw-bold">Price: ${item.price}</p>

              <div className="d-flex align-items-center ">
                <button
                  className="btn btn-dark"
                  onClick={() => increaseItemQuantity(item.id)}
                >
                  +
                </button>
                <div className="fs-2 p-3">{item.quantity}</div>
                <button
                  className="btn btn-warning"
                  onClick={() => decreaseItemQuantity(item.id)}
                >
                  -
                </button>
                <button
                  className="btn btn-danger m-1"
                  onClick={() => removeItemFromCard(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Order Summary في أسفل الصفحة بعد كل المنتجات */}
          <div className="card mt-4 mb-5">
            <div className="card-header">
              <h3 className="fw-bold">Order Summary</h3>
            </div>

            <div className="p-2">
              <div className="d-flex justify-content-between">
                <p>Products:</p> <p>{cardItems.length}</p>
              </div>
              <div className="d-flex justify-content-between ">
                <p>Shipping:</p> <p>${shipping}</p>
              </div>
              <div className="d-flex justify-content-between fw-bold">
                <p>Total Price:</p> <p>${(totalPrice + shipping).toFixed(2)}</p>
              </div>
              <Link to="/checkout">
           
              <div className="text-center">
                  <button className="btn btn-lg btn-dark ">Go to checkout</button>
              </div>
               </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
