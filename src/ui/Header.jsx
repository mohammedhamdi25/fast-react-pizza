import { Link } from "react-router-dom";
import Search from "./Search";
import Username from "../features/user/Username";

export default function Header() {
  return (
    <header className="bg-yellow-400 px-4 py-3 flex justify-between items-center">
      <Link to={"/"} className="uppercase tracking-widest">
        Fast React PIZZA Co.
      </Link>
      <Search />
      <Username />
    </header>
  );
}
