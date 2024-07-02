import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, ITodo, todoState } from "./atom";
import styled from "styled-components";

const DeleteBtn = styled.button`
  background-color: tomato;
  &:hover {
    background-color: red;
    transition: 0.2s;
    cursor: pointer;
  }
`;

function Todo({ text, category, id }: ITodo) {
  const todos = useRecoilValue(todoState);
  const setTodos = useSetRecoilState(todoState);

  // 카테고리 변경
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    // console.log("I wanna change to:", name);
    setTodos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((todo) => todo.id === id);
      const oldTodo = oldTodos[targetIndex];
      const newTodo = { id, text, category: name as any };
      console.log(oldTodo);
      console.log(newTodo);
      return [
        ...oldTodos.slice(0, targetIndex),
        newTodo,
        ...oldTodos.slice(targetIndex + 1),
      ];
    });
  };

  // todo 삭제
  const deleteTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setTodos((todos) => {
      const targetIndex = todos.findIndex((todo) => todo.text === name);
      let newTodos = todos.slice(); // React state는 직접 mutation이 불가하기에 .slice()를 이용해 얇은복사를 한 후 mutate를 진행한다!
      newTodos.splice(targetIndex, 1);
      return newTodos;
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          TODO
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          DOING
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          DONE
        </button>
      )}
      <DeleteBtn name={text} onClick={deleteTodo}>
        Delete
      </DeleteBtn>
    </li>
  );
}

export default Todo;
