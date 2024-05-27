import MainContent from "./components/MainContent";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <TodoProvider>
      <MainContent />
    </TodoProvider>
  );
}

export default App;
