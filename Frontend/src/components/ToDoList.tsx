import ToDoItem from "./ToDoItem";

const ToDoList = () => {
  // items dummy
  const listItems = [1, 2, 3, 4, 5];

  return (
    <>
      <div className="flex flex-col p-4 border-2 gap-4 w-1/3">
        {listItems.length > 0
          ? listItems.map((item) => (
              <ToDoItem key={item} item={item} />
            ))
          : "Nothing to do yet!"}
      </div>
    </>
  );
};

export default ToDoList;
