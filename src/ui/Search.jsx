import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [query, setQuery] = useState();
  const navigate = useNavigate();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!query) return;
        navigate(`/order/${query}`);
        setQuery("");
      }}
    >
      <input
        className="w-28 bg-yellow-200 px-4 py-2 text-sm placeholder:text-stone-400 rounded-full focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-50 transition-all duration-300 sm:w-64 sm:focus:w-72"
        type="text"
        placeholder="Search Order #"
        id=""
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
    </form>
  );
}
