export default function Input({ type, name }) {
  if (type === "checkbox") {
    return (
      <input
        className="h-6 w-4 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400"
        type="checkbox"
        name={name}
        id="priority"
        // value={withPriority}
        // onChange={(e) => setWithPriority(e.target.checked)}
      />
    );
  } else {
    return <input className="input" type={type} name={name} required />;
  }
}
