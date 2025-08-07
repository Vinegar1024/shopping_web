import { useDispatch, useSelector } from "react-redux";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import ProductItem from "../Product/ProductItem";
import ProductTitle from "../Product/ProductTitle";
import SearchProduct from "../Product/SearchProduct";
import { fetchCartData } from "../../store/cart-action";
import { useEffect } from "react";
import CartTitle from "./CartTitle";
import Message from "../UI/Message";

const Cart = (props) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.cart);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  let items = [
    ...products.items.filter((item) => item.visibility && item.quantity > 0),
  ];

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  if (items.length === 0 && cartItems.length === 0)
    return <Message>Loading...</Message>;

  return (
    <>
      <section className={classes.shopNCarrt}>
        <section className={classes.products}>
          <fieldset>
            <legend>Products</legend>
            <SearchProduct products={cartItems} />
            <ProductTitle page={"cart"} />
            <ul>
              {items.map((product, i) => (
                <ProductItem
                  key={product.id}
                  price={product.price}
                  name={product.name}
                  quantity={product.quantity}
                  id={product.id}
                  visibility={product.visibility}
                  isEven={i % 2}
                />
              ))}
            </ul>
            {items.length === 0 && (
              <Message>The product list is empty!</Message>
            )}
          </fieldset>
        </section>

        <section className={classes.cart}>
          <fieldset>
            <legend>Cart</legend>
            <CartTitle />
            <ul>
              {cartItems.map((item, i) => (
                <CartItem
                  key={item.id}
                  item={{
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    isEven: i % 2,
                  }}
                />
              ))}
            </ul>
            <p>Total: {totalPrice}</p>
          </fieldset>
        </section>
      </section>
    </>
  );
};

export default Cart;
