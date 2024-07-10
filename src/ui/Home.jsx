import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((store) => store.user.userName);

  return (
    <div className="text-center my-10 px-4 sm:my-16">
      <h1 className="  text-xl font-semibold mb-6 sm:text-3xl ">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to={"/menu"} type={"primary"}>
          Complet Ordering,{username}
        </Button>
      )}
    </div>
  );
}

export default Home;
