import React, { useState } from "react";
import TodoList from "./TodoList";
import showNotification from "../Util/notifications";

function Home({ setTodos, todos }) {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmitTodo = (event) => {
    event.preventDefault();
    if (task) {
      const newTodo = {
        id: new Date().getTime().toString(),
        task,
        description,
        isChecked,
      };

      setTodos([...todos, newTodo]);
      localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
      setTask("");
      setDescription("");
      // Show notification for todo added
      showNotification("New Task added successfully", "success");
    } else {
      task === ""
        ? showNotification(`Task can not be empty!`, "info")
        : showNotification(
            `Sorry, something went wrong. Try again or refresh the page`,
            "info"
          );
    }
  };

  const handleClear = () => {
    setTodos([]);
    localStorage.removeItem("todos");
    showNotification("All tasks cleared", "warning");
  };

  return (
    <section className="container mt-5 pt-3">
      <div className="container ">
        <form>
          <div className="mb-3">
            <label htmlFor="taskLabel" className="form-label">
              Task
            </label>
            <input
              name="todo"
              type="text"
              className="form-control"
              id="taskLabel"
              value={task}
              aria-describedby="taskHelp"
              onChange={(e) => setTask(e.target.value)}
            />
            <div id="taskHelp" className="form-text">
              We'll never share your data with anyone else.
            </div>
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            id="btnSubmit"
            className="btn btn-primary"
            onClick={handleSubmitTodo}
          >
            Submit
          </button>
        </form>
      </div>
      <div className="container  mx-auto my-5">
        {todos &&
          todos.map((todo) => (
            <TodoList
              todo={todo}
              todos={todos}
              setTodos={setTodos}
              setTask={setTask}
              key={todo.id}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />
          ))}
        {!todos.length ? null : (
          <div>
            <button
              className="btn btn-secondary  mt-4 mb-4"
              onClick={() => handleClear()}
            >
              Clear All Task
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;
