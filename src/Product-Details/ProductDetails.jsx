import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetails() {
  let { id } = useParams(); // قراءة المعرف من الرابط
  let [productDetails, setProductDetails] = useState(null);
  let [loading, setLoading] = useState(true);

  // جلب تفاصيل المنتج من API
  async function getProductDetails(productId) {
    try {
      let response = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );
      setProductDetails(response.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-between align-items-center">
        {loading ? (
          <div className="text-center">
            <i className="fas fa-spinner fa-spin fa-3x"></i>
          </div>
        ) : productDetails ? (
          <>
            <div className="col-md-6">
              <div>
                <h1 className="text-secondary">{productDetails.category}</h1>
                <img
                  src={productDetails.image}
                  alt={productDetails.title}
                  className="img-fluid w-50"
                />
              </div>
            </div>
            <div className="col-md-6">
              <p className="pt-1 text-secondary">
                {productDetails.rating.rate}<i className="fa fas fa-star text-dark"></i>
              </p>
              <p className="lead">{productDetails.description}</p>
              <div className="border border-1 border-black text-center w-25 m-auto fs-2">
                ${productDetails.price}
              </div>
              
            </div>
          </>
        ) : (
          <div className="text-center">
            <p>Product not found or an error occurred.</p>
          </div>
        )}
      </div>
    </div>
  );
}
