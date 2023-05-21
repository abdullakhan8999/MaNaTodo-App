import React from "react";

export default function TodoList({ todos, setTodos }) {
  const handleToggleComplete = (index) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[index].completed = !updatedTodos[index].completed;
      return updatedTodos;
    });
  };

  const handleDeleteTodo = (index) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos.splice(index, 1);
      return updatedTodos;
    });
  };

  const handleInputChange = (e, index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].task = e.target.value;
    setTodos(updatedTodos);
  };

  return (
    <div className="container-lg w-75 mx-auto my-3">
      {todos.map((todo, index) => (
        <div className="input-group mb-3" key={index}>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="radio"
              checked={todo.completed}
              onChange={() => handleToggleComplete(index)}
              aria-label="Radio button for following text input"
            />
          </div>
          <input
            type="text"
            className={`form-control ${
              todo.completed ? "text-decoration-line-through" : ""
            }`}
            value={todo.task}
            placeholder="Enter your Task description"
            aria-label="Enter your description"
            aria-describedby="button-addon2"
            disabled={todo.completed}
            onChange={(e) => handleInputChange(e, index)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => handleDeleteTodo(index)}
            id="button-addon2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
 