import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import Home from "./components/Home/Home";

export type TodoType = {
  id: number;
  title: string;
  currentStatus: number;
  endAt: string;
  deletedAt: string | null;
};

export const formattedDate = (date: Date): string => {
  return (
    date.getFullYear().toString() +
    "/" +
    ("0" + (date.getMonth() + 1).toString()).slice(-2) +
    "/" +
    ("0" + date.getDate().toString()).slice(-2)
  );
};

export const getTodayString = (): string => {
  let today = new Date();
  return formattedDate(today);
};

export const emptyTodo: TodoType = {
  id: 0,
  title: "",
  currentStatus: 0,
  endAt: getTodayString(),
  deletedAt: null,
};
const todo1: TodoType = {
  id: 1,
  title: "Test1",
  currentStatus: 0,
  endAt: "2023/07/25",
  deletedAt: null,
};
const todo2: TodoType = {
  id: 2,
  title: "Test2",
  currentStatus: 0,
  endAt: "2023/07/30",
  deletedAt: "2023/07/20",
};
const todo3: TodoType = {
  id: 3,
  title: "Test3",
  currentStatus: 0,
  endAt: "2023/07/23",
  deletedAt: null,
};

function App() {
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  useEffect(() => {
    setTodoList([todo1, todo2, todo3]);
  }, []);
  const addTodo = (todo: TodoType) => {
    let maxId: number = 0;
    todoList.forEach((todo: TodoType) => {
      if (!maxId || todo.id > maxId) {
        maxId = todo.id;
      }
    });
    todoList.push(Object.assign({}, todo, { id: maxId + 1 }));
    setTodoList([...todoList]);
  };
  const updateTodo = (todo: TodoType) => {
    const tList = todoList.map((t) => (t.id === todo.id ? todo : t));
    setTodoList(tList);
  };

  return (
    <>
      <Home todoList={todoList} addTodo={addTodo} updateTodo={updateTodo} />
    </>
  );
}

export default App;
