import { Link } from "react-router-dom";

export default function Button({ children, isSubmiting, to, type, onClick }) {
  const base = `
  bg-yellow-400 text-sm text-stone-800 uppercase   rounded-full  font-semibold hover:bg-yellow-300 inline-block
  focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed transition-colors duration-300 `;

  const styles = {
    primary: base + "bg-yellow-400 py-3 px-4 md:py-4 md:px-6",
    small: base + "bg-yellow-400 px-4 py-2 md:px-5 md:py-2.5 text-xs",
    circle: base + " w-8 h-8 flex justify-center items-center ",
    secondary: `text-stone-400 uppercase rounded-full py-2.5 px-4 md:py-3.5 md:px-6 font-semibold border-2 border-stone-300 hover:bg-stone-200 hover:text-stone-700 inline-block
  focus:text-stone-700 focus:bg-stone-200 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed transition-colors duration-300`,
  };
  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={isSubmiting} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={isSubmiting} className={styles[type]}>
      {children}
    </button>
  );
}
