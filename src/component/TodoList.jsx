import React, { useState } from "react";
import Modal from "react-modal";
import { BsTrash, BsPencilSquare } from "react-icons/bs";
import showNotification from "../Util/notifications.js";
// Set the app element
Modal.setAppElement("#root");

export default function TodoList({ todo, todos, setTodos, setTask }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleDeleteTodo = (todo) => {
    if (todo.isChecked) {
      const deleted = todos.filter((t) => t.id !== todo.id);
      setTodos(deleted);
      localStorage.setItem("todos", JSON.stringify(deleted));
      showNotification(`${todo.task} Task deleted!`, "info");
    }
  };
  const handleCheckBox = (todo) => {
    //updating checkbox value
    const updateTodos = todos.map((task) => {
      if (task.id === todo.id) {
        return { ...task, isChecked: !task.isChecked };
      }
      return task;
    });

    setTodos(updateTodos);
    showNotification(
      `Task ${todo.isChecked ? "pending!" : "Completed!"}`,
      "info"
    );
    localStorage.setItem("todos", JSON.stringify(updateTodos));
  };

  const handleEdit = (todo) => {
    setEditedTask(todo.task);
    setEditedDescription(todo.description);
    setEditModalOpen(true);
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();

    const updatedTodos = todos.map((task) => {
      if (task.id === todo.id) {
        return { ...task, task: editedTask, description: editedDescription };
      }
      return task;
    });

    setTodos(updatedTodos);
    showNotification("Task updated!", "success");
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setEditModalOpen(false);
  };

  const modalStyle = {
    marginTop: "50px", // Set the desired margin-top value here
  };

  return (
    <div className="input-group mb-3">
      <div className="input-group-text">
        <input
          type="checkbox"
          aria-label="Checkbox for following text input"
          checked={todo.isChecked}
          onChange={() => handleCheckBox(todo)}
        />
      </div>
      <span
        className={`form-control ${
          todo.isChecked
            ? "text-decoration-line-through text-wrap  d-flex align-items-center "
            : "d-flex align-items-center "
        }`}
        aria-describedby="button-addon2"
      >
        {todo.task}
      </span>
      <span
        className={`form-control cursor-arrow  ${
          todo.isChecked
            ? "text-decoration-line-through  text-wrap d-flex align-items-center "
            : "d-flex align-items-center "
        }`}
        aria-label="Enter your description"
        aria-describedby="button-addon2"
      >
        {todo.description}
      </span>

      <button
        className="btn btn-warning z-0 "
        type="button"
        onClick={() => handleDeleteTodo(todo)}
        id="button-addon2"
      >
        <BsTrash />
      </button>
      <button
        className="btn btn-primary z-0"
        type="button"
        onClick={() => handleEdit(todo)}
        id="button-addon2"
      >
        <BsPencilSquare />
      </button>

      {/* Edit Model */}
      <Modal
        isOpen={editModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Edit Todo Modal"
        style={modalStyle}
        className="w-100 h-100  bg-white mt-5 pt-5 px-3 border border-secondary"
      >
        <h2 className="mt-3">Edit Todo</h2>
        <form onSubmit={handleModalSubmit}>
          <label htmlFor="editedTask" className="mt-3 mb-1 mx-2">
            Task:
          </label>
          <input
            type="text"
            id="editedTask"
            className="mb-3 form-control"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <label htmlFor="editedDescription" className="mx-2 mt-3 mb-1">
            Description:
          </label>
          <textarea
            id="editedDescription"
            className="mb-3 form-control"
            rows={3} // Set the number of rows to 3
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button type="submit" className="btn btn-primary mx-3">
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary mx-3"
            onClick={handleModalClose}
          >
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
}
