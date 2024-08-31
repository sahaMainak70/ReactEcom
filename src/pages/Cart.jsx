import React from "react";
import GuestLayout from "../Layouts/GuestLayout";
import { useSelector, useDispatch } from "react-redux";
import ImageLoader from "../components/ImageLoader";
import {
  qtyIncreament,
  qtyDecreament,
  removeFromCart,
} from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartSelector = useSelector((state) => state.cart);
  console.log(cartSelector);

  function qtyIncreamentHandler(id) {
    dispatch(qtyIncreament(id));
  }

  function qtyDecreamentHandler(id) {
    dispatch(qtyDecreament(id));
  }

  function fixedAmount(amount) {
    return Number(amount.toFixed(2));
  }

  function removeCart(id) {
    const mutateArray = cartSelector.filter(function (item) {
      return item.id != id;
    });
    console.log(mutateArray);

    dispatch(removeFromCart(mutateArray));
  }

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
              <th scope="col">Delete</th>
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
                    <button
                      className="btn btn-primary"
                      onClick={() => qtyDecreamentHandler(item.id)}
                      disabled={item.qty === 1}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <span className="mx-2">{item.qty}</span>
                    <button
                      className="btn btn-primary"
                      onClick={() => qtyIncreamentHandler(item.id)}
                      disabled={item.qty === 10}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </td>
                  <td>{fixedAmount(item.price * item.qty)}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        removeCart(item.id);
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={4}></td>
              <td>
                Total:{" "}
                {cartSelector.reduce((acc, item) => {
                  return fixedAmount(acc + item.price * item.qty);
                }, 0)}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </GuestLayout>
  );
};

export default Cart;
