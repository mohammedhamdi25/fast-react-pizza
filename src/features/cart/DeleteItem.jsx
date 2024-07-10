import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { DeleteItemCart } from "./catrSlice";

export default function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => {
        dispatch(DeleteItemCart(pizzaId));
      }}
      type={"small"}
    >
      Delete
    </Button>
  );
}
