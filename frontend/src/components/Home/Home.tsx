import React, { createContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { TodoType } from "../../App";
import TodoList from "../TodoList/TodoList";
import Add from "../Add/Add";

interface Props {
  todoList: TodoType[];
  addTodo: Function;
  updateTodo: Function;
  progressTodo: Function;
  deleteTodo: Function;
}

const Home: React.FC<Props> = (props) => {
  const todoList = props.todoList;
  const [theme, setTheme] = useState<string>("light");
  const [cookies, setCookie, removeCookie] = useCookies(["theme"]);

  useEffect(() => {
    if (cookies.theme === "light" || cookies.theme === "dark") {
      setTheme(cookies.theme);
    } else {
      setCookie("theme", theme, { maxAge: 2592000 });
    }
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setCookie("theme", newTheme);
    document.documentElement.setAttribute("data-bs-theme", newTheme);
  };

  return (
    <>
      <h1>タスク管理</h1>
      <Button
        onClick={handleThemeChange}
        variant={theme === "light" ? "dark" : "light"}
      >
        {theme === "light" ? "ダークモード" : "ライトモード"}
      </Button>
      <Add todoList={todoList} addTodo={props.addTodo} />
      <TodoList
        todoList={todoList}
        updateTodo={props.updateTodo}
        progressTodo={props.progressTodo}
        deleteTodo={props.deleteTodo}
      />
    </>
  );
};

export default Home;
