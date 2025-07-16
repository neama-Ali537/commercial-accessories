import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useShoppingCard } from "../ShoppingContext/ShoppingCardContext";

export default function Navbar({ userData, logout }) {
  const { getTotalItemsQuantity } = useShoppingCard();
  const totalItems = getTotalItemsQuantity();
  return (
    <nav className="navbar navbar-expand-lg  position-fixed end-0 start-0 z-3 ">
      <div className="container-fluid ">
        <h2 className="navbar-brand ms-5 text-light fs-2 fw-bold">
          E-Commerce
        </h2>

        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <div className="d-flex justify-content-between align-items-center w-100">
            <ul className="navbar-nav m-auto  mb-2 mb-lg- ">
              {userData ? (
                <>
                  <li className="nav-item ">
                    <Link
                      className=" text-light text-decoration-none me-3 fw-bold"
                      to={"home"}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="text-light text-decoration-none me-3 fw-bold"
                      to={"profile"}
                    >
                      User Profile
                    </Link>
                  </li>
                 
                  <li onClick={logout} className="nav-item">
                    <Link className=" text-light text-decoration-none me-3 fw-bold ">
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="text-light text-decoration-none me-3 fw-bold"
                      to={"/"}
                    >
                      Rigester
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="text-light text-decoration-none me-3 fw-bold"
                      to={"login"}
                    >
                      Log-In
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <input
              type="text"
              className="form-control me-3"
              placeholder="Search..."
              style={{ width: "200px" }}
            />

            <Link to={"cardsDetails"}>
              <div className="d-flex align-items-center justify-content-between">
                <div className=" bg-secondary rounded-circle ">
                  <button className="btn btn-light ">
                    <FontAwesomeIcon
                      className="text-light pointer text-dark-emphasis"
                      icon={faShoppingCart}
                      size="lg"
                    />
                    {totalItems > 0 && (
                      <span className="totalQuantity p-2 text-dark-emphasis">Cart:({totalItems})</span>
                    )}
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
