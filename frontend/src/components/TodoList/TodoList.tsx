import React, { useState } from "react";
import { TodoType } from "../../App";
import Todo from "../Todo/Todo";
import ReactPaginate from "react-paginate";

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
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageClick}
        nextLabel="next >"
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        previousLabel="< previous"
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
