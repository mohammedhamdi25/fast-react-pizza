import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  //3- get loader
  const menu = useLoaderData();

  return (
    <ul className="px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}
// 1 - create loader
export async function loading() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
