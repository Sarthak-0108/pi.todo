import React from "react";

const Todo = (prop) => {
  return (
    <div>
      <label
        className={`${
          prop.hidden ? "hidden" : "flex"
        } justify-start items-center gap-3 cursor-pointer m-4`}
      >
        <input
          type="checkbox"
          checked={prop.completed}
          onChange={() => prop.ontoggle(prop.id)}
          className="peer hidden"
        />
        <div className="w-5 h-5 rounded border-2 border-zinc-900 flex items-center justify-center peer-checked:bg-zinc-900">
          {
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          }
        </div>
        <span
          className={`text-gray-800 text-sm ${
            prop.completed ? "line-through" : ""
          }`}
        >
          {prop.description}
        </span>
      </label>
    </div>
  );
};

export default Todo;
