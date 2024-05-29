import { useTodo } from "../context/TodoContext";

const ServiceSwitch = () => {
  const { useApi, handleServiceSwitch } = useTodo();
  return (
    <div className="flex flex-col gap-2">
      <span className="text-white">
        Current Service: {useApi ? "Local Database" : "In Memory"}
      </span>
      <button
        onClick={handleServiceSwitch}
        className="
              p-2
              rounded-md
              bg-white
              hover:bg-neutral-300
            "
      >
        {useApi ? "Use In Memory" : "Use Local Database"}
      </button>
    </div>
  );
};

export default ServiceSwitch;
