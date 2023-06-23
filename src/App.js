import React, { useState, useEffect } from "react";
import Header from './component/Header'
import Home from './component/Home.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("todos")) {
      const storedTodos = JSON.parse(localStorage.getItem("todos"));
      setTodos(storedTodos);
    }
  }, [])
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={
          <>
            <Header />
            <Home
              todos={todos}
              setTodos={setTodos} />
          </>
        } />
      </Routes>
    </Router>
  )
}
