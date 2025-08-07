import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";
import { cartActions } from "../../store/cart-slice";
import Card from "../UI/Card";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { name, quantity, price, id, isEven } = props.item;
  
  function handleChnage(newValue) {
    if (newValue === "0") {
      dispatch(cartActions.deleteCartItem({ id, price }));
    } else {
      if (+newValue > quantity) {
        dispatch(
          cartActions.updateCartItems({
            add: true,
            id,
            name,
            price,
          })
        );
      } else {
        dispatch(
          cartActions.updateCartItems({
            add: false,
            id,
            name,
            price,
          })
        );
      }
    }
  }

  return (
    <li className={classes.item}>
      <Card className={isEven ? classes.bgWhite : classes.bgGrey}>
        <div className={classes.actions}>
          <div className={`${classes.first} ${classes.rightBorder}`}>
            <p>{name}</p>
          </div>

          <div className={`${classes.common} ${classes.rightBorder}`}>
            <p>{price}</p>
          </div>
          <div className={`${classes.last}`}>
            <input
              type="number"
              id={`${id}-quantity`}
              value={quantity}
              className={classes.last}
              onChange={(event) => handleChnage(event.target.value)}
            />
          </div>
        </div>
      </Card>
    </li>
  );
};

export default CartItem;
