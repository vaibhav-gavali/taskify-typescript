import React, { useReducer, useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { todoReducer, TodoTypes } from './Reducer';

export type ContextType = {
  [key: string]: any;
};

export const CustomContext = React.createContext<ContextType | null>({});

const App: React.FC = () => {
  const [state, dispatch] = useReducer(todoReducer, []);
  const [todo, setTodo] = useState<string>('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      dispatch({ type: TodoTypes.ADD, payload: { todo } });
      setTodo('');
    }
  };

  return (
    <CustomContext.Provider value={{ dispatch }}>
      <div className="App">
        <span className="heading">taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList todos={state} />
      </div>
    </CustomContext.Provider>
  );
};

export default App;
