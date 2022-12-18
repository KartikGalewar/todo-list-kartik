import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCompletedTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
  completedtodos:Todo[];
}

const TodoList: React.FC<Props> = ({ todos, setTodos,setCompletedTodos,completedtodos }: Props) => {
  return (
    <div className="container">
      <Droppable droppableId="TodoList">
        {(provided, snapshot)=>(
        <div className={`todos ${snapshot.isDraggingOver? "dragative":""}`}
        ref={provided.innerRef} 
        {...provided.droppableProps}
        >
            
            <span className="todos__heading">Active Tasks</span>
                {todos.map((todo,index) => (
                <SingleTodo
                    index={index}
                    todo={todo}
                    key={todo.id}
                    todos={todos}
                    setTodos={setTodos}
                    completedtodos={completedtodos}
                    setCompletedTodos={setCompletedTodos}
                />
                ))}
                {provided.placeholder}
        </div>

        )}
      </Droppable>
      <Droppable droppableId="TodosRemove" >
        {(provided,snapshot)=>(
      <div 
        className={`todos remove ${snapshot.isDraggingOver? "dragremove": ""}`}
        ref={provided.innerRef} 
        {...provided.droppableProps}
        >
         <span className="todos__heading">Completed Tasks</span>
        
                {completedtodos.map((todo, index) => (
                <SingleTodo
                index={index}
                    todo={todo}
                    key={todo.id}
                    completedtodos={completedtodos}
                    setCompletedTodos={setCompletedTodos}
                    todos={todos}
                    setTodos={setCompletedTodos}
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
