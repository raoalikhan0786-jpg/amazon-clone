import {
  createContext,
  useState
} from "react";

export const StoreContext =
  createContext();

const StoreProvider = ({
  children
}) => {

  const [cart, setCart] =
    useState([]);

  const addToCart = (product) => {

    setCart([...cart, product]);

  };

  const removeFromCart = (index) => {

    const updatedCart =
      [...cart];

    updatedCart.splice(index, 1);

    setCart(updatedCart);

  };

  return (

    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart
      }}
    >

      {children}

    </StoreContext.Provider>

  );

};

export default StoreProvider;