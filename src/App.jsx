import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Todo from "./components/Todo";
import { useState, useEffect } from "react";

function App() {
  const [inputValue, setinputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [folder, setFolder] = useState("today");

  useEffect(() => {
    const storedTodos = localStorage.getItem("storedTodos");
    if (storedTodos) {
      console.log("data fetched" + storedTodos);
      setTodos(JSON.parse(storedTodos));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("storedTodos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (inputValue.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      description: inputValue,
      completed: false,
      hidden: false,
      dueDate: new Date().toISOString().split("T")[0],
    };
    setTodos([...todos, newTodo]);
    setinputValue("");
  };

  const getFilteredTodos = () => {
    const today = new Date().toISOString().split("T")[0];

    switch (folder) {
      case "today":
        return todos.filter((todo) => todo.dueDate === today && !todo.hidden);
      case "completed":
        return todos.filter((todo) => todo.completed && !todo.hidden);
      case "all":
      default:
        return todos.filter((todo) => !todo.hidden);
    }
  };
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  return (
    <div className="max-w-xl mx-auto px-4">
      <h1 className="text-center text-3xl md:text-5xl m-8">
        <span className="text-blue-950 bold text-6xl md:text-8xl">π</span>Todo
        List
      </h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center border border-gray-900 rounded px-3 py-2 flex-grow">
          <FontAwesomeIcon
            icon={faPlus}
            className="text-gray-500 mr-2 cursor-pointer"
            onClick={handleAddTodo}
          />
          <input
            type="search"
            placeholder="Add New Task"
            value={inputValue}
            onChange={(e) => setinputValue(e.target.value)}
            className="w-full outline-none bg-transparent"
          />
        </div>

        <select
          name="task-category"
          id="task-category"
          className="px-4 py-2 text-sm md:text-lg font-semibold bg-slate-800 text-white rounded-md hover:bg-slate-900"
          onChange={(e) => {
            console.log(e.target.value);
            return setFolder(e.target.value);
          }}
        >
          <option value="today">TODAY</option>
          <option value="all">ALL</option>
          <option value="completed">COMPLETED</option>
        </select>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        {getFilteredTodos().map((todo) => (
          <Todo
            key={todo.id}
            description={todo.description}
            completed={todo.completed}
            ontoggle={toggleTodo}
            id={todo.id}
            hidden={todo.hidden}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
