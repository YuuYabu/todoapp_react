import React, { createContext, useState } from "react";
import { TodoType } from "../../App";
import Todo from "../Todo/Todo";
import ReactPaginate from "react-paginate";
import FilterList from "../FilterList/FilterList";

interface Props {
  todoList: TodoType[];
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

const TodoList: React.FC<Props> = (props) => {
  const todoList = props.todoList;
  const filter = 3;
  const [filterType, setFilterType] = useState<number>(3);
  let filteredTodoList: TodoType[];

  if (filterType !== 4) {
    filteredTodoList = todoList
      .filter((todo) =>
        filterType === 3 ? true : todo.currentStatus === filterType
      )
      .filter((todo) => todo.deletedAt === null);
  } else {
    filteredTodoList = todoList.filter((todo) => todo.deletedAt !== null);
  }

  const itemsPerPage = 5;
  const [itemsOffset, setItemsOffset] = useState(0);
  const endOffset = itemsOffset + itemsPerPage;
  const currentTodoList = filteredTodoList.slice(itemsOffset, endOffset);
  const pageCount = Math.ceil(filteredTodoList.length / itemsPerPage);

  const handlePageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * itemsPerPage) % filteredTodoList.length;
    setItemsOffset(newOffset);
  };

  return (
    <>
      <h2>Todo List</h2>
      <FilterTypeContext.Provider value={{ filterType, setFilterType }}>
        <FilterList filter={filter}></FilterList>
      </FilterTypeContext.Provider>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageClick}
        nextLabel="次 >"
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        previousLabel="< 前"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        className="pagination"
      />
      <ul className="list-group list-group-flush">
        {currentTodoList.map((todo) => {
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
