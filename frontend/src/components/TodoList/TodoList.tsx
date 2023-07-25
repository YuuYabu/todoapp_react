import React from "react";
import { TodoType } from "../../App";
import Todo from "../Todo/Todo";

interface Props {
  todoList: TodoType[];
  updateTodo: Function;
}

const TodoList: React.FC<Props> = (props) => {
  const todoList = props.todoList;
  return (
    <>
      <h2>Todo List</h2>
      <ul className="list-group list-group-flush">
        {todoList.map((todo) => {
          return (
            <li className="list-group-item" key={todo.id}>
              <Todo todo={todo} updateTodo={props.updateTodo} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TodoList;
