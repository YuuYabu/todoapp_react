import React from "react";
import { TodoType } from "../../App";
import TodoList from "../TodoList/TodoList";
import Add from "../Add/Add";

interface Props {
  todoList: TodoType[];
  addTodo: Function;
  updateTodo: Function;
  progressTodo: Function;
}

const Home: React.FC<Props> = (props) => {
  const todoList = props.todoList;
  return (
    <>
      <h1>Todo App</h1>
      <Add todoList={todoList} addTodo={props.addTodo} />
      <TodoList
        todoList={todoList}
        updateTodo={props.updateTodo}
        progressTodo={props.progressTodo}
      />
    </>
  );
};

export default Home;
