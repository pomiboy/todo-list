import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

// todo 저장할 localStorage 생성
const { persistAtom: todoStorage } = recoilPersist({
  key: "todoStorage",
  storage: localStorage,
  converter: JSON,
});

// 현재 category 저장할 localStorage 생성 -> 새로고침해도 TO_DO로 바뀌지 않고 category 유지
const { persistAtom: categoryStorage } = recoilPersist({
  key: "categoryStorage",
  storage: localStorage,
});

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface ITodo {
  id: number;
  text: string;
  category: Categories;
}

export const todoState = atom<ITodo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [todoStorage], // todoState atom 값을 todoStorage에 저장하겠다
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
  effects_UNSTABLE: [categoryStorage], // categoryState atom 값을 categoryStorage 저장하겠다
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});
