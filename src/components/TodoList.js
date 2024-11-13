import React from 'react';
import TodoItem from './TodoItem';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function TodoList({ todos, toggleTodo, deleteTodo, editTodo, reorderTodos }) {
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    reorderTodos(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todoList">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {todos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TodoItem
                      todo={todo}
                      toggleTodo={toggleTodo}
                      deleteTodo={deleteTodo}
                      editTodo={editTodo}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TodoList;