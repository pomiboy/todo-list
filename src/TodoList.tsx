import { useState } from "react";

function TodoList() {
  const [todo, setTodo] = useState("");
  const [todoError, setTodoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTodo(value);
    setTodoError("");
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(todo);
    if (todo.length > 10) {
      return setTodoError("A todo should not be longer than 10 letters.");
    }
    setTodoError("submitted!");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={todo} onChange={onChange} placeholder="Write a Todo!" />
        <button>Add</button>
        {todoError !== "" ? todoError : null}
      </form>
    </div>
  );
}

export default TodoList;
