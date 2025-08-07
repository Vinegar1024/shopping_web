import { useDispatch } from "react-redux";
import Card from "../UI/Card";
import classes from "./SearchProduct.module.css";
import { cartActions } from "../../store/cart-slice";
import { useRef } from "react";
import { fetchCartData } from "../../store/cart-action";

const SearchProduct = (props) => {
  let searchElement = useRef();
  const dispatch = useDispatch();
  const { products } = props;

  function handleSearch(event) {
    event.preventDefault();
    const searchTerm = searchElement.current.value;
    dispatch(fetchCartData());
    
    dispatch(cartActions.searchProduct({ searchTerm, products }));
  }

  function handleReset(event) {
    if (searchElement.current.value === '') handleSearch(event);
  }

  return (
    <Card className={classes.search}>
      <form onSubmit={handleSearch} id="search-form">
        <div className={classes.actions}>
          <input
            id="search-input"
            className={classes.input}
            type="text"
            placeholder="Search product"
            ref={searchElement}
            onChange={handleReset}
          />
          <button>Filter</button>
        </div>
      </form>
    </Card>
  );
};

export default SearchProduct;
