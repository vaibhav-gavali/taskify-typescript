import { Todo } from './model';

export enum TodoTypes {
  ADD = 'add',
  REMOVE = 'remove',
  DONE = 'done',
  EDIT = 'edit',
}

export type PayloadType = {
  [key: string]: any;
};

export type Actions = {
  type: TodoTypes.ADD | TodoTypes.DONE | TodoTypes.REMOVE | TodoTypes.EDIT;
  payload: PayloadType;
};

export const todoReducer = (state: Todo[], action: Actions) => {
  switch (action.type) {
    case TodoTypes.ADD: {
      const { todo } = action.payload;
      return [...state, { id: Date.now(), todo, isDone: false }];
    }
    case TodoTypes.DONE: {
      const { id } = action.payload;
      return state.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      );
    }
    case TodoTypes.REMOVE: {
      const { id } = action.payload;
      return state.filter((todo) => todo.id !== id);
    }
    case TodoTypes.EDIT: {
      const { id, todo } = action.payload;
      return state.map((t) => (t.id === id ? { ...t, todo } : t));
    }
    default:
      return state;
  }
};
