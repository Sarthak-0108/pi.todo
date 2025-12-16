import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import Todo from "./components/Todo";
import { useState, useEffect } from "react";
import { useRef } from "react";

function App() {
  let selectedDate;

  const dateInputRef = useRef(null);
  const handleContainerClick = () => {
    if (dateInputRef.current) {
      if (dateInputRef.current.showPicker) {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
      }
    }
  };
  const handleDateChange = (event) => {
    selectedDate = event.target.value;
    if (selectedDate) {
      alert(`You are scheduling your task for ${selectedDate}`);
    }
    selectedDate = "";
  };

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
      // isScheduled: selectedDate ? true : false,
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
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-center text-3xl md:text-5xl m-8">
        <span className="text-blue-950 bold text-6xl md:text-8xl">π</span>Todo
        List
      </h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <button
          onClick={handleContainerClick}
          className="relative flex items-center justify-center px-4 py-2 text-sm md:text-lg font-semibold bg-slate-800 text-white rounded-md hover:bg-slate-900 cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faCalendar}
            className="text-gray-500 mr-2 pointer-events-none" // Ensure icon doesn't block click
          />

          <span className="pointer-events-none">Schedule</span>

          {/* 4. The Hidden Input */}
          {/* We hide it visually but keep it in the DOM */}
          <input
            ref={dateInputRef}
            onChange={handleDateChange}
            type="date"
            className="absolute w-0 h-0 opacity-0" // Hide it completely
          />
        </button>
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

      <div className=" w-full mt-6 flex flex-col gap-2 md:ml-[19%]">
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
