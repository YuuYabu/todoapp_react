import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";

const getTodayString = (): string => {
  let today = new Date();
  return (
    today.getFullYear().toString() +
    "-" +
    ("0" + (today.getMonth() + 1).toString()).slice(-2) +
    "-" +
    today.getDate().toString()
  );
};
export type Todo = {
  id: number;
  title: string;
  currentStatus: number;
  endAt: string;
  deletedAt: string | null;
};
const emptyTodo: Todo = {
  id: 0,
  title: "",
  currentStatus: 0,
  endAt: getTodayString(),
  deletedAt: null,
};
const todo1: Todo = {
  id: 1,
  title: "Test1",
  currentStatus: 0,
  endAt: "2023-07-25",
  deletedAt: null,
};
const todo2: Todo = {
  id: 2,
  title: "Test2",
  currentStatus: 0,
  endAt: "2023-07-30",
  deletedAt: "2023-07-20",
};
const todo3: Todo = {
  id: 3,
  title: "Test3",
  currentStatus: 0,
  endAt: "2023-07-23",
  deletedAt: null,
};
const statusNameList: { [key: number]: string } = {
  0: "未着手",
  1: "作業中",
  2: "完了",
};
const buttonClassList: { [key: number]: string } = {
  0: "outline-secondary",
  1: "outline-warning",
  2: "outline-info",
};
function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  useEffect(() => {
    setTodoList([todo1, todo2, todo3]);
  }, []);

  const getButtonClass = (todo: Todo): string => {
    return buttonClassList[todo.currentStatus];
  };
  const getStatusName = (todo: Todo): string => {
    return statusNameList[todo.currentStatus];
  };

  const [newTodo, setNewTodo] = useState<Todo>(emptyTodo);
  const handleChangeNewTodoTitle = (e: any) => {
    setNewTodo({ ...newTodo, title: e.target.value });
  };
  const handleChangeNewTodoEndAt = (e: any) => {
    newTodo.endAt = e.target.value;
    setNewTodo({ ...newTodo, endAt: e.target.value });
  };
  const handleSubmitNewTodo = (e: any) => {
    e.preventDefault();
    let maxId: number = 0;
    todoList.forEach((todo: Todo) => {
      if (!maxId || todo.id > maxId) {
        maxId = todo.id;
      }
    });
    todoList.push(Object.assign({}, newTodo, { id: maxId + 1 }));
    setTodoList([...todoList]);
    setNewTodo(emptyTodo);
  };
  const handleDeleteTodo = (e: any, todo: Todo) => {
    e.preventDefault();
    todo.deletedAt = getTodayString();
    const tList = todoList.map((t) => (t.id === todo.id ? todo : t));
    setTodoList(tList);
  };
  registerLocale("ja", ja);

  return (
    <>
      <h1>Todo</h1>
      <h2>New Todo</h2>
      <form className="row" onSubmit={handleSubmitNewTodo}>
        <div className="col-3">
          <input
            type="text"
            className="form-control"
            placeholder="title"
            value={newTodo.title}
            onChange={handleChangeNewTodoTitle}
            required={true}
          />
        </div>
        <div className="col-3">
          <DatePicker
            onChange={handleChangeNewTodoEndAt}
            dateFormat="yyyy/MM/dd"
            selected={new Date()}
            minDate={new Date()}
            isClearable={false}
            locale="ja"
            className="form-control"
          />
        </div>
        <div className="col-2">
          <Button variant="primary" type="submit">
            登録
          </Button>
        </div>
      </form>
      <h2>Todo List</h2>
      {todoList.map((todo) => {
        return (
          <form className="row" key={todo.id}>
            <div className="col-3">
              <input
                type="text"
                className="form-control"
                defaultValue={todo.title}
                style={{
                  textDecoration:
                    todo.currentStatus === 2 ? "line-through" : "",
                }}
                readOnly={todo.currentStatus === 2}
                disabled={todo.deletedAt !== null}
              />
            </div>
            <div className="col-3">
              {/* <input
                type="date"
                className="form-control"
                value={todo.endAt}
                readOnly={todo.currentStatus === 2}
              /> */}
              <DatePicker
                className="form-control"
                minDate={new Date()}
                locale="ja"
                dateFormat="yyyy/MM/dd"
                selected={new Date(todo.endAt)}
                onChange={(selectedDate) => {
                  todo.endAt =
                    selectedDate?.toDateString() || new Date().toDateString();
                }}
                readOnly={todo.currentStatus === 2}
                isClearable={false}
                disabled={todo.deletedAt !== null}
              />
            </div>
            <div className="col-2">
              <Button
                variant="success"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(todo);
                }}
              >
                更新
              </Button>
            </div>
            <div className="col-2">
              <Button
                variant={getButtonClass(todo)}
                onClick={(e) => {
                  e.preventDefault();
                  todo.currentStatus = Math.min(todo.currentStatus + 1, 2);
                  const tList = todoList.map((t) =>
                    t.id === todo.id ? todo : t
                  );
                  setTodoList(tList);
                }}
              >
                {getStatusName(todo)}
              </Button>
            </div>
            <div className="col-2">
              <Button
                variant="danger"
                onClick={(e) => handleDeleteTodo(e, todo)}
              >
                削除
              </Button>
            </div>
          </form>
        );
      })}
    </>
  );
}

export default App;
