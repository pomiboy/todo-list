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

interface FormData {
  email: string;
  username: string;
  password1: string;
  password2: string;
}

function TodoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();
  const onValid = (data: FormData) => {
    if (data.password1 !== data.password2) {
      setError(
        "password2",
        { message: "Password not same!" },
        { shouldFocus: true }
      );
    }
  };
  const onInValid = (data: any) => {
    console.log("something's wrong");
  };
  console.log(errors);

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
          margin: "50px auto",
        }}
        onSubmit={handleSubmit(onValid, onInValid)}
      >
        <input
          {...register("email", {
            required: "Email address is required!",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/, // 정규표현식
              message: "Only NAVER emails allowed!",
            },
          })}
          placeholder="email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("username", {
            required: "Username is required!",
            minLength: { value: 10, message: "Should be over 10 letters!" },
            validate: {
              requireDaniel: (value) =>
                !value.includes("daniel") ? "Should include 'daniel'" : true,
              noNick: (value) =>
                value.includes("nick") ? "No 'Nick' allowed" : true,
            },
          })}
          placeholder="Username"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register("password1", { required: "Password is required!" })}
          placeholder="Password"
        />
        <span>{errors?.password1?.message}</span>
        <input
          {...register("password2", { required: "Password is required!" })}
          placeholder="Retype password"
        />
        <span>{errors?.password2?.message}</span>
        <button style={{ backgroundColor: "skyblue" }}>Add</button>
      </form>
    </div>
  );
}

export default TodoList;
