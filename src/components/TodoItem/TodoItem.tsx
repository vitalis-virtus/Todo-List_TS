import React, { useRef, useState, useEffect } from "react";
import { Todo } from "../../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone, MdRefresh } from "react-icons/md";
import "./TodoItem.css";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  todo: Todo;
  todos: Todo[];
  completedTodos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

  index: number;
}

const TodoItem: React.FC<Props> = ({
  todo,
  todos,
  completedTodos,
  setTodos,
  setCompletedTodos,
  index,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: string) => {
    const doneTodo = todos.find((todo) => todo.id === id);
    if (doneTodo) {
      doneTodo.isDone = !doneTodo.isDone;
      console.log(doneTodo);
      setCompletedTodos([...completedTodos, doneTodo]);
      setTodos(todos.filter((todo) => !(todo.id === id)));
    }
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleRefresh = (id: string) => {
    const refreshedTodo = todos.find((todo) => todo.id === id);
    if (refreshedTodo) {
      console.log(refreshedTodo);
      refreshedTodo.isDone = !refreshedTodo.isDone;
      console.log(refreshedTodo);
      console.log(completedTodos);

      setCompletedTodos([...completedTodos, refreshedTodo]);
      setTodos(todos.filter((todo) => !(todo.id === id)));
    }
  };

  const handleSubmit = (event: React.FormEvent, id: string) => {
    event.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`todos__item ${snapshot.isDragging && "drag"}`}
          onSubmit={(event) => handleSubmit(event, todo.id)}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(event) => setEditTodo(event.target.value)}
              className="todos__item_text"
            />
          ) : todo.isDone ? (
            <s className="todos__item_text">{todo.todo}</s>
          ) : (
            <span className="todos__item_text">{todo.todo}</span>
          )}

          <div className="todos__item_control">
            {/* Edit TODO */}
            {!todo.isDone && (
              <span className="icon">
                <AiFillEdit
                  onClick={() => {
                    if (!edit && !todo.isDone) {
                      setEdit(!edit);
                    }
                  }}
                />
              </span>
            )}

            {/* Set TODO isDone to false -- REFRESH */}
            {todo.isDone && (
              <span className="icon">
                <MdRefresh onClick={() => handleRefresh(todo.id)} />
              </span>
            )}

            {/* Delete TODO */}
            <span className="icon">
              <AiFillDelete onClick={() => handleDelete(todo.id)} />
            </span>

            {/* setTODO isDone to true */}
            {!todo.isDone && (
              <span className="icon">
                <MdDone onClick={() => handleDone(todo.id)} />
              </span>
            )}
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoItem;
