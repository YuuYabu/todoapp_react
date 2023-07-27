import React, { createContext, useState } from "react";
import { TodoType } from "../../App";
import TodoList from "../TodoList/TodoList";
import Add from "../Add/Add";
import FilterList from "../FilterList/FilterList";

interface Props {
  todoList: TodoType[];
  addTodo: Function;
  updateTodo: Function;
  progressTodo: Function;
  deleteTodo: Function;
}

export type FilterTypeContextType = {
  filterType: number;
  setFilterType: (filterType: number) => void;
};

export const FilterTypeContext = createContext<FilterTypeContextType>({
  filterType: 0,
  setFilterType: (filterType) => {},
});

const Home: React.FC<Props> = (props) => {
  const todoList = props.todoList;
  const filter = 3;
  const [filterType, setFilterType] = useState<number>(3);
  return (
    <>
      <h1>Todo App</h1>
      <Add todoList={todoList} addTodo={props.addTodo} />
      <FilterTypeContext.Provider value={{ filterType, setFilterType }}>
        <FilterList filter={filter}></FilterList>
      </FilterTypeContext.Provider>
      <TodoList
        todoList={todoList}
        updateTodo={props.updateTodo}
        progressTodo={props.progressTodo}
        deleteTodo={props.deleteTodo}
        filter={filterType}
      />
    </>
  );
};

export default Home;
