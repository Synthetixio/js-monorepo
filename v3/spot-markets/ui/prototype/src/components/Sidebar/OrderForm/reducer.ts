export interface OrderForm {
  amount: number | null;
  leverage: number | null;
  buy: boolean;
  nativeUnit: boolean;
}

export const initialOrderFormState: OrderForm = {
  amount: 0,
  leverage: 1,
  buy: true,
  nativeUnit: false,
};

export type Actions =
  | {
      type: "set_leverage";
      payload: { leverage: number | null };
    }
  | { type: "reset_leverage" }
  | { type: "set_amount"; payload: { amount: number | null } }
  | { type: "reset_amount" }
  | { type: "set_buy"; payload: { buy: boolean } }
  | { type: "set_native_unit"; payload: { nativeUnit: boolean } };

export function reducer(state: OrderForm, action: Actions): OrderForm {
  switch (action.type) {
    case "set_leverage":
      return {
        ...state,
        leverage: action.payload.leverage,
      };

    case "reset_leverage":
      return {
        ...state,
        leverage: 1,
      };

    case "set_amount":
      return {
        ...state,
        amount: action.payload.amount,
      };

    case "reset_amount":
      return {
        ...state,
        amount: 0,
      };

    case "set_buy":
      return {
        ...state,
        buy: action.payload.buy,
      };

    case "set_native_unit":
      return { ...state, nativeUnit: action.payload.nativeUnit };

    default:
      return { ...state };
  }
}
