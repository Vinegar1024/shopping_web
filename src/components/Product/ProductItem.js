import { useDispatch } from "react-redux";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { cartActions } from "../../store/cart-slice";
import { useState } from "react";

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const { price, name, id, quantity, visibility, isEven, editable } = props;
  const [pr, setPrice] = useState(price);
  const [qty, setQty] = useState(quantity);
  const [visible, setVisibility] = useState(visibility);

  function handleChnage(type, newValue) {
    if (type === "price") setPrice(newValue);
    else if (type === "quantity") setQty(newValue);
    else if (type === "visibility") setVisibility(newValue);

    dispatch(cartActions.updateItem({ type, id, newValue }));
  }

  function handleAdd() {
    dispatch(cartActions.updateCartItems({ add: true, id, name, price }));
  }

  return (
    <li className={classes.item}>
      <Card className={isEven ? classes.bgWhite : classes.bgGrey}>
        <div className={classes.actions}>
          <div className={`${classes.first} ${classes.rightBorder}`}>
            <p>{name}</p>
          </div>
          {editable ? (
            <>
              <div className={`${classes.common} ${classes.rightBorder}`}>
                <input
                  type="number"
                  id={`${id}-price`}
                  value={pr}
                  onChange={(event) =>
                    handleChnage("price", event.target.value)
                  }
                />
              </div>
              <div className={`${classes.common} ${classes.rightBorder}`}>
                <input
                  type="number"
                  id={`${id}-quantity`}
                  value={qty}
                  onChange={(event) =>
                    handleChnage("quantity", event.target.value)
                  }
                />
              </div>
              <div>
                <label className={classes.switch}>
                  <input
                    type="checkbox"
                    id={`${id}-visible`}
                    name="visible-switch"
                    checked={visible}
                    onChange={(event) =>
                      handleChnage("visibility", event.target.checked)
                    }
                  />
                  <span className={classes.slider}></span>
                </label>
              </div>
            </>
          ) : (
            <>
              <div className={`${classes.common} ${classes.rightBorder}`}>
                <p>{pr}</p>
              </div>
              <button className={classes.transparentBtn} onClick={handleAdd}>
                <i className="fa fa-shopping-cart"></i>
              </button>
            </>
          )}
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
