import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

export default function Login({saveUserData}) {
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let [user, setUser] = useState({
    email: "",
    password: "",
  });

  let [errors, setErrors] = useState({});

  // Joi schema with custom validation for rePassword
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Email must be a valid email address.",
        "string.empty": "Email is required.",
      }),
    password: Joi.string()
      .pattern(/^[a-z]\d{6,}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Password must start with a letter and include at least 6 digits.",
        "string.empty": "Password is required.",
      }),
  });

  // Handle input changes
  function getUserData(eventinfo) {
    let myUser = { ...user };
    myUser[eventinfo.target.name] = eventinfo.target.value;
    setUser(myUser);

    // Validate specific field
    const { error } = schema
      .extract(eventinfo.target.name)
      .validate(eventinfo.target.value, { abortEarly: true });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [eventinfo.target.name]: error ? error.message : null,
    }));
  }

  // Submit form
  async function submiteloginForm(e) {
    e.preventDefault();

    const validation = schema.validate(user, { abortEarly: false });

    if (validation.error) {
      const fieldErrors = {};
      validation.error.details.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    setLoading(true);
    sendloginToApi();
  }

  async function sendloginToApi() {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        user
      );
      if (data.message === "success") {
        // to save user data (token)
        localStorage.setItem('userToken' , data.token);
        saveUserData()
        setLoading(false);
        navigate("/home");
      } else {
        setLoading(false);
        setError(data.message || "Unexpected error occurred");
      }
    } catch (err) {
      setLoading(false);
      const errorMsg =
        err.response?.data?.message ||
        "Network error occurred. Please try again.";
      setError(errorMsg);
    }
  }

  return (
    <>
      {error && error.length > 0 ? (
        <div className="alert alert-danger my-2">{error}</div>
      ) : (
        ""
      )}

      <form onSubmit={submiteloginForm} className="container m-auto mt-5">
        <div className="row">
          <div className="col-md-6 col-sm-6">
            <img className=" w-100" src="/imgs/phone.png" alt="" />
          </div>
          <div className="col-md-6 col-sm-6">
            <h2>Create an account</h2>
            <p>Enter your details below</p>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address:
              </label>
              <input
                onChange={getUserData}
                name="email"
                type="email"
                className="form-control"
                id="email"
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                onChange={getUserData}
                name="password"
                type="password"
                className="form-control"
                id="password"
              />
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </div>

            {loading ? (
              <button
                type="submit"
                className="btn btn-lg w-100 btn-danger m-auto text-center"
              >
                <i className="fas fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-lg w-100 btn-danger m-auto text-center"
              >
                Create Account
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
