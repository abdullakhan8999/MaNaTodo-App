import React, { Fragment, useState, useEffect } from "react";
import Header from './component/Header'
import Home from './component/Home.jsx'
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  const [todos, setTodos] = useState([]);


  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);



  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<>
          <Header />
          <Home todos={todos}
            setTodos={setTodos} />
        </>} />
      </Routes>
    </Router>
  )
}
