import React from "react";
import GuestLayout from "../Layouts/GuestLayout";
import { useSelector } from "react-redux";
import ImageLoader from "../components/ImageLoader";

const Cart = () => {
  const cartSelector = useSelector((state) => state.cart);
  console.log(cartSelector);

  return (
    <GuestLayout>
      <div className="container py-5">
        <h3 className="mb-3">Cart</h3>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Qty</th>
              <th scope="col">Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {cartSelector.map(function (item, index) {
              return (
                <tr key={item.id}>
                  <td> {item.title}</td>
                  <td>
                    <div style={{ width: 100 }}>
                      <ImageLoader item={item} />
                    </div>
                  </td>
                  <td>{item.price}</td>
                  <td>
                    <button className="btn btn-primary">
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <span className="mx-2">{item.qty}</span>
                    <button className="btn btn-primary">
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </td>
                  <td>{item.price * item.qty}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={4}></td>
              <td>
                Total:{" "}
                {cartSelector.reduce((acc, item) => {
                  return acc + item.price * item.qty;
                }, 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </GuestLayout>
  );
};

export default Cart;
