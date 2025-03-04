import React from "react";
import { useShoppingCard } from "../ShoppingContext/ShoppingCardContext";

export default function Checkout() {
  const { cardItems } = useShoppingCard();
  const totalPrice = cardItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = cardItems.length > 0 ? 30 : 0; // الشحن يُحسب مرة واحدة إذا كان هناك منتجات

  return (
    <div className="container pt-5">
      <h2 className="text-center fw-bold">Checkout</h2>
      <div className="border border-bottom-1 border-black"></div>
      <div className="row">
        <div className="col-md-3 mt-4">
          <div className="card mt-4">
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
            </div>
          </div>
        </div>
        <div className="col-md-9 mt-5">
          <div className="card">
            <div className="card-header">
              <h3 className="fw-bold">Billing address</h3>
            </div>
            <form className="p-3">
          <div className="row d-flex ">
            <div className="col-md-6">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input type="text" className="form-control" id="firstName" required />
            </div>
            <div className="col-md-6">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="lastName" required />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" id="address" required />
          </div>
          <div className="mb-3">
            <label htmlFor="address2" className="form-label">Address 2 (Optional)</label>
            <input type="text" className="form-control" id="address2" />
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="country" className="form-label">Country</label>
              <select className="form-select" id="country" required>
                <option value="">Choose...</option>
                <option>United States</option>
                <option>Egypt</option>
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="state" className="form-label">State</label>
              <select className="form-select" id="state" required>
                <option value="">Choose...</option>
                <option>Cairo</option>
                <option>Giza</option>
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="zip" className="form-label">Zip</label>
              <input type="text" className="form-control" id="zip" required />
            </div>
          </div>
          
          <h4 className="mt-4">Payment</h4>
          <div className="mb-3">
            <label htmlFor="cardName" className="form-label">Name on Card</label>
            <input type="text" className="form-control" id="cardName" required />
          </div>
          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">Credit Card Number</label>
            <input type="text" className="form-control" id="cardNumber" required />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="expiration" className="form-label">Expiration</label>
              <input type="text" className="form-control" id="expiration" required />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="cvv" className="form-label">CVV</label>
              <input type="text" className="form-control" id="cvv" required />
            </div>
          </div>
          
          <button type="submit" className="btn btn-dark w-100 mt-3 fw-bold">Continue to checkout</button>
        </form>
          </div>
        </div>
           
       
      </div>
    </div>
  );
}
