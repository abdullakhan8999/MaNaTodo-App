import React, { useEffect } from "react";
import TodoList from "./TodoList";

function Home({ todos, setTodos }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const taskInput = document.getElementById("taskLabel");
    const task = taskInput.value.trim();
    if (task === "") return;

    const newTodo = {
      task,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);

    taskInput.value = "";
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <section className="container mt-5 pt-3 d-flex justify-content-center  flex-column flex-md-row">
      <div className="container w-lg-50 w-sm-100  ">
        <form>
          <div className="mb-3">
            <label htmlFor="taskLabel" className="form-label">
              Task
            </label>
            <input
              type="text"
              className="form-control"
              id="taskLabel"
              aria-describedby="taskHelp"
            />
            <div id="taskHelp" className="form-text">
              We'll never share your data with anyone else.
            </div>
          </div>
          <button
            type="submit"
            id="btnSubmit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
      <TodoList todos={todos} setTodos={setTodos} />
    </section>
  );
}

export default Home;
