import { useDispatch } from "react-redux";
import Card from "../UI/Card";
import classes from "./NewProduct.module.css";
import { cartActions } from "../../store/cart-slice";

const ProductTitle = () => {
  const dispatch = useDispatch();

  function handleAdd(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const id = JSON.stringify(new Date());
    dispatch(cartActions.addItem({ ...data, id, visibility: true }));
    document.getElementById("new-product-form").reset();
  }

  return (
    <Card className={classes.new}>
      <form onSubmit={handleAdd} id="new-product-form">
        <div className={classes.actions}>
          <div className={`${classes.first} ${classes.rightBorder}`}>
            <input
              type="text"
              id='name'
              name='name'
              className={classes.firstInput}
              defaultValue={''}
            />
          </div>
          <div className={`${classes.common} ${classes.rightBorder}`}>
            <input type="number" id='price' name='price' defaultValue={''} />
          </div>
          <div className={`${classes.common} ${classes.rightBorder}`}>
            <input type="number" id='quantity' name='quantity' defaultValue={''} />
          </div>
          <div>
            <button>Add</button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default ProductTitle;
