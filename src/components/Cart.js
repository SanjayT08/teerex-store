import React from "react";
import Header from "./Header";
import "./Cart.css";

const Cart = ({
  cartItems,
  handleAdd,
  handleDecrease,
  handleDelete,
  totalQuantity
}) => {


const getTotalCartValue = (cartItems = []) => { 
  if (!cartItems.length) return 0;

  const total = cartItems
    .map((item) => item.price * item.productinCart)
    .reduce((total, n) => total + n);

  return total;
};
const totalPrice = getTotalCartValue(cartItems);
const cartTotal = totalQuantity(cartItems);

  return (
    <>
      <Header cartItems={cartItems} totalQuantity={totalQuantity} open />

      <div className="ItemCart">
        <div className="heading">Shopping Cart</div>
        <div className="cart">
          {cartItems.length ? (
            <>
              <div className="outer-item-cart">
                <div className="inner-item-cart">
                  {cartItems.map((item) => (
                    <div className="item" key={item.id}>
                      <div className="product">
                        <div className="productImage">
                          <img src={item.imageURL} alt={item.name} />
                        </div>
                        <div className="space"></div>

                        <div className="productDetail">
                          <div className="product-data">
                            <p style={{ fontWeight: "bold" }}>{item.name}</p>
                            <p style={{ fontSize: "13.5px" }}>
                              Rs.{item.price}
                            </p>
                          </div>
                          <div className="space"></div>

                          <div className="details"> 
                            <p>Quantity: {item.productinCart}</p>
                            <p>
                              {item.quantity === item.productinCart
                                ? `No Stock Left`
                                : `Stock: ${item.quantity}`}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="buttons">
                        <button
                          className="change"
                          onClick={(e) => handleAdd(item)}
                        >
                          +
                        </button>
                        <div className="space"></div>
                        <button
                          className="change"
                          onClick={(e) => handleDecrease(item)}
                        >
                          -
                        </button>
                        <div className="space"></div>
                        <button
                          className="delete"
                          onClick={(e) => handleDelete(item)}
                        >
                          Delete
                        </button>
                        <i
                          onClick={(e) => handleDelete(item)}
                          className="fa fa-trash deleteIcon"
                          style={{ fontSize: "20px", color: "gray" }}
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="section"></div>
                <div className="total details"> 
                  <div className="totalqty">Total Cart Items: {cartTotal}</div>
                  <div className="totalprice">
                    Total Cart Price: Rs.{totalPrice}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="cart-empty">
              No items are added, please add some items to your cart...
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;