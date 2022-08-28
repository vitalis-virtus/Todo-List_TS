import React from "react";
import "./TodoList.css";
import { Todo } from "../../model";
import TodoItem from "../TodoItem/TodoItem";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="ActiveTasks">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active tasks </span>
            {todos.map((todo, index) => (
              <TodoItem
                index={index}
                todo={todo}
                key={todo.id}
                todos={todos}
                completedTodos={completedTodos}
                setTodos={setTodos}
                setCompletedTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="CompletedTasks">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed tasks </span>
            {completedTodos.map((todo, index) => (
              <TodoItem
                todo={todo}
                index={index}
                key={todo.id}
                todos={completedTodos}
                completedTodos={todos}
                setTodos={setCompletedTodos}
                setCompletedTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
