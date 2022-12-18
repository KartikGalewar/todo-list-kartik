import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../model";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";
// import TodoList from "./TodoList";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedtodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({
  todo,
  todos,
  setTodos,
  completedtodos,
  setCompletedTodos,
  index,
}: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [edittodo, setEditTodo] = useState<string>(todo.todo);

  console.log("kartik", todos);
  console.log("kartik completedtodos", completedtodos);

  const handleDone = (id: number) => {
    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    //   )
    // );

    setTodos(todos.filter((todo) => todo.id !== id));

    // setCompletedTodos(
    //     todos.filter((todo) => {
    //         if( todo.id === id ){
    //             return {...completedtodos, todo};
    //         }
    //     }
    //   )

    // )

    todos.map((todo) => {
      if (todo.id === id) {
        setCompletedTodos([...completedtodos, todo]);
      }
    });
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: edittodo } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  console.log(todo);
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todos__single"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onSubmit={(e) => handleEdit(e, todo.id)}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={edittodo}
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
              <MdOutlineDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
