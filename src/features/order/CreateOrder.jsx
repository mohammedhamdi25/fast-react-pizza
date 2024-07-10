import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCartItems, getTotalPrice } from "../cart/catrSlice";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";
import store from "../../store";
import { fetchAddres } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    statue,
    position,
    address,
    errors: addressError,
  } = useSelector((store) => store.user);

  const cartItems = useSelector(getCartItems);

  const totalCartPrice = useSelector(getTotalPrice);

  const pricePriority = withPriority ? 0.2 * totalCartPrice : 0;

  const totalPrice = totalCartPrice + pricePriority;
  const cart = cartItems;

  const errorsMessage = useActionData();

  const navigation = useNavigation();

  const isSubmiting = navigation.state === "submitting";

  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-4 font-semibold text-xl">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {errorsMessage?.phone && (
              <p className="mt-3 text-sm bg-red-100 text-red-600 p-2 rounded-lg">
                {errorsMessage?.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow relative">
            <input
              className="input w-full"
              type="text"
              name="address"
              defaultValue={address}
              disabled={statue === "loading"}
              required
            />
            {statue === "error" && (
              <p className="mt-3 text-sm bg-red-100 text-red-600 p-2 rounded-lg">
                {addressError}
              </p>
            )}
            {!position.longitude && !position.latitude && (
              <div className="absolute  right-[6px] top-[4.5px] md:right-[6px] md:top-[6px]  ">
                <Button
                  type="small"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddres());
                  }}
                >
                  {" "}
                  get Location
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 items-center mb-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div className="mt-10">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={JSON.stringify(position)}
          />
          <Button
            isSubmiting={isSubmiting || statue === "loading"}
            type={"primary"}
          >
            {isSubmiting
              ? "sending order"
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  console.log(data);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      "please give us your correct phone number. we might need it to contact you";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  // dont overuse this
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
