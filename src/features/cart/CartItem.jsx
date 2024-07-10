import { formatCurrency } from "../../utils/helpers";
import CountPizza from "../../ui/CountPizza";
import DeleteItem from "../cart/DeleteItem";
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  return (
    <li className="flex flex-col  grow py-3  sm:flex-row sm:justify-between sm:items-center ">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex  justify-between items-center sm:gap-6 ">
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
        <CountPizza pizzaId={pizzaId} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
