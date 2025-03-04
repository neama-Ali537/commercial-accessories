import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

export default function Register() {
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  });

  let [errors, setErrors] = useState({});

  // Joi schema with custom validation for rePassword
  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^[A-Z]/)
      .required()
      .messages({
        "string.pattern.base": "Name must start with a capital letter.",
        "string.empty": "Name is required.",
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Email must be a valid email address.",
        "string.empty": "Email is required.",
      }),
    password: Joi.string()
      .pattern(/^[A-Za-z]\d{6,}$/)
      .required()
      .messages({
        "string.pattern.base": "Password must start with a letter and include at least 6 digits.",
        "string.empty": "Password is required.",
      }),
    rePassword: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (value !== helpers.state.ancestors[0].password) {
          return helpers.error("any.invalid");
        }
        return value;
      })
      .messages({
        "any.invalid": "Passwords do not match.",
        "string.empty": "Re-Password is required.",
      }),
    phone: Joi.string()
      .pattern(/^\d+$/)
      .required()
      .messages({
        "string.pattern.base": "Phone must contain only numbers.",
        "string.empty": "Phone is required.",
      }),
  });

  // Handle input changes
  function getUserData(eventinfo) {
    let myUser = { ...user };
    myUser[eventinfo.target.name] = eventinfo.target.value;
    setUser(myUser);

    // Validate specific field
    const { error } = schema.extract(eventinfo.target.name).validate(eventinfo.target.value, { abortEarly: true });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [eventinfo.target.name]: error ? error.message : null,
    }));
  }

  // Submit form
  async function submiteRegisterForm(e) {
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
    sendRegisterToApi();
  }

  async function sendRegisterToApi() {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        user
      );
      if (data.message === "success") {
        setLoading(false);
        navigate("/login");
      } else {
        setLoading(false);
        setError(data.message || "Unexpected error occurred");
      }
    } catch (err) {
      setLoading(false);
      const errorMsg =
        err.response?.data?.message || "Network error occurred. Please try again.";
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

      <form onSubmit={submiteRegisterForm} className="container m-auto">
        <div className="row">
          <div className="col-md-6 col-sm-6">
            <img className=" w-100" src="/imgs/phone.png" alt="" />
          </div>
          <div className="col-md-6 col-sm-6">
            <h2>Create an account</h2>
            <p>Enter your details below</p>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                onChange={getUserData}
                name="name"
                type="text"
                className="form-control"
                id="name"
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>

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
              {errors.email && <div className="text-danger">{errors.email}</div>}
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
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="rePassword" className="form-label">
                Re-Password:
              </label>
              <input
                onChange={getUserData}
                name="rePassword"
                type="password"
                className="form-control"
                id="rePassword"
              />
              {errors.rePassword && <div className="text-danger">{errors.rePassword}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number:
              </label>
              <input
                onChange={getUserData}
                name="phone"
                type="tel"
                className="form-control"
                id="phone"
              />
              {errors.phone && <div className="text-danger">{errors.phone}</div>}
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

