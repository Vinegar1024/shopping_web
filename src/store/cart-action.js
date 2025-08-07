import { cartActions } from "./cart-slice";
// import { uiActions } from "./ui-slice";

export const sendCartData = (products) => {
  return async (dispatch) => {
    // this is some test data
    const dummyCart = [
      {
        description: "First product",
        id: "p1",
        name: "First product",
        price: 6,
        quantity: 2,
        title: "First Product",
        totalPrice: 12,
      },
      {
        description: "Second product",
        id: "p2",
        name: "hello",
        price: 16,
        quantity: 3,
        title: "2nd Product",
        totalPrice: 33,
      },
      {
        description: "Third product",
        id: "p3",
        name: "tHIRD product",
        price: 9,
        quantity: 3,
        title: "tHIRD Product",
        totalPrice: 21,
      },
    ];

    const sendRequest = async () => {
      const response = await fetch(
        "https://ng-complete-guide-9dfa2.firebaseio.com/products.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: dummyCart,
            products: {items: products.items},
            totalQuantity: 66,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending data failed");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      return error;
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://ng-complete-guide-9dfa2.firebaseio.com/products.json"
      );

      if (!response.ok) throw new Error("Could not fetch from database");
      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.products.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      // return dispatch();
      // uiActions.showNotification({
      //   status: "error",
      //   title: "Error",
      //   message: "Fetching cart data failed.",
      // })
    }
  };
};
