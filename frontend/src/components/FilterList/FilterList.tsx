import React, { useContext } from "react";
import { FilterTypeContext } from "../TodoList/TodoList";
import { Form } from "react-bootstrap";

interface Props {
  filter: number;
}

const FilterList: React.FC<Props> = (props) => {
  const { filterType, setFilterType } = useContext(FilterTypeContext);

  const filterTypes = [
    { value: 3, id: "all", name: "すべて" },
    { value: 0, id: "not-yet", name: "未着手" },
    { value: 1, id: "working", name: "作業中" },
    { value: 2, id: "completed", name: "完了" },
    { value: 4, id: "deleted", name: "非表示" },
  ];

  const handleChangeFilterType = (e: any) => {
    setFilterType(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <Form>
        {filterTypes.map((ft) => {
          return (
            <Form.Check
              inline
              type="radio"
              name="filter"
              id={ft.id}
              key={ft.id}
              value={ft.value}
              label={ft.name}
              onChange={handleChangeFilterType}
              checked={ft.value === filterType}
            />
          );
        })}
      </Form>
    </div>
  );
};

export default FilterList;
