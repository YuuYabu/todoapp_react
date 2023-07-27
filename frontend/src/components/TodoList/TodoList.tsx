import React from "react";
import { TodoType } from "../../App";
import Todo from "../Todo/Todo";

interface Props {
  todoList: TodoType[];
  updateTodo: Function;
  progressTodo: Function;
  deleteTodo: Function;
  filter: number;
}

const TodoList: React.FC<Props> = (props) => {
  const todoList = props.todoList;
  let filteredTodoList: TodoType[];
  if (props.filter !== 4) {
    filteredTodoList = todoList
      .filter((todo) =>
        props.filter === 3 ? true : todo.currentStatus === props.filter
      )
      .filter((todo) => todo.deletedAt === null);
  } else {
    filteredTodoList = todoList.filter((todo) => todo.deletedAt !== null);
  }
  return (
    <>
      <h2>Todo List</h2>
      <ul className="list-group list-group-flush">
        {filteredTodoList.map((todo) => {
          return (
            <li className="list-group-item" key={todo.id}>
              <Todo
                todo={todo}
                updateTodo={props.updateTodo}
                progressTodo={props.progressTodo}
                deleteTodo={props.deleteTodo}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TodoList;
