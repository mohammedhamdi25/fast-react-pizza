import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNumPizzas, getTotalPrice } from "./catrSlice";

function CartOverview() {
  const numPizzas = useSelector(getNumPizzas);
  const totalPrice = useSelector(getTotalPrice);

  if (!numPizzas) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="font-semibold text-stone-300 space-x-4">
        <span>{numPizzas} pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <Link to={"/cart"}>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
