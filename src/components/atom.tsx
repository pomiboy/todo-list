import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom: todoStorage } = recoilPersist({
  key: "todoStorage",
  storage: localStorage,
  converter: JSON,
});

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
  effects_UNSTABLE: [todoStorage],
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
  effects_UNSTABLE: [categoryStorage],
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});
