import AddItem from "./components/AddItem";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <>
      <div className="h-screen flex flex-col items-center p-24 bg-slate-600">
        {/* Children here */}
        <div className="font-bold text-center text-3xl text-white">
          To-Do-List
        </div>
        {/* Show List */}
        <ToDoList />
        {/* Add */}
        <AddItem />
      </div>
    </>
  );
}

export default App;
