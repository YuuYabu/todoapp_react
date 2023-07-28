import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";

import { TodoType, emptyTodo, formattedDate } from "../../App";

interface Props {
  todoList: TodoType[];
  addTodo: Function;
}

const Add: React.FC<Props> = (props) => {
  const [newTodo, setNewTodo] = useState<TodoType>(emptyTodo);
  const handleChangeNewTodoTitle = (e: any) => {
    setNewTodo({ ...newTodo, title: e.target.value });
  };
  const handleChangeNewTodoEndAt = (selectedDate: Date) => {
    setNewTodo({ ...newTodo, endAt: formattedDate(selectedDate) });
  };
  const addTodo = (e: any, todo: TodoType) => {
    e.preventDefault();
    props.addTodo(todo);
    setNewTodo(emptyTodo);
  };
  registerLocale("ja", ja);
  return (
    <>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <form
            className="row"
            onSubmit={(e) => {
              addTodo(e, newTodo);
            }}
          >
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
                value={newTodo.endAt}
              />
            </div>
            <div className="col-2">
              <Button variant="primary" type="submit">
                登録
              </Button>
            </div>
          </form>
        </li>
      </ul>
    </>
  );
};

export default Add;
