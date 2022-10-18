import React from 'react';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import './styles.css';

interface Props {
  todos: Todo[];
}

const TodoList: React.FC<Props> = ({ todos }: Props) => {
  return (
    <div className="todos">
      {todos.map((todo) => (
        <SingleTodo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
