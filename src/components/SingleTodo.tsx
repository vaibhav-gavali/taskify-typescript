import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { CustomContext } from '../App';
import { TodoTypes } from '../Reducer';

type Props = {
  todo: Todo;
};

const SingleTodo = ({ todo }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const { dispatch } = useContext(CustomContext) || {};

  const handleDone = (id: number) => {
    dispatch({ type: TodoTypes.DONE, payload: { id } });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: TodoTypes.REMOVE, payload: { id } });
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    dispatch({ type: TodoTypes.EDIT, payload: { id, todo: editTodo } });
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form
      action=""
      className="todos__single"
      onSubmit={(e) => handleEdit(e, todo.id)}
    >
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos__single--text"
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
