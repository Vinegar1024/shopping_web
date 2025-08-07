import Card from "../UI/Card";
import classes from "./CartTitle.module.css";

const CartTitle = () => {
  return (
    <Card className={classes.title}>
      <div className={classes.actions}>
        <div className={`${classes.first} ${classes.rightBorder}`}>
          <h4>Items</h4>
        </div>
        <div className={`${classes.common} ${classes.rightBorder}`}>
          <h4>Price</h4>
        </div>
        <h4 className={classes.cartTitle}>Quantity</h4>
      </div>
    </Card>
  );
};

export default CartTitle;
