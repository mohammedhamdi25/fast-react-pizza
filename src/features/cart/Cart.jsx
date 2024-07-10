import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "./catrSlice";
import EmptyCart from "./EmptyCart";
import { clearCart } from "./catrSlice";

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const username = useSelector((store) => store.user.userName);
  const cart = useSelector(getCartItems);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="p-4 ">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-10 font-bold text-xl capitalize">
        Your cart, {username}
      </h2>

      <ul className="flex flex-col divide-y divide-stone-200 border-b ">
        {cart.map((pizza) => (
          <CartItem item={pizza} key={pizza.pizzaId} />
        ))}
      </ul>
      <div className="mt-10 space-x-2">
        <Button type={"primary"} to="/order/new">
          Order pizzas
        </Button>
        <Button type={"secondary"} onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
