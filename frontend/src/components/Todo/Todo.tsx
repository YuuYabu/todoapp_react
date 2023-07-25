import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";

import { TodoType, formattedDate, getTodayString } from "../../App";

interface Props {
  todo: TodoType;
  updateTodo: Function;
}

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

const Todo: React.FC<Props> = (props) => {
  const [todo, setTodo] = useState(props.todo);
  const handleChangeTitle = (e: any) => {
    setTodo({ ...todo, title: e.target.value });
  };
  const getButtonClass = (todo: TodoType): string => {
    return buttonClassList[todo.currentStatus];
  };
  const getStatusName = (todo: TodoType): string => {
    return statusNameList[todo.currentStatus];
  };
  const handleChangeEndAt = (selectedDate: Date) => {
    setTodo({ ...todo, endAt: formattedDate(selectedDate) });
  };
  const handleUpdateButton = (e: any) => {
    e.preventDefault();
    console.log(todo);
  };
  const handleProcessButton = (e: any) => {
    e.preventDefault();
    setTodo({ ...todo, currentStatus: Math.min(todo.currentStatus + 1, 2) });
  };
  const handleDeleteTodo = (e: any) => {
    e.preventDefault();
    setTodo({ ...todo, deletedAt: getTodayString() });
  };
  registerLocale("ja", ja);

  return (
    <>
      <form className="row">
        <div className="col-3">
          <input
            type="text"
            className="form-control"
            value={todo.title}
            readOnly={todo.currentStatus === 2}
            disabled={todo.deletedAt !== null}
            onChange={handleChangeTitle}
            required={true}
            style={{
              textDecoration: todo.currentStatus === 2 ? "line-through" : "",
            }}
          />
        </div>
        <div className="col-3">
          <DatePicker
            className="form-control"
            minDate={new Date()}
            locale="ja"
            dateFormat="yyyy/MM/dd"
            value={todo.endAt}
            onChange={handleChangeEndAt}
            readOnly={todo.currentStatus === 2}
            isClearable={false}
            disabled={todo.deletedAt !== null}
          />
        </div>
        <div className="col-2">
          <Button
            variant="success"
            onClick={handleUpdateButton}
            disabled={todo.deletedAt !== null || todo.currentStatus === 2}
          >
            更新
          </Button>
        </div>
        <div className="col-2">
          <Button
            variant={getButtonClass(todo)}
            onClick={handleProcessButton}
            disabled={todo.deletedAt !== null}
          >
            {getStatusName(todo)}
          </Button>
        </div>
        <div className="col-2">
          <Button
            variant="danger"
            onClick={handleDeleteTodo}
            disabled={todo.deletedAt !== null}
          >
            削除
          </Button>
        </div>
      </form>
    </>
  );
};

export default Todo;
