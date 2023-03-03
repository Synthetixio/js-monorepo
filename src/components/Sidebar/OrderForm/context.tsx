import { createContext, Dispatch, useContext, useReducer } from "react";
import { Actions, initialOrderFormState, OrderForm, reducer } from "./reducer";

interface OrderFormContextProps {
  state: OrderForm;
  dispatch: Dispatch<Actions>;
}

export const OrderFormContext = createContext<OrderFormContextProps>({
  state: initialOrderFormState,
  dispatch: () => {},
});

export const useStore = () => useContext(OrderFormContext);

interface StoreProviderProps {
  children: JSX.Element;
}

export const OrderFormProvider = ({ children }: StoreProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialOrderFormState);
  return (
    <OrderFormContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderFormContext.Provider>
  );
};
