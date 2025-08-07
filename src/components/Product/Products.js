import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
import ProductTitle from "./ProductTitle";
import NewProduct from "./NewProduct";
import SearchProduct from "./SearchProduct";
import { useSelector, useDispatch } from "react-redux";
import { sendCartData, fetchCartData } from "../../store/cart-action";
import { useEffect } from "react";
import Message from "../UI/Message";

const Products = (props) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.cart);
  const searchTerm = useSelector((stae) => stae.cart.searchTerm);
  
  let items = [...products.items];
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (products.change) {
      dispatch(sendCartData(products));
    }
  }, [products, dispatch]);

  if (items.length === 0) return <Message>Loading...</Message>;

  if (searchTerm.length > 0) {
    items = products.items.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
  }
  
  return (
    <>
      <section className={classes.products}>
        <fieldset>
          <legend>Products</legend>
          <SearchProduct products={products} />
          <ProductTitle page={'product'}/>
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
                editable={true}
              />
            ))}
          </ul>
          <NewProduct />
        </fieldset>
      </section>
    </>
  );
};

export default Products;
