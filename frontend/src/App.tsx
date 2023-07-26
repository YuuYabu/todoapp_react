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

function App() {
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  useEffect(() => {
    fetchTodoList();
  }, []);

  const fetchTodoList = async () => {
    const url = "http://localhost:8080/api/todo";
    const res: Response = await fetch(url, { method: "GET" });
    if (res.ok) {
      const data = (await res.json()) as TodoType[];
      data.map((todo) => {
        todo.endAt = formattedDate(new Date(todo.endAt));
      });
      setTodoList(data);
      console.log("Fetched Todo List");
    } else {
      console.error("Unable to fetch todo list");
    }
  };

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
