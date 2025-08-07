import Card from "../UI/Card";
import classes from "./ProductTitle.module.css";

const ProductTitle = (props) => {
  const { page } = props;

  return (
    <Card className={classes.title}>
      <div className={classes.actions}>
        <div className={`${classes.first} ${classes.rightBorder}`}>
          <h4>Product Name</h4>
        </div>
        {page === "product" ? (
          <>
            <div className={`${classes.common} ${classes.rightBorder}`}>
              <h4>Price</h4>
            </div>
            <div className={`${classes.common} ${classes.rightBorder}`}>
              <h4>Qty</h4>
            </div>
            <div>
              <h4 className={classes.last}>Visible</h4>
            </div>
          </>
        ) : (
          <>
            <div className={`${classes.common} ${classes.rightBorder}`}>
              <h4>Price</h4>
            </div>
            <h4 className={classes.cartTitle}>Add</h4>
          </>
        )}
      </div>
    </Card>
  );
};

export default ProductTitle;
