import React from "react";
import { TodoType } from "../../App";
import TodoList from "../TodoList/TodoList";
import Add from "../Add/Add";

interface Props {
  todoList: TodoType[];
  addTodo: Function;
  updateTodo: Function;
}

const Home: React.FC<Props> = (props) => {
  const todoList = props.todoList;
  return (
    <>
      <h1>Todo App</h1>
      <Add todoList={todoList} addTodo={props.addTodo} />
      <TodoList todoList={todoList} updateTodo={props.updateTodo} />
    </>
  );
};

export default Home;
