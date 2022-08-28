import React from "react";
import { useState } from "react";
import "./App.css";
import InputField from "./components/InputField/InputField";
import TodoList from "./components/TodoList/TodoList";
import { Todo } from "./model";
import { nanoid } from "nanoid";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([
    { isDone: false, todo: "Active todo", id: "id1" },
  ]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([
    { isDone: true, todo: "Completed todo", id: "id2" },
  ]);

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    if (todo) {
      setTodos([...todos, { id: nanoid(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = todos,
      complete = completedTodos;

    const from = source.droppableId;
    const to = destination.droppableId;

    if (from === "ActiveTasks") {
      add = active[source.index];
      active.splice(source.index, 1);

      if (!(to === "ActiveTasks")) {
        add.isDone = !add.isDone;
      }
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);

      if (!(to === "CompletedTasks")) {
        add.isDone = !add.isDone;
      }
    }

    if (to === "ActiveTasks") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};
export default App;
