import React from "react";
import GuestLayout from "../Layouts/GuestLayout";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../store/wishlistSlice";

const Wishlist = () => {
    const dispatch = useDispatch();
  const wishlistSelector = useSelector((state) => state.wishlist);
  return (
    <GuestLayout>
      <div className="container py-5">
        <h3 className="mb-3">Wishlist</h3>
        {wishlistSelector.length === 0 && (
          <div className="alert alert-info" role="alert">
            Your wishlist is empty
          </div>
        )}

        <div className="row">
          {wishlistSelector.map((item) => {
            return (
              <div className="col-md-3 mb-3" key={item.id}>
                <div className="card">
                  <img
                    src={item.thumbnail}
                    className="card-img-top"
                    alt={item.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title" style={{ height: "3vw" }}>
                      {item.title}
                    </h5>
                    <p className="card-text mb-0">Category: {item.category}</p>
                    <p className="card-text">Price: {item.price} $</p>
                    <button className="btn btn-danger" onClick={() => {dispatch(removeFromWishlist(item))}}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </GuestLayout>
  );
};

export default Wishlist;
