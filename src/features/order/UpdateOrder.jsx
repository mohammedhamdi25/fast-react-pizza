import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";
export default function UpdateOrder() {
  const fithcer = useFetcher();

  return (
    <fithcer.Form className="text-right" method="PATCH">
      <Button type={"primary"}>make priority</Button>
    </fithcer.Form>
  );
}

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
