import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, todoState } from "./atom";

interface IForm {
  todo: string;
}

function CreateTodo() {
  const setTodos = useSetRecoilState(todoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ todo }: IForm) => {
    console.log("Add todo:", todo);
    setTodos((oldTodos) => [
      { id: Date.now(), text: todo, category},
      ...oldTodos,
    ]);
    setValue("todo", "");
  };
  const onInvalid = () => {
    console.log("invalid");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <input
        {...register("todo", { required: "Please write a todo" })}
        placeholder="write a Todo"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateTodo;
