import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityItem } from "../cart/catrSlice";
import DeleteItem from "../cart/DeleteItem";
import CountPizza from "../../ui/CountPizza";
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantityItem = useSelector(getCurrentQuantityItem(id));
  const isInCart = currentQuantityItem > 0;

  function handleAddToCart() {
    const item = {
      pizzaId: id,
      name,
      unitPrice,
      totalPrice: unitPrice * 1,
      quantity: 1,
    };

    dispatch(addItem(item));
  }
  return (
    <li className="flex gap-4 py-2 border-b-2 ">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale " : ""} `}
      />
      <div className="flex grow flex-col  pt-0.5 space-y-2">
        <p>{name}</p>
        <p className="text-sm capitalize text-stone-500 italic ">
          {ingredients.join(", ")}
        </p>
        <div className="flex flex-col space-y-2 mt-auto  justify-between sm:flex-row sm:items-center ">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          <div className="flex items-center space-x-2">
            {isInCart && <CountPizza pizzaId={id} />}
            {isInCart && <DeleteItem pizzaId={id} />}
            {!soldOut && !isInCart && (
              <Button type="small" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
