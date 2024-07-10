import { useDispatch, useSelector } from "react-redux";
import {
  decreaseNumItem,
  getCurrentQuantityItem,
  increaseNumItem,
} from "../features/cart/catrSlice";
import Button from "./Button";
import DeleteItem from "../features/cart/DeleteItem";

export default function CountPizza({ pizzaId }) {
  const currentQuantityItem = useSelector(getCurrentQuantityItem(pizzaId));
  const dispatch = useDispatch();
  function handleIncrease() {
    console.log(pizzaId);
    dispatch(increaseNumItem(pizzaId));
  }
  function handleDecrease() {
    dispatch(decreaseNumItem(pizzaId));
  }
  return (
    <div className="flex justify-center items-center gap-2">
      <Button type={"circle"} onClick={handleDecrease}>
        -
      </Button>
      <p>{currentQuantityItem}</p>
      <Button type={"circle"} onClick={handleIncrease}>
        +
      </Button>
    </div>
  );
}
