import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import React, { useState, useEffect, lazy, Suspense } from "react";

import GuestLayout from "../Layouts/GuestLayout";
import "../App.css";
import { addToCart } from "../store/cartSlice.js";

const ImageLoader = lazy(() => import("../components/ImageLoader.jsx"));

function Home() {
  const dispatch = useDispatch();
  const cartSelector = useSelector((state) => state.cart);
  console.log(cartSelector);

  const [products, setProducts] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [PageNumber, setPageNumber] = useState([]);
  const [currentActive, setCurrentActive] = useState(0);

  async function getProducts() {
    setLoading(true);
    const response = await axios.get(
      "https://dummyjson.com/products?limit=25&skip=0"
    );
    const { limits, products, skip, total } = response.data;
    const pages = Number((total / 25).toFixed());
    setProducts(products);
    let pagesArray = [];
    for (let i = 0; i < pages; i++) {
      pagesArray.push(i);
    }
    setPageNumber(pagesArray);
    setLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, []);

  function setRiviewsHandlers(rating) {
    const ratingNum = Number(rating.toFixed());
    if (ratingNum == 1) {
      return (
        <>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star "></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
        </>
      );
    } else if (ratingNum == 2) {
      return (
        <>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star "></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
        </>
      );
    } else if (ratingNum == 3) {
      return (
        <>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
        </>
      );
    } else if (ratingNum == 4) {
      return (
        <>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star"></span>
        </>
      );
    } else if (ratingNum == 5) {
      return (
        <>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
        </>
      );
    } else {
      return (
        <>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
        </>
      );
    }
  }

  async function getNextProducts(currentOffset) {
    setLoading(true);
    setCurrentActive(currentOffset);
    let newOffset = currentOffset * 25;
    const response = await axios.get(
      `https://dummyjson.com/products?limit=25&skip=${newOffset}`
    );
    const { limits, products, skip, total } = response.data;
    setProducts(products);
    setLoading(false);
  }

  function goToTop() {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }

  function addToCartHandler(item) {
    dispatch(addToCart(item));
  }

  return (
    <GuestLayout>
      <div className="container py-5">
        <h3 className="mb-3">Product Listing</h3>

        {Loading && (
          <div className="body">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <div className="row">
          {products.map((item) => {
            return (
              <div
                className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-3"
                key={item.id}
              >
                <div className="card">
                  <Suspense fallback={<div>Loading...</div>}>
                    <ImageLoader item={item} />
                  </Suspense>

                  <div className="card-body">
                    <h5 className="card-title" style={{ height: "3vw" }}>
                      {item.title}
                    </h5>
                    <p className="card-text mb-0">Category: {item.category}</p>
                    <p className="card-text">Price: {item.price} $</p>
                    <p className="card-text">
                      Rating: {setRiviewsHandlers(item.rating)}
                    </p>
                    <button className="btn btn-primary me-1">View</button>
                    <button
                      className="btn btn-info"
                      onClick={() => addToCartHandler(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {PageNumber.map((index) => {
            return (
              <li
                className={`page-item ${currentActive == index && "active"}`}
                key={index}
              >
                <button
                  className="page-link"
                  key={index}
                  onClick={() => {
                    getNextProducts(index);
                    goToTop();
                  }}
                >
                  {index + 1}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </GuestLayout>
  );
}

export default Home;
