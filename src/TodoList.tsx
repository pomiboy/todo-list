import { useState } from "react";
import { useForm } from "react-hook-form";

// function TodoList() {
//   const [todo, setTodo] = useState("");
//   const [todoError, setTodoError] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setTodo(value);
//     setTodoError("");
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(todo);
//     if (todo.length > 10) {
//       return setTodoError("A todo should not be longer than 10 letters.");
//     }
//     setTodoError("submitted!");
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input value={todo} onChange={onChange} placeholder="Write a Todo!" />
//         <button>Add</button>
//         {todoError !== "" ? todoError : null}
//       </form>
//     </div>
//   );
// }

function TodoList() {
  const { register, watch } = useForm();
  console.log(watch());

  return (
    <div>
      <form>
        <input {...register("Email")} placeholder="email" />
        <input {...register("firstName")} placeholder="First Name" />
        <input {...register("lastName")} placeholder="Last Name" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default TodoList;
