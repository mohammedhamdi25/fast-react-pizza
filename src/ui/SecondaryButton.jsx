export default function SecondaryButton({ children }) {
  const className = `
   text-stone-400 uppercase rounded-full py-2.5 px-4 md:py-3.5 md:px-6 font-semibold border-2 border-stone-300 hover:bg-stone-200 hover:text-stone-700 inline-block
  focus:text-stone-700 focus:bg-stone-200 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed transition-colors duration-300 `;
  return <button className={className}>{children}</button>;
}
